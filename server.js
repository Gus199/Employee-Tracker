// const express =require('express');
const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = require('./config/connection')


//Run the App
function init() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees", 
                "View All Departments", 
                "View All Roles", 
                "Search for Employee", 
                "Search for Employees by Manager", 
                "Remove Employee", 
                "Remove Department",
                "Remove Role", 
                "Add Employee", 
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Update Employee Manager", 
                "Calculate Payroll",
                "exit" 
            ]
        })
        .then(function(answer) {
            
            switch (answer.action) {
                case "View All Employees":
                    employeeAll();
                    break;

                case "View All Departments":
                    deptsAll();
                    break;

                case "View All Roles":
                    rolesAll();
                    break;

                case "Search for Employee":
                    employee();
                    break;

                case "Search for Employees by Manager":
                    employeeManager();
                    break;

                case "Remove Employee":
                    deleteEmployee();
                    break;

                case "Remove Department":
                    deleteDept();
                    break;

                case "Remove Role":
                    deleteRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "Add Role":
                    addRole();
                    break;


                case "Update Employee Role":
                    updateRole();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}


// OUR CODE TO MAKE THE APP FUNCTION
// employeeAll() function to see all employee info

function employeeAll() {
    var query = "SELECT * FROM employee";
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        // }

    });
    init();
}

//Viewing all departments and info 
function deptsAll() {
    var query = "SELECT * FROM department";
   db.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    init();
}

//Viewing all roles and info
function rolesAll() {
    var query = "SELECT * FROM employee_role";
   db.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    init();
}

//Search for employee and info by name
function employee() {
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "What is the Employee's first name?"
        }, {
            name: "lastName",
            type: "input",
            message: "What is the Employee's last name?"
        }])
        .then(function(answer) {
            var query = "SELECT * FROM employee WHERE (first_name = ?) AND (last_name = ?)";
            db.query(query, [answer.firstName, answer.lastName], function(err, res) {
                if (err) throw err;
                console.table(res);
            });
            init();
        })
}

 // Sort employees by manager then init();
function employeeManager() {
    inquirer
        .prompt({
            name: "filterManager",
            type: "input",
            message: "Filter by Manager ID:"
        })
        .then(function(answer) {
            var query = "SELECT * FROM employee WHERE manager_id =?";
            db.query(query, [parseInt(answer.filterManager)], function(err, res) {
                if (err) throw err;
                console.table(res);
            });
            init();
        })
}

//Call deleteEmployee(); to delete employee

function deleteEmployee() {
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        }, {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        }])
        .then(function(answer) {
            let query = "DELETE FROM employee WHERE (first_name = ?) AND (last_name = ?)";
            db.query(query, [answer.firstName, answer.lastName], function(err, res) {
                if (err) throw err;
                console.table(res);
            })
            init();
        })
}


// //Call deleteDept(); to delete department

function deleteDept() {
    inquirer
        .prompt({
            name: "dept_name",
            type: "input",
            message: "What is the name of the department you want to delete?"
        }, )
        .then(function(answer) {
            let query = "DELETE FROM department WHERE dept_name =?";
            db.query(query, [answer.dept_name], function(err, res) {
                if (err) throw err;
                console.table(res);
            })
            init();
        })
}


// Delete role and info 
function deleteRole() {
    inquirer
        .prompt({
            name: "title",
            type: "input",
            message: "What is the name of the new role title?"
        }).then(function(answer) {
            let query = "DELETE FROM employee_role WHERE title = ?";
            db.query(query, [answer.title], function(err, res) {
                if (err) throw err;
                console.table(res)
            })
            init();
        })

}


// //Call addEmployee(); to add employee
function addEmployee() {
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        }, {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        }, {
            name: "role_id",
            type: "input",
            message: "What is the employee's role id?"
        }, {
            name: "manager_id",
            type: "input",
            message: "What is your manager's id?",

        }, ])
        .then(function(answer) {
            let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)"
            db.query(query, [answer.firstName, answer.lastName, parseInt(answer.role_id), parseInt(answer.manager_id)], function(err, res) {
                if (err) throw err;
                console.log(res);
            })
            init();
        })
}



// //Add new Department

function addDept() {
    inquirer
        .prompt({
            name: "dept_name",
            type: "input",
            message: "What is the name of the department you want to add?"
        }, )
        .then(function(answer) {
            let query = "INSERT INTO department (dept_name) VALUES (?)";
            db.query(query, [answer.dept_name], function(err, res) {
                if (err) throw err;
                console.table(res);
            })
            init();
        })

}

//add Role and info 

function addRole() {
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "What is the name of the new role title?"
        }, {
            name: "salary",
            type: "input",
            message: "What is the yearly salary of this role?"
        }, {
            name: "dept_name",
            type: "input",
            message: "What department is this new role under?"
        }])
        .then(function(answer) {
            let query = "INSERT INTO employee_role (title, salary, dept_name) VALUES (?,?,?)";
            db.query(query, [answer.title, answer.salary, answer.dept_name], function(err, res) {
                if (err) throw err;
                console.table(res);
            })
            init();
        })

}


// // Call updateRole(); to update employee role

function updateRole() {
    inquirer
        .prompt([{
            name: "employeeID",
            type: "input",
            message: "What is the employee's ID ?"
        }, {
            name: "roleID",
            type: "input",
            message: "What is the employee's new role ID?"
        }])
        .then(function(answer) {
            let query = "UPDATE employee SET role_id = ? WHERE id =?";
            db.query(query, [parseInt(answer.employeeID), parseInt(answer.roleID)], function(err, res) {
                if (err) throw err;
                console.table(res);
            })
            init();
        })

}


// //Call updateManager(); to update employee manager

function updateManager() {
    inquirer
        .prompt([{
            name: "employeeID",
            type: "input",
            message: "What is the employee's ID ?"
        }, {
            name: "managerID",
            type: "input",
            message: "What is the employee's new manager ID?"
        }])
        .then(function(answer) {
            let query = "UPDATE employee SET manager_id = ? WHERE id =?";
            db.query(query, [parseInt(answer.employeeID), parseInt(answer.managerID)], function(err, res) {
                if (err) throw err;
                console.table(res);
            })
            init();
        })
}



init();