USE employees;
INSERT INTO department
	(name)
VALUES 
	('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
    
INSERT INTO role
	(title, salary, department_id)
    
VALUES
	('Sales Lead', 100000, 1 ),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 10000, 2),
    ('Account Manager', 75000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 200000, 4);
    
INSERT INTO employee
	(first_name, last_name, role_id, manager_id)
    
VALUES
('John', 'Doe', 1, NULL),
('Tim', 'Smith', 1, NULL),
('Jimmy', 'John', 2, 1), 
('Ted', 'Johnson', 2, 3),
('Daniel', 'Klauer', 2, 3);
