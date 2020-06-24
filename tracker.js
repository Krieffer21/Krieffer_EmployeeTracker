const mysql = require("mysql");
const inquirer = require("inquirer");
const { title } = require("process");
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
});

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
        .then(function (answer) {
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
    SELECT first_name, last_name, role.title, role.salary, department.name 
    FROM employee
    INNER JOIN department 
    ON department.id = employee.role_id
    LEFT JOIN role
    ON role.id = employee.role_id `,
        function (error, results) {
            console.table(results);
            start()
        })
}

function viewDepartment() {
    let statement = connection.query(`
    SELECT first_name, last_name, role.title, role.salary, department.name 
    FROM employee 
    INNER JOIN department 
    ON department.id = employee.role_id
    LEFT JOIN role
    ON role.id = employee.role_id
    ORDER BY department.name`, 
function (error, results) {
        console.table(results);
        start()
    })
    console.log(statement.sql);
}

function viewManager() {
    let statement = connection.query(`
    SELECT first_name, last_name, role.title, role.salary, department.name 
    FROM employee 
    INNER JOIN department 
    ON department.id = employee.role_id
    LEFT JOIN role
    ON role.id = employee.role_id 
    ORDER BY employee.manager_id`,
        function (error, results) {
            console.table(results);
            start()
        })
    console.log(statement.sql);
}

// function addEmployee() {
//     connection.query(`SELECT employee.first_name, employee.last_name
//     FROM employee WHERE manager_id = null`, function (error, results) {
//         let manNames= [];
//         console.table(results);
//         for (let i = 0; i < results.length; i++) {
//             manNames.push(`${results[i].first_name} ${results[i].last_name}`)
//         }

//     inquirer
//         .prompt([{
//             name: "first",
//             type: "input",
//             message: "What is the employee's first name?"
//         },
//             {
//                 name: "last",
//                 type: "input",
//                 message: "What is the employee's last name?"
//             },
//             {
//                 name: "role",
//                 type: "input",
//                 message: "What is the employee's role?"
//             },
//             {
//                 name: "manager",
//                 type: "list",
//                 message: "Who is the employee's manager?",
//                 choices: manNames
//             }])
//             .then(function(answer) {
//                 let statement= connection.query( "INSERT INTO employee SET ?",
//                 {
//                     first_name: answer.first,
//                     last_name: answer.last}, "INNER JOIN role SET ?", {
//                     title: answer.role
//                     // manager_id: answer.manager
//                 },
//                 function(error) {
//                     if (error) throw error;
//                     console.log("The employee has been added to the database.");
//                     start()  
//                 });
//             });
//         });
// }

function removeEmployee() {
    connection.query(`SELECT employee.first_name, employee.last_name
    FROM employee`, function (error, results) {
        let employees= [];
        for (let i = 0; i < results.length; i++) {
            employees.push(`${results[i].first_name} ${results[i].last_name}`)
        }
    inquirer
        .prompt({
            name: "rmEmployee",
            type: "list",
            message: "Which employee would you like to remove?",
            choices:
            [
                employees
            ]
        })
        .then(function(answer) {
            let name = answer.rmEmployee.split(" ");
            connection.query(`DELETE FROM employee WHERE first_name = ${name[0]} AND last_name = ${name[1]} `, 
            function(error) {
                if (error) throw error;
                console.log("The employee has been deleted");
                start();
            });
        });
    });
}


function updateRole() {
    connection.query(`SELECT employee.first_name, employee.last_name
    FROM employee`, function (error, results) {
        let employees = [];
        for (let i = 0; i < results.length; i++) {
            employees.push(`${results[i].first_name} ${results[i].last_name}`)
        }
    connection.query('SELECT role.title, role.id FROM role', function(error, results) {
        let roles = [];
        let roleids = [];
        for (let i = 0; i < results.length; i++) {
            roles.push(`${results[i].title}`);
            roleids.push(results[i].id);
        }
    })
    inquirer
        .prompt([
            {
            name: "uprole",
            type: "list",
            message: "Who's role would you like to update?",
            choices:[
                employees
            ]},
            {
            name: "newrole",
            type: "list",
            message: "What would you like as their new role?",
            choices: [
                roles
            ]}
        ])
        .then(function(answer) {
            let name = answer.uprole.split(" ");
            let newrole = answer.newrole;
            let roleind = roles.indexOf(newrole);
            connection.query(`UPDATE employee SET role_id = ${roleids[roleind]} WHERE first_name = ${name[0]} AND last_name = ${name[1]} `, 
            function(error) {
                if (error) throw error;
                console.log("The employee has been updated");
                start();
            });
        });
    });
}

function updateManager() {
        connection.query(`SELECT employee.first_name, employee.last_name, manager_id 
        FROM employee`, function (error, results) {
            let employees = [];
            for (let i = 0; i < results.length; i++) {
                employees.push(`${results[i].first_name} ${results[i].last_name}`)
            }
        inquirer
            .prompt([
                {
                name: "selectemploy",
                type: "list",
                message: "Which employee's manager do you want to update?",
                choices:[
                    employees
                ]},
                {
                name: "selectman",
                type: "list",
                message: "Which employee do you want to set as manager for the selected employee?",
                choices: [
                    roles
                ]}
            ])
            .then(function(answer) {
                let name = answer.selectemploy.split(" ");
                let newman = answer.selectman;
                let roleind = roles.indexOf(newman);
                connection.query(`UPDATE employee SET manager_id  = ${roleids[roleind]} WHERE first_name = ${name[0]} AND last_name = ${name[1]} `, 
                function(error) {
                    if (error) throw error;
                    console.log("The employee has been updated");
                    start();
                });
            });
        });
    }
    
