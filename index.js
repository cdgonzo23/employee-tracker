const inquirer = require('inquirer');
const mysql = require('mysql2');

const prompt = inquirer.createPromptModule();

let db;

const getAll = (tableName) => {
    db.query('SELECT * FROM ??', tableName, (err, results) => {
        console.table(results);
        init();
    });
}

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
        console.log('Added Role');
        init();
    });
};

const handleAction = ({ action }) => {
    console.log(`ACTION ${action}`);
    switch(action) {
        case 'View All Employees': {
            getAll('employees');
            break;
        }
        case 'View All Departments': {
            getAll('departments');
            break;
        }
        case 'View All Roles': {
            getAll('roles');
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
                    name: 'last_name'
                },
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
                    name: 'salary'
                },
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

