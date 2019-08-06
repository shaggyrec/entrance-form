USE entrance_form_test;

DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL ,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    image TEXT,
    password VARCHAR(255) NOT NULL
) collate = utf8_unicode_ci;

INSERT INTO user (email, name, lastname, phone, password) VALUES ('i@shagg.ru', 'Alexander', 'Shogenov' ,'79951999195', '$2y$10$EXphnq2mJqY4fxfx07Wvce.0y5amvRf4Sh9i7nDWDOEaG3Ns8rPfu');
