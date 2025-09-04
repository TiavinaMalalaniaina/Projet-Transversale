
-- =============================================================================
-- FONCTIONS ET DÉCLENCHEURS
-- =============================================================================

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Déclencheurs pour updated_at
CREATE TRIGGER trigger_company_updated_at BEFORE UPDATE ON company FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_user_updated_at BEFORE UPDATE ON "user" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_product_updated_at BEFORE UPDATE ON product FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_customer_updated_at BEFORE UPDATE ON customer FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_order_updated_at BEFORE UPDATE ON "order" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_discount_updated_at BEFORE UPDATE ON discount FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_supplier_updated_at BEFORE UPDATE ON supplier FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour calculer le total des lignes de commande
CREATE OR REPLACE FUNCTION calculate_order_line_total()
RETURNS TRIGGER AS $$
BEGIN
    NEW.line_total = (NEW.quantity * NEW.unit_price) - NEW.discount_amount;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Déclencheur pour calculer le total des lignes
CREATE TRIGGER trigger_calculate_order_line_total
    BEFORE INSERT OR UPDATE ON order_line
    FOR EACH ROW
    EXECUTE FUNCTION calculate_order_line_total();

-- Fonction pour mettre à jour le total de la commande
CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "order" 
    SET total_amount = (
        SELECT COALESCE(SUM(line_total), 0)
        FROM order_line 
        WHERE order_id = COALESCE(NEW.order_id, OLD.order_id)
    )
    WHERE order_id = COALESCE(NEW.order_id, OLD.order_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Déclencheur pour mettre à jour le total des commandes
CREATE TRIGGER trigger_update_order_total
    AFTER INSERT OR UPDATE OR DELETE ON order_line
    FOR EACH ROW
    EXECUTE FUNCTION update_order_total();

-- Fonction pour vérifier la cohérence des entreprises
CREATE OR REPLACE FUNCTION check_company_consistency()
RETURNS TRIGGER AS $$
DECLARE
    related_company_id INTEGER;
BEGIN
    -- Vérifications pour la table product
    IF TG_TABLE_NAME = 'product' THEN
        SELECT company_id INTO related_company_id FROM unit WHERE unit_id = NEW.unit_id;
        IF related_company_id != NEW.company_id THEN
            RAISE EXCEPTION 'L''unité doit appartenir à la même entreprise que le produit';
        END IF;
        
        SELECT company_id INTO related_company_id FROM category WHERE category_id = NEW.category_id;
        IF related_company_id != NEW.company_id THEN
            RAISE EXCEPTION 'La catégorie doit appartenir à la même entreprise que le produit';
        END IF;
    END IF;

    -- Vérifications pour la table order
    IF TG_TABLE_NAME = 'order' THEN
        SELECT company_id INTO related_company_id FROM customer WHERE customer_id = NEW.customer_id;
        IF related_company_id != NEW.company_id THEN
            RAISE EXCEPTION 'Le client doit appartenir à la même entreprise que la commande';
        END IF;
    END IF;

    -- Vérifications pour la table order_line
    IF TG_TABLE_NAME = 'order_line' THEN
        SELECT o.company_id INTO related_company_id 
        FROM "order" o WHERE o.order_id = NEW.order_id;
        
        DECLARE
            product_company_id INTEGER;
        BEGIN
            SELECT company_id INTO product_company_id FROM product WHERE product_id = NEW.product_id;
            IF related_company_id != product_company_id THEN
                RAISE EXCEPTION 'Le produit et la commande doivent appartenir à la même entreprise';
            END IF;
        END;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Déclencheurs pour vérifier la cohérence des entreprises
CREATE TRIGGER trigger_check_product_company
    BEFORE INSERT OR UPDATE ON product
    FOR EACH ROW
    EXECUTE FUNCTION check_company_consistency();

CREATE TRIGGER trigger_check_order_company
    BEFORE INSERT OR UPDATE ON "order"
    FOR EACH ROW
    EXECUTE FUNCTION check_company_consistency();

CREATE TRIGGER trigger_check_order_line_company
    BEFORE INSERT OR UPDATE ON order_line
    FOR EACH ROW
    EXECUTE FUNCTION check_company_consistency();
