-- ========================================================
-- INSERTION DES ENTREPRISES
-- ========================================================
INSERT INTO company (company_name) VALUES
('Tech Solutions'),
('Global Traders');

-- ========================================================
-- INSERTION DES UTILISATEURS
-- ========================================================
INSERT INTO "user" (company_id, username, email, "password", full_name) VALUES
(1, 'admin_tech', 'admin@tech.com', 'password123', 'Alice Dupont'),
(1, 'user_tech', 'user@tech.com', 'password123', 'Bob Martin'),
(2, 'admin_global', 'admin@global.com', 'password123', 'Clara Rousseau');

-- ========================================================
-- INSERTION DES UNITÉS
-- ========================================================
INSERT INTO unit (company_id, unit_name, description) VALUES
(1, 'pcs', 'Pièces'),
(1, 'box', 'Boîte de produits'),
(2, 'kg', 'Kilogramme');

-- ========================================================
-- INSERTION DES CATÉGORIES
-- ========================================================
INSERT INTO category (company_id, category_name, description) VALUES
(1, 'Électronique', 'Produits électroniques'),
(1, 'Mobilier', 'Meubles pour bureau'),
(2, 'Alimentation', 'Produits alimentaires');

-- ========================================================
-- INSERTION DES PRODUITS
-- ========================================================
INSERT INTO product (company_id, unit_id, category_id, product_name, selling_price, min_stock, sku, barcode, description) VALUES
(1, 1, 1, 'Clavier mécanique', 79.90, 5, 'SKU001', '1234567890123', 'Clavier mécanique RGB'),
(1, 2, 2, 'Chaise de bureau', 149.00, 2, 'SKU002', '1234567890124', 'Chaise ergonomique noire'),
(2, 3, 3, 'Riz basmati', 2.50, 10, 'SKU003', '1234567890125', 'Sac de riz 1kg');

-- ========================================================
-- INSERTION DES CLIENTS
-- ========================================================
INSERT INTO customer (company_id, customer_code, full_name, email, phone_number, address) VALUES
(1, 'CUST001', 'Jean Valjean', 'jean.valjean@mail.com', '+33011222333', '10 Rue de Paris, Paris'),
(1, 'CUST002', 'Cosette Fauchelevent', 'cosette@mail.com', '+33011222334', '15 Rue de Lyon, Lyon'),
(2, 'CUST003', 'Pierre Dupuis', 'pierre.dupuis@mail.com', '+33011222335', '20 Rue de Marseille, Marseille');

-- ========================================================
-- INSERTION DES COMMANDES
-- ========================================================
INSERT INTO "order" (company_id, customer_id, order_number, delivery_address, delivery_date, total_amount, delivery_amount, discount_amount, tax_amount, order_status, payment_status, notes) VALUES
(1, 1, 'ORD001', '10 Rue de Paris, Paris', '2025-09-05', 229.90, 10, 0, 20, 'pending', 'unpaid', 'Livraison rapide demandée'),
(1, 2, 'ORD002', '15 Rue de Lyon, Lyon', '2025-09-06', 149.00, 5, 0, 15, 'shipped', 'paid', 'Emballage cadeau'),
(2, 3, 'ORD003', '20 Rue de Marseille, Marseille', '2025-09-07', 25.00, 2, 0, 2.5, 'pending', 'unpaid', NULL);

-- ========================================================
-- INSERTION DES LIGNES DE COMMANDE
-- ========================================================
INSERT INTO order_line (order_id, product_id, quantity, unit_price, discount_percentage, discount_amount, line_total, notes) VALUES
(1, 1, 2, 79.90, 0, 0, 159.80, NULL),
(1, 2, 1, 149.00, 0, 0, 149.00, 'Livraison urgente'),
(2, 2, 1, 149.00, 0, 0, 149.00, NULL),
(3, 3, 10, 2.50, 0, 0, 25.00, NULL);

-- ========================================================
-- INSERTION DES RÉDUCTIONS
-- ========================================================
INSERT INTO discount (company_id, discount_name, discount_value, product_id, customer_id, start_date, end_date, is_active) VALUES
(1, 'Promo clavier', 10.00, 1, NULL, '2025-09-01', '2025-09-30', TRUE),
(2, 'Promo riz', 0.50, 3, 3, '2025-09-01', '2025-09-15', TRUE);

-- ========================================================
-- INSERTION DES MOUVEMENTS DE STOCK
-- ========================================================
INSERT INTO stock_movement (company_id, product_id, movement_type, quantity, unit_cost, total_cost, reason, lot_number, expiry_date, notes) VALUES
(1, 1, 'in', 50, 60.00, 3000.00, 'Réception fournisseur', 'LOT001', '2026-01-01', NULL),
(1, 2, 'in', 20, 120.00, 2400.00, 'Réception fournisseur', 'LOT002', '2027-01-01', NULL),
(2, 3, 'in', 100, 2.00, 200.00, 'Réception fournisseur', 'LOT003', '2025-12-31', NULL);
