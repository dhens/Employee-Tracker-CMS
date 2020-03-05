const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'toor',
    database: 'companyDB'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected as id ' + connection.threadId + '\n');
    startApp();
})

const startApp = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do? (Use arrow keys)',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager',
                'Add Employee',
                'Delete Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View All Roles',
                'Add Role',
                'Remove Role',
                'Exit'
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                    
                case 'View All Employees by Department':
                    viewAllEmployeesByDepartment();
                    break;

                case 'View All Employees by Manager':
                    viewAllEmployeesByManager();
                    break;
                    
                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Delete Employee':
                    deleteEmployee();
                    break;
                    
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;
                    
                case 'View All Roles':
                    viewAllRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Remove Role':
                    removeRole();
                    break;

                case 'Exit':
                    connection.end();
                    break;                    
            }
        });
}

const viewAllEmployees = () => {

}
const viewAllEmployeesByDepartment = () => {

}
const viewAllEmployeesByManager = () => {

}
const addEmployee = () => {

}
const deleteEmployee = () => {

}
const updateEmployeeRole = () => {

}
const updateEmployeeManager = () => {

}
const viewAllRoles = () => {

}
const addRole = () => {

}
const removeRole = () => {

}