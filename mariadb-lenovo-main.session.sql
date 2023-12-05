show databases;

CREATE VIEW customers_view AS SELECT * FROM customers;


CREATE PROCEDURE simpleproc (OUT param1 INT)
 BEGIN
  SELECT COUNT(*) INTO param1 FROM customers;
 END;

CALL simpleproc(@a);
SELECT @a;


CREATE FUNCTION hello (s CHAR(20))
    RETURNS CHAR(50) DETERMINISTIC
    RETURN CONCAT('Hello, ',s,'!');

SELECT hello('world');

CREATE DATABASE node_complete;


CREATE TABLE products (a bigint auto_increment primary key,
name varchar(128) charset utf8);

DESCRIBE products;

SHOW columns from products;

SELECT * FROM information_schema.COLUMNS
WHERE table_schema = "node_complete"
ORDER BY COLUMN_NAME;

SHOW INDEX from products;

ALTER TABLE products
change a id INT unsigned,
ADD UNIQUE INDEX u(id),
change name title varchar(255) not null,
add column price double not null,
add column description text not null,
add column imageURL varchar(255) not null;

ALTER TABLE products
MODIFY id INT unsigned AUTO_INCREMENT;

-- ALTER TABLE products
-- rename column imageURL to imageUrl;


ALTER TABLE products
change imageURL imageUrl varchar(255);

ALTER TABLE products rename to products_old;


show tables;

select * from users;

SELECT *
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = "node_complete"; 

show CREATE table products;


INSERT into products (
title,
price,
description,
imageURL,
`createdAt`,
`updatedAt`
)
values 
(
"A Book",
12.99,
"This is an amazing book",
"https://www.shipbob.com/wp-content/uploads/2022/06/PRODUCT-RANGE.jpg",
NOW(),
NOW()
);

SELECT * FROM products;

select * from users;

SHOW CREATE table cart_items;

SHOW CREATE table carts;

SHOW CREATE table products;


SELECT * FROM carts;

SELECT * FROM cart_items;

use node_complete;


INSERT INTO `carts` (
  `createdAt`,
  `updatedAt`,
  `userId`
) values (
    NOW(),
    NOW(),
    1
)

delete from carts 
where id>1;

UPDATE products set userId=1;

DROP TABLE `order-items`;

SELECT * FROM orders;

SELECT * FROM order_items;