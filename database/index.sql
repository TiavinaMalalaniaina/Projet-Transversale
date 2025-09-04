
-- =============================================================================
-- INDEX POUR OPTIMISER LES PERFORMANCES
-- =============================================================================

-- Index pour les utilisateurs
CREATE INDEX idx_user_company ON "user"(company_id);
CREATE INDEX idx_user_username ON "user"(username);
CREATE INDEX idx_user_email ON "user"(email);
CREATE INDEX idx_user_role ON "user"(role);

-- Index pour les unités et catégories
CREATE INDEX idx_unit_company ON unit(company_id);
CREATE INDEX idx_category_company ON category(company_id);
CREATE INDEX idx_category_parent ON category(parent_category_id);

-- Index pour les produits
CREATE INDEX idx_product_company ON product(company_id);
CREATE INDEX idx_product_category ON product(category_id);
CREATE INDEX idx_product_unit ON product(unit_id);
CREATE INDEX idx_product_sku ON product(sku);
CREATE INDEX idx_product_barcode ON product(barcode);
CREATE INDEX idx_product_active ON product(is_active);

-- Index pour les clients
CREATE INDEX idx_customer_company ON customer(company_id);
CREATE INDEX idx_customer_email ON customer(email);
CREATE INDEX idx_customer_active ON customer(is_active);

-- Index pour les commandes
CREATE INDEX idx_order_company ON "order"(company_id);
CREATE INDEX idx_order_customer ON "order"(customer_id);
CREATE INDEX idx_order_status ON "order"(order_status);
CREATE INDEX idx_order_date ON "order"(order_date);
CREATE INDEX idx_order_number ON "order"(order_number);

-- Index pour les lignes de commande
CREATE INDEX idx_order_line_order ON order_line(order_id);
CREATE INDEX idx_order_line_product ON order_line(product_id);

-- Index pour les mouvements de stock
CREATE INDEX idx_stock_movement_company ON stock_movement(company_id);
CREATE INDEX idx_stock_movement_product ON stock_movement(product_id);
CREATE INDEX idx_stock_movement_date ON stock_movement(movement_date);
CREATE INDEX idx_stock_movement_type ON stock_movement(movement_type);

-- Index pour les réductions
CREATE INDEX idx_discount_company ON discount(company_id);
CREATE INDEX idx_discount_product ON discount(product_id);
CREATE INDEX idx_discount_dates ON discount(start_date, end_date);
CREATE INDEX idx_discount_active ON discount(is_active);

-- Index pour les fournisseurs
CREATE INDEX idx_supplier_company ON supplier(company_id);
CREATE INDEX idx_supplier_active ON supplier(is_active);
