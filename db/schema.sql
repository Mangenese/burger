DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers
(
	id INT AUTO_INCREMENT PRIMARY KEY,
	burger_name VARCHAR(200) not null,
	devoured BOOLEAN default false,
	PRIMARY KEY (id)
);