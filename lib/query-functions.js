const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);
db.connect((error) => {
  if (error) throw error;
});

const viewAllDepartments = () => {
    return (
        db
        .promise()
        .query('SELECT * FROM departments')
        .then(([data]) => {
            console.table(data)
        })
        .catch((err) => console.error(err))
    );
};

const viewAllEmployees = () => {
    return (
        db
        .promise()
        .query('SELECT roles.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manager.first_name ," ", manager.last_name) AS manager FROM employees LEFT JOIN employees manager ON manager.id = employees.manager_id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id')
        .then(([data]) => {
        console.table(data)
    })
    .catch((err) => console.error(err))
    );
};

const viewAllRoles = () => {
    return (
        db
        .promise()
        .query('SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id').then(([data]) => {
            console.table(data)
        })
        .catch((err) => console.error(err))
    );
};

//  Functions for creatinf the array of choices for Departments, Roles, and Employees
const departmentList = () => {
    return (
        db
        .promise()
        .query('SELECT * FROM departments')
        .then(([data]) => {
            return data.map(({ name, id }) => ({
                name: name,
                value: id,
            }));
        })
        .catch((err) => console.error(err))
    );
};

const rolesList = () => {
    return (
        db
        .promise()
        .query('SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id')
        .then(([data]) => {
        return data.map(({ title, id }) => ({
            name: title,
            value: id,
        }));
    })
    .catch((err) => console.error(err))
    );
};

const employeeList = () => { 
    return (
        db
        .promise()
        .query('SELECT roles.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manager.first_name ," ", manager.last_name) AS manager FROM employees LEFT JOIN employees manager ON manager.id = employees.manager_id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id')
        .then(([data]) => {
        return data.map(({ first_name, last_name, id }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));
    })
    .catch((err) => console.error(err))
    );
};


// Queries to insert a new employee, new role, and new department
const insertEmployee = (data) => {
    db.query('INSERT INTO employees SET ?', data, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added Employee');
    });
};

const insertRole = (data) => {
    db.query('INSERT INTO roles SET ?',  data, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added Role');
    });
};

const insertDepartment = (data) => {
    db.query('INSERT INTO departments SET ?', data, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added Department');
    });
};

//  Function for updating an employee role
const updateEmployee = (data) => {
    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [ data.role_id, data.id ], (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Updated Employee');
    });
};

module.exports = {
    updateEmployee,
    insertDepartment,
    insertRole,
    insertEmployee,
    employeeList,
    rolesList,
    departmentList,
    viewAllEmployees,
    viewAllRoles,
    viewAllDepartments,
};