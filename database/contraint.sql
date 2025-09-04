
-- =============================================================================
-- CONTRAINTES DE VÉRIFICATION
-- =============================================================================

-- Contraintes pour les utilisateurs
ALTER TABLE "user" ADD CONSTRAINT chk_role_valid 
    CHECK (role IN ('admin', 'manager', 'employee', 'viewer'));

-- Contraintes pour les produits
ALTER TABLE product ADD CONSTRAINT chk_selling_price_positive 
    CHECK (selling_price > 0);
ALTER TABLE product ADD CONSTRAINT chk_min_stock_positive 
    CHECK (min_stock >= 0);

-- Contraintes pour les commandes
ALTER TABLE "order" ADD CONSTRAINT chk_order_status_valid 
    CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'));
ALTER TABLE "order" ADD CONSTRAINT chk_payment_status_valid 
    CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded'));

-- Contraintes pour les lignes de commande
ALTER TABLE order_line ADD CONSTRAINT chk_quantity_positive 
    CHECK (quantity > 0);
ALTER TABLE order_line ADD CONSTRAINT chk_unit_price_positive 
    CHECK (unit_price > 0);
ALTER TABLE order_line ADD CONSTRAINT chk_discount_percentage_valid 
    CHECK (discount_percentage >= 0 AND discount_percentage <= 100);

-- Contraintes pour les réductions
ALTER TABLE discount ADD CONSTRAINT chk_discount_type_valid 
    CHECK (discount_type IN ('percentage', 'fixed_amount'));
ALTER TABLE discount ADD CONSTRAINT chk_discount_value_valid 
    CHECK (discount_value > 0);
ALTER TABLE discount ADD CONSTRAINT chk_discount_dates 
    CHECK (end_date > start_date);

-- Contraintes pour les mouvements de stock
ALTER TABLE stock_movement ADD CONSTRAINT chk_movement_type_valid 
    CHECK (movement_type IN ('IN', 'OUT', 'ADJUSTMENT', 'TRANSFER', 'RETURN'));
ALTER TABLE stock_movement ADD CONSTRAINT chk_reference_type_valid 
    CHECK (reference_type IS NULL OR reference_type IN ('ORDER', 'PURCHASE', 'ADJUSTMENT', 'TRANSFER'));
