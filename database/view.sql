
-- =============================================================================
-- VUES UTILES
-- =============================================================================

-- Vue pour le stock actuel par produit
CREATE VIEW current_stock AS
SELECT 
    p.company_id,
    p.product_id,
    p.product_name,
    p.sku,
    c.category_name,
    u.unit_name,
    COALESCE(SUM(
        CASE 
            WHEN sm.movement_type = 'IN' THEN sm.quantity
            WHEN sm.movement_type IN ('OUT', 'TRANSFER') THEN -sm.quantity
            WHEN sm.movement_type = 'ADJUSTMENT' THEN sm.quantity
            WHEN sm.movement_type = 'RETURN' THEN sm.quantity
        END
    ), 0) as current_stock,
    p.min_stock,
    p.selling_price,
    CASE 
        WHEN COALESCE(SUM(
            CASE 
                WHEN sm.movement_type = 'IN' THEN sm.quantity
                WHEN sm.movement_type IN ('OUT', 'TRANSFER') THEN -sm.quantity
                WHEN sm.movement_type = 'ADJUSTMENT' THEN sm.quantity
                WHEN sm.movement_type = 'RETURN' THEN sm.quantity
            END
        ), 0) <= p.min_stock THEN TRUE
        ELSE FALSE
    END as low_stock_alert,
    p.is_active
FROM product p
LEFT JOIN stock_movement sm ON p.product_id = sm.product_id
LEFT JOIN category c ON p.category_id = c.category_id
LEFT JOIN unit u ON p.unit_id = u.unit_id
WHERE p.is_active = TRUE
GROUP BY p.company_id, p.product_id, p.product_name, p.sku, c.category_name, u.unit_name, p.min_stock, p.selling_price, p.is_active;

-- Vue pour les statistiques des commandes
CREATE VIEW order_statistics AS
SELECT 
    o.company_id,
    DATE_TRUNC('month', o.order_date) as month,
    COUNT(*) as total_orders,
    SUM(o.total_amount) as total_revenue,
    AVG(o.total_amount) as average_order_value,
    COUNT(DISTINCT o.customer_id) as unique_customers
FROM "order" o
WHERE o.order_status != 'cancelled'
GROUP BY o.company_id, DATE_TRUNC('month', o.order_date);

-- Vue pour les produits les plus vendus
CREATE VIEW top_selling_products AS
SELECT 
    p.company_id,
    p.product_id,
    p.product_name,
    p.sku,
    SUM(ol.quantity) as total_quantity_sold,
    SUM(ol.line_total) as total_revenue,
    COUNT(DISTINCT ol.order_id) as number_of_orders
FROM product p
JOIN order_line ol ON p.product_id = ol.product_id
JOIN "order" o ON ol.order_id = o.order_id
WHERE o.order_status NOT IN ('cancelled')
GROUP BY p.company_id, p.product_id, p.product_name, p.sku
ORDER BY total_quantity_sold DESC;

