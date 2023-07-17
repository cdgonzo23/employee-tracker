const { departmentList, rolesList, employeeList } = require('./query-functions');

const mainQuestions = {
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
    ],
};

const addADepartment = [
    {
        message: 'What is the name of the department?',
        name: 'name',
    },
];


const addARole = [
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
];

const addAnEmployee = [
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
    ];

const updateAnEmployee = [
    {
        message: 'Which employees role do you want to update?',
        type: 'rawlist',
        name: 'id',
        choices: employeeList,
    },
    {
        message: 'Which role do you want to assign the selected employee?',
        type: 'rawlist',
        name: 'role_id',
        choices: rolesList,
    },
];

module.exports = {
    addADepartment,
    addARole,
    addAnEmployee,
    updateAnEmployee,
    mainQuestions,
    addADepartment,
};