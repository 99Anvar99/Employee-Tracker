use employee;

-- Inserted data into the Department table
INSERT INTO department (id, name)
VALUES (1, 'Sales'), (2, 'Engineering'), (3, 'Finance'), (4, 'Legal');

-- Inserted data into the Role table
INSERT INTO role (id, title, salary, department_id)

VALUES (1, 'Sales Lead', 100000.00, 1),
       (2, 'Salesperson', 80000.00, 1),
       (3, 'Lead Engineer', 150000.00, 2),
       (4, 'Software Engineer', 120000.00, 2),
       (5, 'Accountant', 125000.00, 3),
       (6, 'Legal Team Lead', 250000.00, 4),
       (7, 'Lawyer', 190000.00, 4);

-- Inserted data into the Employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)

VALUES (1, 'John', 'Doe', 1, NULL),
       (2, 'Mike', 'Chan', 2, 1),
       (3, 'Ashley', 'Rodriguez', 3, NULL),
       (4, 'Kevin', 'Tupik', 4, 3),
       (5, 'Malia', 'Brown', 5, NULL),
       (6, 'Sarah', 'Lourd', 6, NULL),
       (7, 'Tom', 'Allen', 7, 6),
       (8, 'Samantha', 'Jones', 8, 6),
       (9, 'John', 'Doe', 9, 6);
