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
            message: 'What would you like to do?',
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
                'Add Department',
                'View All Departments',
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

                case 'Add Department':
                    addDepartment();
                    break;

                case 'View All Departments':
                    viewAllDepartments();
                    break;

                case 'Exit':
                    connection.end();
                    break;                    
            }
        });
}

const viewAllEmployees = () => {
    const query = connection.query(
        `SELECT first_name, last_name, title, salary
        FROM employees 
        INNER JOIN roles
        ON employees.role_id = roles.id`,
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
            startApp();
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
    // Creates a list of roles to be used for inquirer questions
    // Can't figure out how to save the index value of each role
    // To be used as a role id for the user
    const currentRoles = [];
    connection.query(
        'select title from roles',
        function (err, res) {
            if (err) throw err;
            res.forEach(title => currentRoles.push(title.title))
        }
    )
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
            type: 'list',
            message: 'What is the employees role ID?',
            choices: currentRoles,
            name: 'roleID'
        },
        {
            type: 'input',
            message: 'Who is this employee\'s manager?',
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
        console.log(`\nAdded ${responses.firstName} ${responses.lastName} || Role: ${responses.roleID} || Manager ID: ${responses.managerID}\n`);
        startApp();    
    })
}

const deleteEmployee = () => {
    // Creates a list of employees to be used for inquirer questions
    // To be used as an employee id for the user
    let allEmployees = [];
    connection.query(
        'select first_name from employees',
        (err, res) => {
            if (err) throw err;
            res.forEach(employee => allEmployees.push(employee.first_name))
            console.log(allEmployees);
        }
    );
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select employee to delete:',
            choices: allEmployees,
            name: 'employeeToDelete'
        }
    ])
    .then( (answers) => {
        const rowID = employees.indexOf(answers.employeeToDelete);
        connection.query(
            // inquirer prompt of all saved users in db
            'delete from employee where id = ?', [rowID],
            (err, res) => {
                if (err) throw err;
                console.log(`Removed user: ${res.affectedRows}`);
                startApp();
            }
        )
    
    })
}

const updateEmployeeRole = () => {
    const query = connection.query(
        // inquirer prompt of all saved users in db
        // update employee set role = 5 where 
        function (err, res) {
            if (err) throw err;
            console.log(`Updated Employee Role!`);
            startApp();
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
            startApp();
        }
    )
}

const viewAllRoles = () => {
    connection.query(
        'select * from roles',
        (err, res) => {
            if (err) throw err;
            console.table(res);
            startApp();
        }
    )
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the title of the new role:',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter the salary value (50000) for this role:',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Enter the department ID for this role:',
            name: 'department_id'
        }
    ])
    .then ((responses) => {
        connection.query(
            'insert into roles set ?',
            {
                title: responses.title,
                salary: responses.salary,
                department_id: responses.department_id
            }
        ),
        (err, res) => {
            if (err) throw err;
        }
        console.log(`Added ${responses.newRole} role with salary of ${responses.salaryVal} in department ${responses.deptID}`)
        startApp();
    })
}

const removeRole = () => {
    // Creates a list of roles to be used for inquirer questions
    const currentRoles = [];
    connection.query(
        'select title from roles',
        function (err, res) {
            if (err) throw err;
            res.forEach(title => currentRoles.push(title.title))
        }
    )
    const query = connection.query(
        // inquirer prompt of all saved roles in db
        'select * from roles',
        function (err, res) {
            if (err) throw err;
            console.log(res);
            startApp();
        }
    )
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the new department:',
            name: 'title'
        }
    ])
    .then ((responses) => {
        connection.query(
            'insert into departments set ?',
            {
                name: responses.title
            }
        ),
        (err, res) => {
            if (err) throw err;
        }
        console.log(`\nAdded department: ${responses.title}\n`);
        startApp();    
    })
}

const viewAllDepartments = () => {
    connection.query(
        'select * from departments',
        (err, res) => {
            if (err) throw err;
            console.table(res);
            startApp();
        }
    )
}