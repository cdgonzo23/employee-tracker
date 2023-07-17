const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

const {
    addADepartment,
    addARole,
    addAnEmployee,
    updateAnEmployee,
    mainQuestions, } = require('./lib/questions');

const {
    updateEmployee,
    insertDepartment,
    insertRole,
    insertEmployee,
    viewAllDepartments,
    viewAllEmployees,
    viewAllRoles, } = require('./lib/query-functions');

// Funtion for directing the user to the next steps 
const handleAction = ({ action }) => {
    console.log(`ACTION ${action}`);
    switch(action) {
        case 'View All Employees': {
            viewAllEmployees().then(init)
            break;
        }
        case 'Add an Employee': {
            prompt(addAnEmployee).then(insertEmployee).then(init)
            break;
        }
        case 'Update an Employee Role': {
            prompt(updateAnEmployee).then(updateEmployee).then(init)
            break;
        }
        case 'View All Roles': {
            viewAllRoles().then(init)
            break;
        }
        case 'Add a Role': {
            prompt(addARole).then(insertRole).then(init)
            break;
        }
        case 'View All Departments': {
            viewAllDepartments().then(init)
            break;
        }
        case 'Add a Department': {
            prompt(addADepartment).then(insertDepartment).then(init);
            break;
        }
        default: {
            process.exit();
        };
    };
};

const init = () => {
    prompt(mainQuestions).then(handleAction)
};

init();

