DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
-- Use employee_db --
USE employee_db;
-- See database in use --
SELECT DATABASE();
-- Created the Department table
CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);
-- Created the Role table
CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
-- Created the Employee table
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);