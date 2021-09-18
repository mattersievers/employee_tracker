const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable =require('console.table');
const viewDepartmentsQuery = require('./src/viewDepartments');
const viewRolesQuery = require('./src/viewRoles');
const viewEmployeesQuery = require('./src/viewEmployees');
const viewEmployeeByDeptQuery = require('./src/viewEmployeeByDept');
const viewEmployeeByManagerQuery = require('./src/viewEmployeeByManager');
const addDepartmentQuery = require('./src/addDepartment');
const addRoleQuery = require('./src/addRole');
const getDepartmentQuery = require('./src/getDepartment');
const getRoleQuery = require('./src/getRole');
const getEmployeeQuery = require('./src/getEmployee');
const addEmployeeQuery = require('./src/addEmployee');
const editEmployeeRoleQuery = require('./src/editEmployeeRole');
const editEmployeeManagerQuery = require('./src/editEmployeeManager');
const deleteDepartmentQuery = require('./src/deleteDepartment');
const deleteRoleQuery = require('./src/deleteRole');
const deleteEmployeeQuery = require('./src/deleteEmployee');



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
                    choices: ['View All Departments','View All Roles','View All Employees', 'View Employee by Manager', 'View Employee by Department',
                    'Add A Department','Add A Role', 'Add An Employee',
                    'Update an Employee Role', 'Update an Employee Manager',
                    'Delete a Department', 'Delete a Role', 'Delete an Employee']
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
                    case 'View Employee by Manager':
                        return this.viewEmpByManager();
                    case 'View Employee by Department':
                        return this.viewEmpByDepartment();
                    case 'Add A Department':
                        return this.addDepartment();
                    case 'Add A Role':
                        return this.addRole();
                    case 'Add An Employee':
                        return this.addEmployee();
                    case 'Update an Employee Role':
                        return this.updateEmployeeRole();
                    case 'Update an Employee Manager':
                        return this.updateEmployeeManager(); 
                    case 'Delete a Department':
                        return this.deleteDept();    
                    case 'Delete a Role':
                        return this.deleteRole();    
                    case 'Delete an Employee':
                        return this.deleteEmp();    
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

    viewEmpByManager(){
        async function getManagerAndShow(){
            const empNames = await getEmployeeQuery();
            
            inquirer
            .prompt([
                {
                    type:'list',
                    name: 'managerName',
                    message: 'Who is the manager you would like to see a list for?',
                    choices: empNames                 
                }
            ])
            .then( ({managerName}) => {
                viewEmployeeByManagerQuery(parseInt(managerName))
            })
            .then ( (res) => 
                currentSession.initialPrompt())    
        }
        getManagerAndShow();    
}       
    

    viewEmpByDepartment(){
        async function getDeptAndShow(){
            const deptNames = await getDepartmentQuery();
            
            inquirer
            .prompt([
                {
                    type:'list',
                    name: 'deptName',
                    message: 'What is the department you would like to see a list for?',
                    choices: deptNames                 
                }
            ])
            .then( ({deptName}) => {
                viewEmployeeByDeptQuery(parseInt(deptName))
            })
            .then ( (res) => 
                currentSession.initialPrompt())    
        }
        getDeptAndShow();
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
        async function getNameAndCreate(){
            const deptNames = await getDepartmentQuery();
        
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
                    choices: deptNames                
                },
                {
                    type:'number',
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
                addRoleQuery(roleName,roleSalary,parseInt(roleDepartment))
            )
            .then((res) => 
                viewRolesQuery()
            )
            .then( (res) =>
            currentSession.initialPrompt())
        }
        getNameAndCreate();     
    };

    addEmployee(){
        async function getInfoAndCreate(){
            const empNames = await getEmployeeQuery();
            const roleNames = await getRoleQuery();
            inquirer
                .prompt([ 
                {
                    type:'text',
                    name: 'firstName',
                    message: 'What is the first name of the employee you would like to add?',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;    
                        } else{
                            console.log("Please enter a first name for the employee you would like to add!");
                            return false;
                        }
                    }                  
                },
                {
                    type:'text',
                    name: 'lastName',
                    message: 'What is the last name of the employee you would like to add?',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;    
                        } else{
                            console.log("Please enter a last name for the employee you would like to add!");
                            return false;
                        }
                    }                  
                },
                {
                    type:'list',
                    name: 'role',
                    message: 'What is the role of the employee you would like to add?',
                    choices: roleNames                 
                },
                {
                    type:'list',
                    name: 'manager',
                    message: 'Who is the manager of the employee you would like to add?',
                    choices: empNames                 
                }
            ])
            .then( ({firstName,lastName,role,manager}) => {
                addEmployeeQuery(firstName, lastName, parseInt(role), parseInt(manager))
            })
            .then((res) => 
                viewEmployeesQuery()
            )
            .then( (res) =>
                currentSession.initialPrompt())
        }
    getInfoAndCreate();
    }

    updateEmployeeRole(){
        async function getInfoAndEdit(){
            const empNames = await getEmployeeQuery();
            const roleNames = await getRoleQuery();

            inquirer
            .prompt([
                {
                    type:'list',
                    name: 'employeeEdit',
                    message: 'Who is the employee you would like to edit roles for?',
                    choices: empNames                 
                },
                {
                    type:'list',
                    name: 'newRole',
                    message: 'What is the role you would like to assign the employee?',
                    choices: roleNames                 
                }
            ])
            .then( ({employeeEdit, newRole}) => {
                editEmployeeRoleQuery(parseInt(employeeEdit), parseInt(newRole))
            })
            .then( (res) => 
               viewEmployeesQuery())
            .then ( (res) => 
                currentSession.initialPrompt())    
        }
        getInfoAndEdit();    
    }

    updateEmployeeManager(){
            async function getInfoAndEdit(){
                const empNames = await getEmployeeQuery();
                
                inquirer
                .prompt([
                    {
                        type:'list',
                        name: 'employeeEdit',
                        message: 'Who is the employee you would like to change manager for?',
                        choices: empNames                 
                    },
                    {
                        type:'list',
                        name: 'newManager',
                        message: 'Who will manage the employee?',
                        choices: empNames                 
                    }
                ])
                .then( ({employeeEdit, newManager}) => {
                    editEmployeeManagerQuery(parseInt(employeeEdit), parseInt(newManager))
                })
                .then( (res) => 
                   viewEmployeesQuery())
                .then ( (res) => 
                    currentSession.initialPrompt())    
            }
            getInfoAndEdit();    
    }


    deleteDept(){    
        async function getDeptAndDelete(){
            const deptNames = await getDepartmentQuery();
            
            inquirer
            .prompt([
                {
                    type:'list',
                    name: 'deptName',
                    message: 'What is the department you would like to delete?',
                    choices: deptNames                 
                }
            ])
            .then( ({deptName}) => {
                deleteDepartmentQuery(parseInt(deptName))
            })
            .then ( (res) => 
                viewDepartmentsQuery())
            .then ( (res) => 
                currentSession.initialPrompt())    
        }
        getDeptAndDelete();    
    }

    deleteRole(){
        async function getRoleAndDelete(){
            const roleNames = await getRoleQuery();
            
            inquirer
            .prompt([
                {
                    type:'list',
                    name: 'roleName',
                    message: 'What is the role you would like to delete?',
                    choices: roleNames                 
                }
            ])
            .then( ({roleName}) => {
                deleteRoleQuery(parseInt(roleName))
            })
            .then ( (res) => 
                viewRolesQuery())
            .then ( (res) => 
                currentSession.initialPrompt())    
        }
        getRoleAndDelete();
    }

    deleteEmp(){
        async function getEmpAndDelete(){
            const empNames = await getEmployeeQuery();
            
            inquirer
            .prompt([
                {
                    type:'list',
                    name: 'empName',
                    message: 'What is the name of the employee you would like to delete?',
                    choices: empNames                 
                }
            ])
            .then( ({empName}) => {
                deleteEmployeeQuery(parseInt(empName))
            })
            .then ( (res) => 
                viewEmployeesQuery())
            .then ( (res) => 
                currentSession.initialPrompt())    
        }
        getEmpAndDelete();
    }
}

let currentSession = new contentManager();
currentSession.initialPrompt();

module.exports = currentSession;