USE employee_db;

INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Sales"),
       ("Legal");

INSERT INTO roles (title, salary, department_id) 
VALUES ('Lead Engineer', 135000, 1),
       ('Software Engineer', 115000, 1),
       ('Accountant', 110000, 2),
       ('Account Manager', 125000, 2),
       ('Sales Lead', 120000, 3),
       ('Salesperson', 90000, 3),
       ('Lawyer', 120000, 4),
       ('Legal Team Lead', 140000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 1, null),
       ('Jane', 'Wilson', 2, 1),
       ('Dave', 'Larson', 3, 2),
       ('Paula', 'DuBois', 4, null),
       ('Tina', 'Romero', 5, null),
       ('Tim', 'Turner', 6, 3),
       ('Brett', 'Bianchi', 7, 4),
       ('Laura', 'Palmer', 8, null);