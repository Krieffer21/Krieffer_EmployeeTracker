var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Rk9006695!",
  database: "EmployeeTrackerDB"
});
connection.connect(function (error) {
    if (error) {
        console.log(error);
    }
    start()
})

function start() {
    inquirer
    .prompt({
      name: "start",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
          "View all employees",
          "View all employees by Department",
          "View all employees by Manager",
          "Add an employee",
          "Remove an employee",
          "Update employee Role",
          "Update employee Manager",
          "Exit"
        ]
    })
    .then(function(answer) {
        switch (answer.start) {
            case "View all employees":
                viewEmployees();
                break;
            case "View all employees by Department":
                viewDepartment();
                break;
            case "View all employees by Manager":
                viewManager();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Remove an employee":
                removeEmployee();
                break;
            case "Update employee Role":
                updateRole();
                break;
            case "Update employee Manager":
                updateManager();
                break;
            case "Exit":
                connection.end()           
        }
      });
}

function viewEmployees() {
    let statement = connection.query(`
    SELECT employee.id, employee.first_name, employee. last_name, role.title, department.name, role.salary,employee.manager_id 
    FROM employee, role, department
    `, 
    function (error, results) {
        console.table(results);
        start()
     })
     console.log(statement.sql);
}

function viewDepartment() {
    let statement = connection.query(`
    SELECT employee.id, employee.first_name, employee. last_name, role.title, department.name, role.salary,employee.manager_id 
    FROM employee, role, department ORDER BY department.name
    `, 
    function (error, results) {
        console.table(results);
        start()
     })
     console.log(statement.sql);
}

function viewManager() {
    let statement = connection.query(`
    SELECT employee.id, employee.first_name, employee. last_name, role.title, department.name, role.salary,employee.manager_id 
    FROM employee, role, department ORDER BY employee.manager_id
    `, 
    function (error, results) {
        console.table(results);
        start()
     })
     console.log(statement.sql);
}

function addEmployee() {
    inquirer
        .prompt([{
            name: "first",
            type: "input",
            message: "What is the employee's first name?"
        },
            {
                name: "last",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role",
                type: "input",
                message: "What is the employee's role?"
            },
            {
                name: "manager",
                type: "input",
                message: "Who is the employee's manager?"
            }])
            .then(function(answer) {
                let connection.query(' INSERT INTO employee SET ?',
                {
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: answer.role,
                    manager_id: answer.manger
                })
            })

}

function removeEmployee() {
    inquirer
        .prompt([{
            name: "startyear",
            type: "input",
            message: "What start year would you like to search for?"
        },
            {
                name: "endyear",
                type: "input",
                message: "What end year would you like to search for?"
            }])

}
function updateRole() {
    inquirer
        .prompt([{
            name: "startyear",
            type: "input",
            message: "What start year would you like to search for?"
        },
            {
                name: "endyear",
                type: "input",
                message: "What end year would you like to search for?"
            }])

}

function updateManager() {
    inquirer
        .prompt([{
            name: "startyear",
            type: "input",
            message: "What start year would you like to search for?"
        },
            {
                name: "endyear",
                type: "input",
                message: "What end year would you like to search for?"
            }])
}

