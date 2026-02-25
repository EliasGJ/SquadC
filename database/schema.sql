-- Esquema inicial para Squad C

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('profesor','alumno')
);

CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    code VARCHAR(20) UNIQUE,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE tests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    available_from DATETIME,
    available_to DATETIME,
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_id INT,
    user_id INT,
    score FLOAT,
    completed_at DATETIME,
    FOREIGN KEY (test_id) REFERENCES tests(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message VARCHAR(255),
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
