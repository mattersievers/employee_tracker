const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable =require('console.table');


class contentManager {
    constructor() {
       
    }

    initialPrompt(){
        inquirer
            .prompt([
                {
                    type:'list',
                    name: 'selectionChoice',
                    message: 'What would you like to do?',
                    choices: ['View All Departments','View All Roles','View All Employees',
                    'Add A Department','Add A Role', 'Add An Employee',
                    'Update an Employee Role']
                }
            ])
            .then( ({selectionChoice}) => { 
                console.log(selectionChoice);
                switch(selectionChoice) {
                    case 'View All Departments':
                        return this.viewDepartments();
                    case 'View All Roles':
                        return this.viewRoles();
                    case 'View All Employees':
                        return this.viewEmployees();
                    case 'Add A Department':
                        return this.addDepartment();
                    case 'Add A Role':
                        return this.addRole();
                    case 'Add An Employee':
                        return this.addEmployee();
                    case 'Update an Employee Role':
                        return this.updateEmployee();
                    default:
                        return console.log('error in selection');   
                }
            })         
    }


    viewDepartments(){
        const sql = `SELECT
                    department.name AS Department_Name,
                    department.id AS Department_ID
                    FROM department`;

        db.promise().query(sql)
        .then( ([rows, fields]) => {
            console.log('');
            console.table(rows);
        })
        .catch(err => console.log(err))
        .then( () =>
        this.initialPrompt())  
    }

    viewRoles() { 
        const sql = `SELECT
                    roles.title AS Job_Title, 
                    roles.id AS Role_ID,
                    department.name AS Department_Name,
                    roles.salary AS Salary
                    FROM roles
                    JOIN department
                    ON roles.department_id = department.id`;

        db.promise().query(sql)
        .then( ([rows, fields]) => {
            console.log('');
            console.table(rows);
        })
        .catch(err => console.log(err))
        .then( () =>
        this.initialPrompt())  
            
    }

    viewEmployees(){
        const sql = `SELECT
                    employee.id AS Employee_ID,
                    employee.first_name AS First_Name,
                    employee.last_name AS Last_Name,
                    roles.title AS Job_Title,
                    department.name AS Department,
                    roles.salary AS Salary,
                    employee.first_name AND employee.last_name AS Manager
                    FROM employee
                    JOIN roles
                    ON employee.role_id = roles.id
                    JOIN department
                    ON employee.manager_id = department.id`;

        db.promise().query(sql)
        .then( ([rows, fields]) => {
            console.log('');
            console.table(rows);
        })
        .catch(err => console.log(err))
        .then( () =>
        this.initialPrompt())  
    }

    addDepartment(){
        this.initialPrompt();
    }

    addRole(){
        this.initialPrompt();
    }

    addEmployee(){
        this.initialPrompt();
    }

    updateEmployee(){
        this.initialPrompt();
    }
};

module.exports = contentManager;