INSERT INTO department (name)
    VALUES
    ('Clothing'),
    ('Electronics'),
    ('Produce'),
    ('Art Supplies');

INSERT INTO roles (title, salary, department_id)
    VALUES
    ('Manager', 56873.34, 1),
    ('Cashier', 37234.23, 1),
    ('Stocker', 30234.23, 1),
    ('Manager', 57873.34, 2),
    ('Cashier', 38234.23, 2),
    ('Stocker', 31234.23, 2),
    ('Stocker', 33234.23, 3),
    ('Stocker', 30230.20, 4);

INSERT INTO employee (first_name,last_name, role_id, manager_id)
    VALUES
    ('Frank','Fraser', 1, 1),
    ('Robert', 'Woolf', 2, 1),
    ('Piers', 'Gaveston', 3, 1),
    ('Charles', 'LeRoi', 4, 4),
    ('Katherine', 'Mansfield', 7, 4),
    ('Dora', 'Carrington', 8, 4),
    ('Edward', 'Bellamy', 7, NULL),
    ('Montague', 'Summers', 6, NULL);

    

