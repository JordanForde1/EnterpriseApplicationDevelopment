create extension pgcrypto;

create table users(
	username text NOT NULL,
	password text NOT NULL
);

INSERT INTO users (username, password) 
	VALUES ('jordan', crypt('password', gen_salt('bf', 8)));

INSERT INTO users (username, password) 
	VALUES ('bob', crypt('pass1234', gen_salt('bf', 8)));

SELECT * FROM users 
WHERE  username='jordan' AND  password = crypt('password', password);

SELECT * FROM users 
WHERE  username='bob' AND  password = crypt('pass1234', password);

CREATE TABLE products ( 
	productName VARCHAR(50) NOT NULL, 
	price VARCHAR(50) NOT NULL
);

INSERT INTO products (productName, price) 
	VALUES ('Python Book', '39.99');

INSERT INTO products (productName, price) 
	VALUES ('Laptop', '400.99');

INSERT INTO products (productName, price) 
	VALUES ('Hoddie', '69.99');

ALTER TABLE users add accesskey varchar(160);
ALTER TABLE users add secretkey varchar(320);

