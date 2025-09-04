
-- =============================================================================
-- TABLE DES ENTREPRISES
-- =============================================================================

CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    address VARCHAR(200),
    registration_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- =============================================================================
-- TABLE DES UTILISATEURS
-- =============================================================================

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'employee',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    last_login TIMESTAMP,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES "user"(user_id),
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
    parent_category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES "user"(user_id),
    FOREIGN KEY (parent_category_id) REFERENCES category(category_id),
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
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER,
    updated_at TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES unit(unit_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (created_by) REFERENCES "user"(user_id),
    FOREIGN KEY (updated_by) REFERENCES "user"(user_id),
    CONSTRAINT unique_sku_per_company UNIQUE (company_id, sku),
    CONSTRAINT unique_barcode_per_company UNIQUE (company_id, barcode)
);

-- =============================================================================
-- TABLE DES IMAGES DE PRODUITS
-- =============================================================================

CREATE TABLE product_image (
    product_image_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(500),
    image_data BYTEA,
    image_size INTEGER,
    mime_type VARCHAR(50),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES "user"(user_id)
);

-- =============================================================================
-- TABLE DES CLIENTS
-- =============================================================================

CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    customer_code VARCHAR(20),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(20),
    address VARCHAR(200),
    city VARCHAR(50),
    postal_code VARCHAR(10),
    country VARCHAR(50) DEFAULT 'Madagascar',
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER,
    updated_at TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES "user"(user_id),
    FOREIGN KEY (updated_by) REFERENCES "user"(user_id),
    CONSTRAINT unique_email_per_company UNIQUE (company_id, email),
    CONSTRAINT unique_customer_code_per_company UNIQUE (company_id, customer_code)
);

-- =============================================================================
-- TABLE DES COMMANDES
-- =============================================================================

CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    order_number VARCHAR(20) NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE,
    delivery_address VARCHAR(200) NOT NULL,
    delivery_date DATE,
    order_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'unpaid',
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    notes TEXT,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER,
    updated_at TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (created_by) REFERENCES "user"(user_id),
    FOREIGN KEY (updated_by) REFERENCES "user"(user_id),
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
    discount_type VARCHAR(20) NOT NULL DEFAULT 'percentage',
    discount_value DECIMAL(10,2) NOT NULL,
    product_id INTEGER,
    category_id INTEGER,
    customer_id INTEGER,
    minimum_quantity DECIMAL(10,2),
    minimum_amount DECIMAL(12,2),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER,
    updated_at TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (created_by) REFERENCES "user"(user_id),
    FOREIGN KEY (updated_by) REFERENCES "user"(user_id)
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
    reference_type VARCHAR(20),
    reference_id INTEGER,
    reason VARCHAR(255),
    lot_number VARCHAR(50),
    expiry_date DATE,
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL,
    notes TEXT,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (created_by) REFERENCES "user"(user_id)
);

-- =============================================================================
-- TABLE DES FOURNISSEURS
-- =============================================================================

CREATE TABLE supplier (
    supplier_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    supplier_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    address VARCHAR(200),
    city VARCHAR(50),
    country VARCHAR(50) DEFAULT 'Madagascar',
    payment_terms VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER,
    updated_at TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES "user"(user_id),
    FOREIGN KEY (updated_by) REFERENCES "user"(user_id)
);
