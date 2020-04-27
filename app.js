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
    if (err) console.log(err);
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
                'Add Employee',
                'View Employees',
                'Add Role',
                'View Roles',
                'Add Department',
                'View Departments',
                'Update Employee Role',
                'EXIT'            
            ]
        })
        .then(answer => {
            switch (answer.action) {
              case 'Add Employee':
                addEmployee();
                break;
              case 'View Employees':
                viewEmployees();
                break;
              case 'Add Role':
                addRole();
                break;
              case 'View Roles':
                viewRoles();
                break;
              case 'Add Department':
                addDepartment();
                break;
              case 'View Departments':
                viewDepartments();
                break;
              case 'Update Employee Role':
                updateEmployeeRole();
                break;
              default:
                //EXIT
                connection.end();
            }
          });
      };

const viewEmployees = () => {
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
            type: 'input',
            message: 'What is the employees role ID?',
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
            if (err) console.log(err);
        }
        console.log(`\nAdded ${responses.firstName} ${responses.lastName} || Role: ${responses.roleID} || Manager ID: ${responses.managerID}\n`);
        startApp();    
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

const viewRoles = () => {
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

const viewDepartments = () => {
    connection.query(
        'select * from departments',
        (err, res) => {
            if (err) throw err;
            console.table(res);
            startApp();
        }
    )
}