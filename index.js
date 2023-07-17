const inquirer = require('inquirer');
const mysql = require('mysql2');

const prompt = inquirer.createPromptModule();

let db;

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
        .query('SELECT * FROM roles')
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
        .query('SELECT * FROM employees')
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
        init();
    });
};

const insertRole = (data) => {
    db.query('INSERT INTO roles SET ?', data, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added Role');
        init();
    });
};

const insertDepartment = (data) => {
    db.query('INSERT INTO departments SET ?', data, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Added Department');
        init();
    });
};

//  Function for updating an employee role
const updateEmployee = (data) => {
    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [ data.role_id, data.id ], (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log('Updated Employee');
        init();
    });
};

// Functions for creating the prompt system for adding a role, adding an empoyee, and updating an employee role
const addARole = () => {
    prompt([
        {
            message: 'What is the title of the role?',
            name: 'title',
        },
        {
            message: 'What is the salary of the role?',
            name: 'salary',
        },
        {
            message: 'Which department does the role belong to?',
            type: 'rawlist',
            name: 'department_id',
            choices: departmentList,
        },
    ]).then(insertRole);
};

const addAnEmployee = () => {
    prompt([
        {
            message: 'Enter First Name',
            name: 'first_name',
        },
        {
            message: 'Enter Last Name',
            name: 'last_name',
        },
        {
            message: 'What is the employees role?',
            type: 'rawlist',
            name: 'role_id',
            choices: rolesList,
        },
        {
            message: 'Who is the employees manager?',
            type: 'rawlist',
            name: 'manager_id',
            choices: employeeList,
        },
    ]).then(insertEmployee);
};

const updateAnEmployee = () => {
    prompt([
        {
            message: 'Which employees role do you want to update?',
            type: 'rawlist',
            name: 'last_name',
            choices: employeeList,
        },
        {
            message: 'Which role do you want to assign the selected employee?',
            type: 'rawlist',
            name: 'role_id',
            choices: rolesList,
        },
    ]).then(updateEmployee);
};

// Funtion for directing the user to the next steps 
const handleAction = ({ action }) => {
    console.log(`ACTION ${action}`);
    switch(action) {
        case 'View All Employees': {
            db.query('SELECT roles.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, manager.last_name AS manager FROM employees LEFT JOIN employees manager ON manager.id = employees.manager_id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id',
            (err, results) => {
                console.table(results);
                init();
            });
            break;
        }
        case 'View All Departments': {
            db.query('SELECT * FROM departments', (err, results) => {
                console.table(results);
                init();
            });
            break;
        }
        case 'View All Roles': {
            db.query('SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id',
            (err, results) => {
                console.table(results);
                init();
            });
            break;
        }
        case 'Add an Employee': {
            addAnEmployee();
            break;
        }
        case 'Update an Employee Role': {
            updateAnEmployee();
            break;
        }
        case 'Add a Role': {
            addARole();
            break;
        }
        case 'Add a Department': {
            prompt([
                {
                    message: 'What is the name of the department?',
                    name: 'name',
                },
            ]).then(insertDepartment);
            break;
        }
        default: {
            process.exit();
        };
    };
};

const init = () => {
    prompt({
        message: 'What would you like to do?',
        type: 'rawlist',
        name: 'action',
        choices: [
            'View All Employees',
            'Add an Employee',
            'Update an Employee Role',
            'View All Roles',
            'Add a Role',
            'View All Departments',
            'Add a Department',
            'Exit',
        ]
    }).then(handleAction);
};

db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'employee_db',
}, init());

