
CREATE DATABASE  jobAssign;
USE ;
CREATE TABLE Product_Category (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE Product (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    SKU VARCHAR(255),
    category_id INT,
    inventory_id INT,
    price DECIMAL(10, 2),
    discount_id INT,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Product_Category(id)
    );
CREATE TABLE Product_Inventory (
    id INT PRIMARY KEY,
    quantity INT,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    deleted_at TIMESTAMP
    );
    CREATE TABLE Product_Discount (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    discount_percent DECIMAL(5, 2),
    active BOOLEAN,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    deleted_at TIMESTAMP
);
ALTER TABLE Product
ADD CONSTRAINT fk_product_inventory_id
FOREIGN KEY (inventory_id) REFERENCES Product_Inventory(id);
ALTER TABLE Product
ADD CONSTRAINT fk_product_discount_id
FOREIGN KEY (discount_id) REFERENCES Product_Discount(id);
