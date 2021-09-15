const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable =require('console.table');
const viewDepartmentsQuery = require('./src/viewDepartments');
const viewRolesQuery = require('./src/viewRoles');
const viewEmployeesQuery = require('./src/viewEmployees');
const addDepartmentQuery = require('./src/addDepartment');
const addRoleQuery = require('./src/addRole');
const getDepartmentQuery = require('./src/getDepartment');

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
        viewDepartmentsQuery().then( (res) =>
        this.initialPrompt())
    }

    viewRoles() { 
        viewRolesQuery().then( (res) =>
        this.initialPrompt()) 
            
    }

    viewEmployees(){
        viewEmployeesQuery().then( (res) =>
        this.initialPrompt()) 
            
    }

    addDepartment(){
        inquirer
            .prompt([
                {
                    type:'text',
                    name: 'departmentName',
                    message: 'What is the name of the department you would like to add?',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;    
                        } else{
                            console.log("Please enter a department name!");
                            return false;
                        }
                    }                  
                }
            ])
            .then( ({departmentName}) => 
                addDepartmentQuery(departmentName)
            )
            .then((res) => 
                viewDepartmentsQuery()
            )
            .then( (res) =>
            this.initialPrompt())
    }

    addRole(){
        let deptNames = getDepartmentQuery();
        console.log(deptNames);

            inquirer
                .prompt([
                    {
                        type:'text',
                        name: 'roleName',
                        message: 'What is the name of the role you would like to add?',
                        validate: nameInput => {
                            if (nameInput) {
                                return true;    
                            } else{
                                console.log("Please enter a name for the role you would like to add!");
                                return false;
                            }
                        }                  
                    },
                    {
                        type:'list',
                        name: 'roleDepartment',
                        message: 'What department will the role be located in?',
                        choices: [deptNames]                
                    },
                    {
                        type:'text',
                        name: 'roleSalary',
                        message: 'What is the salary for the role you would like to add?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;    
                            } else{
                                console.log("Please enter a salary for the role you would like to add!");
                                return false;
                            }
                        }                  
                    }

                ])
            
            .then( ({roleName,roleSalary,roleDepartment}) => 
                addRoleQuery(roleName,roleSalary,roleDepartment)
            )
            .then((res) => 
                viewRolesQuery()
            )
            .then( (res) =>
            this.initialPrompt())    
        }



    addEmployee(){
        this.initialPrompt();
    }

    updateEmployee(){
        this.initialPrompt();
    }
};

let currentSession = new contentManager();
currentSession.initialPrompt();

module.exports = currentSession;