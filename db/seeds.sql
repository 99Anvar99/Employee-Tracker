/* Seeding the database */
USE employee_tracker;

/* Inserting departments */
INSERT INTO departments (name)
VALUES 
('Information Systems and Technology'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales');

/* Inserting roles */
INSERT INTO roles (title, salary, department_id)
VALUES
('Web Developer', 90000.00, 1),
('Accountant', 70000.00, 2),
('Paralegal', 50000.00, 3),
('Manager', 70000.00, 4),
('Engineer', 90000.00, 5),
('Sales Rep', 40000.00, 6);

/* Inserting employees */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Smith', 1, 458),
('Ronald', 'Young', 2, 276),
('David', 'Miller', 3, 486),
('Maria', 'Hall', 4, 126),
('Linda', 'Martin', 5, 724),
('Taylor', 'Wilson', 6, 157);