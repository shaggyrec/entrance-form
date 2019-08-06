CREATE DATABASE IF NOT EXISTS entrance_form;
CREATE DATABASE IF NOT EXISTS entrance_form_test;

CREATE USER 'entrance_form_user'@'%' IDENTIFIED WITH mysql_native_password BY 'Sheidohngoa6ibae';
GRANT ALL PRIVILEGES ON *.* TO 'entrance_form_user'@'%';

USE entrance_form;
create table user
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL ,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    image TEXT,
    password VARCHAR(255) NOT NULL
) collate = utf8_unicode_ci;
