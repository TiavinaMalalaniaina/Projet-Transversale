
-- =============================================================================
-- PERMISSIONS ET SÉCURITÉ (À ADAPTER SELON VOS BESOINS)
-- =============================================================================

-- Création des rôles de base (optionnel)
-- CREATE ROLE app_admin;
-- CREATE ROLE app_manager;
-- CREATE ROLE app_employee;
-- CREATE ROLE app_viewer;

-- Octroyer les permissions appropriées
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_admin;
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_manager;
-- GRANT SELECT, INSERT, UPDATE ON TABLE product, customer, "order", order_line TO app_employee;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_viewer;