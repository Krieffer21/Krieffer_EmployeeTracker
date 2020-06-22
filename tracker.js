var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Rk9006695!",
  database: "EmployeeTrackerDB"
});

function start() {
    inquirer
    .prompt({
      name: "start",
      type: "list",
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
                end();
                break;             
        }
      });
}