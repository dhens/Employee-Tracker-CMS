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
    const query = connection.query(
        'select * from employees',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startApp();
        }
    )

}
const viewAllEmployeesByDepartment = () => {
    const query = connection.query(
        // 'select employee from departments',
        function(err, res) {
            if (err) throw err;
            console.log(res);
        }
    )

}
const viewAllEmployeesByManager = () => {
    const query = connection.query(
        // 'select employees that have manager x'
        function(err, res) {
            if(err) throw err;
            console.log(res);
        }
    )

}
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter employee\'s first name (required):',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter employee\'s last name (required):',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Enter employee\'s role ID (required):',
            name: 'roleID'
        },
        {
            type: 'input',
            message: 'Enter employee\'s manager ID (if applicable):',
            name: 'managerID',
        }
    ])
    .then( (responses) => {
        connection.query(
            "INSERT INTO employees SET ?",
            {
              first_name: responses.firstName,
              last_name: responses.lastName,
              role_id: responses.roleID,
              manager_id: responses.managerID
            }
        ), 
        (err, res) => {
            if (err) throw err;
        }
        console.log(`Added ${responses.firstName} ${responses.lastName} | Role ID: ${responses.roleID} Manager ID: ${responses.managerID}!`);
        
        startApp();
    })
}
const deleteEmployee = () => {
    const query = connection.query(
        // inquirer prompt of all saved users in db
        // delete from employee where id = employee id
        function (err, res) {
            if (err) throw err;
            console.log(`Removed user: ${res.affectedRows}`);
        }
    )
}
const updateEmployeeRole = () => {
    const query = connection.query(
        // inquirer prompt of all saved users in db
        // update employee set role = 5 where 
        function (err, res) {
            if (err) throw err;
            console.log(`Updated Employee Role!`);
        }
    )
}
const updateEmployeeManager = () => {
    const query = connection.query(
        // inquirer promt of all saved employees in db
        // update employee set manager_id =
        function (err, res) {
            if (err) throw err;
            console.log(`Updated Employee's Manager`);
        }
    )
}
const viewAllRoles = () => {
    const query = connection.query(
        'select * from role',
        function (err, res) {
            if (err) throw err;
            console.table(res);
        }
    )
}
const addRole = () => {
    const query = connection.query(
        // inquirer prompt to ask user desired title and salary vals
        // 'insert into role (title, salary, department_id)
        // values('Janitor', 35000, 2)
        function (err, res) {
            if (err) throw err;
            console.log(`Added role ${responses.title} with salary of ${responses.salary}`);
        }
    )
}
const removeRole = () => {
    const query = connection.query(
        // inquirer prompt of all saved roles in db
        'select * from role',
        function (err, res) {
            if (err) throw err;
            console.log(res);
        }
    )
}