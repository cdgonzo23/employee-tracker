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

const departmentArr = [];

const departmentList = () => {
    db.query('SELECT departments.name AS department FROM departments', (err, results) => {
        for (const element of results) {
            departmentArr.push(element.department)
        }
    })
}

const rolesArr = [];

const rolesList = () => {
    db.query('SELECT roles.title AS role FROM roles', (err, results) => {
        for (const element of results) {
            // console.log(element.role)
            rolesArr.push(element.role);
        }
    })
}

const employeesArr = [];
const managerArr = ['None'];

const employeeList = () => {
    db.query('SELECT employees.last_name AS employees FROM employees', (err, results) => {
        for (const element of results) {
            employeesArr.push(element.employees);
            managerArr.push(element.employees);
        }
    })
}

const addARole = () => {
    departmentList();
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
            choices: departmentArr,
        },
    ]).then(insertRole);
}

const addAnEmployee = () => {
    rolesList();
    employeeList();
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
            choices: rolesArr,
        },
        {
            message: 'Who is the employees manager?',
            type: 'rawlist',
            name: 'manager_id',
            choices: managerArr,
        },
    ]).then(insertEmployee);
}

const updateAnEmployee = () => {
    rolesList();
    employeeList();
    prompt([
        {
            message: 'Which employees role do you want to update?',
            type: 'rawlist',
            name: 'last_name',
            choices: employeesArr,
        },
        {
            message: 'Which role do you want to assign the selected employee?',
            type: 'rawlist',
            name: 'role_id',
            choices: rolesArr,
        },
    ]).then(insertEmployee);
}

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
            db.query('SELECT roles.id AS id, roles.title AS title, departments.name AS department, roles.salary AS salary FROM roles JOIN departments ON roles.department_id = departments.id',
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

