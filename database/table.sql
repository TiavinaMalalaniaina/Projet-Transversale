
-- =============================================================================
-- TABLE DES ENTREPRISES
-- =============================================================================

CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL
);

-- =============================================================================
-- TABLE DES UTILISATEURS
-- =============================================================================

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);

-- =============================================================================
-- TABLE DES UNITÉS
-- =============================================================================

CREATE TABLE unit (
    unit_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    unit_name VARCHAR(20) NOT NULL,
    description VARCHAR(100),
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    CONSTRAINT unique_unit_per_company UNIQUE (company_id, unit_name)
);

-- =============================================================================
-- TABLE DES CATÉGORIES
-- =============================================================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    category_name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    CONSTRAINT unique_category_per_company UNIQUE (company_id, category_name)
);

-- =============================================================================
-- TABLE DES PRODUITS
-- =============================================================================

CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    unit_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    selling_price DECIMAL(10,2) NOT NULL,
    min_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
    sku VARCHAR(50) NOT NULL,
    barcode VARCHAR(100),
    description TEXT,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    CONSTRAINT unique_sku_per_company UNIQUE (company_id, sku),
    CONSTRAINT unique_barcode_per_company UNIQUE (company_id, barcode)
);

-- =============================================================================
-- TABLE DES IMAGES DE PRODUITS
-- =============================================================================

CREATE TABLE product_image (
    product_image_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    image_data BYTEA,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

-- =============================================================================
-- TABLE DES CLIENTS
-- =============================================================================

CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(20),
    address VARCHAR(200),
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    CONSTRAINT unique_email_per_company UNIQUE (company_id, email)
);

-- =============================================================================
-- TABLE DES METHODES DE PAIEMENT
-- =============================================================================

CREATE TABLE payment_method (
    payment_method_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    payment_method_name VARCHAR(20),
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);

-- =============================================================================
-- TABLE DES COMMANDES
-- =============================================================================

CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    order_number VARCHAR(20) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_address VARCHAR(200) NOT NULL,
    delivery_date DATE,
    order_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'unpaid',
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    delivery_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    method_payment_id INTEGER,
    notes TEXT,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_method(payment_method_id),
    CONSTRAINT unique_order_number_per_company UNIQUE (company_id, order_number)
);

-- =============================================================================
-- TABLE DES LIGNES DE COMMANDE
-- =============================================================================

CREATE TABLE order_line (
    order_line_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    line_total DECIMAL(12,2) NOT NULL,
    notes VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES "order"(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- =============================================================================
-- TABLE DES RÉDUCTIONS
-- =============================================================================

CREATE TABLE discount (
    discount_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    discount_name VARCHAR(100) NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    product_id INTEGER,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);



-- =============================================================================
-- TABLE DES MOUVEMENTS DE STOCK
-- =============================================================================

CREATE TABLE stock_movement (
    stock_movement_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    movement_type VARCHAR(20) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_cost DECIMAL(10,2),
    total_cost DECIMAL(12,2),
    reason VARCHAR(255),
    lot_number VARCHAR(50),
    expiry_date DATE,
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);
