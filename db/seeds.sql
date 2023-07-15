USE employee_db;

INSERT INTO departments (name) 
    VALUES ('Human Resources'), ('Accounting');

INSERT INTO roles (title, salary) 
    VALUES ('HR Manager', 60000), ('Accountant', 80000);

INSERT INTO employees (first_name, last_name) 
    VALUES ('John', 'Doe'), ('Jane', 'Wilson');