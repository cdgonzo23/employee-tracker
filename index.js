const inquirer = require('inquirer');
const mysql = require('mysql2');

const prompt = inquirer.createPromptModule();

let db;

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

const handleAction = ({ action }) => {
    console.log(`ACTION ${action}`);
    switch(action) {
        case 'View All Employees': {
            db.query('SELECT roles.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, roles.salary AS salary, departments.name AS department, manager.last_name AS manager FROM employees LEFT JOIN employees manager ON manager.id = employees.manager_id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id',
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
            db.query('SELECT employees.id AS id, roles.title AS title, departments.name AS department, roles.salary AS salary FROM roles JOIN departments ON roles.department_id = departments.id',
            (err, results) => {
                console.table(results);
                init();
            });
            break;
        }
        case 'Add an Employee': {
            prompt([
                {
                    message: 'Enter First Name',
                    name: 'first_name',
                },
                {
                    message: 'Enter Last Name',
                    name: 'last_name',
                },
                // {
                //     message: 'What is the employees role?',
                //     type: 'rawList',
                //     name: 'role_id',
                //     choices: [
                //         'Salesperson',
                //         'Lead Engineer',
                //         'Software Engineer',
                //         'Accountant',
                //         'Account Manager',
                //         'Legal Team Lead',
                //         'Lawyer',
                //         'Customer Service',
                //     ],
                // },
                // {
                //     message: 'Who is the employees manager?',
                //     type: 'rawList',
                //     name: 'manager_id',
                //     choices: [
                //         'John Doe',
                //         'Jane Wilson',
                //         'Paula Williams',
                //         'Ben Lawson',
                //     ],
                // },
            ]).then(insertEmployee);
            break;
        }
        case 'Add a Role': {
            prompt([
                {
                    message: 'What is the title of the role?',
                    name: 'title',
                },
                {
                    message: 'What is the salary of the role?',
                    name: 'salary',
                },
                // {
                //     message: 'Which department does the role belong to?',
                //     type: 'rawList',
                //     name: 'department_id',
                //     choices: [
                //         'Engineering',
                //         'Marketing',
                //         'Accouting',
                //         'Sales',
                //         'Legal',
                //         'Finance',
                //     ],
                // },
            ]).then(insertRole);
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
        }
    }
}

const init = () => {
    prompt({
        message: 'What would you like to do?',
        type: 'rawlist',
        name: 'action',
        choices: [
            'View All Employees',
            'Add an Employee',
            // 'Update an Employee Role',
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

