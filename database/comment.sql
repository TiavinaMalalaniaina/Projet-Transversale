
-- =============================================================================
-- COMMENTAIRES SUR LES TABLES
-- =============================================================================

COMMENT ON TABLE company IS 'Table des entreprises utilisant le système';
COMMENT ON TABLE "user" IS 'Table des utilisateurs du système par entreprise';
COMMENT ON TABLE unit IS 'Table des unités de mesure des produits par entreprise';
COMMENT ON TABLE category IS 'Table des catégories de produits par entreprise avec hiérarchie';
COMMENT ON TABLE product IS 'Table des produits du catalogue par entreprise';
COMMENT ON TABLE product_image IS 'Table des images associées aux produits';
COMMENT ON TABLE customer IS 'Table des clients par entreprise';
COMMENT ON TABLE "order" IS 'Table des commandes par entreprise';
COMMENT ON TABLE order_line IS 'Table des lignes de commande avec calcul automatique des totaux';
COMMENT ON TABLE discount IS 'Table des réductions flexibles (produit, catégorie, client)';
COMMENT ON TABLE stock_movement IS 'Table des mouvements de stock avec traçabilité complète';
COMMENT ON TABLE supplier IS 'Table des fournisseurs par entreprise';