DROP DATABASE IF EXISTS employeetracker_db;
/* Create database */
CREATE DATABASE employeetracker_db;
/* Use database */
USE employeetracker_db;
/* Create departments tables */
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);
/* Create roles tables */
CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
/* Create employee tables */
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);