const inquirer = require('inquirer');
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

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
        fetch('/api/department', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        this.initialPrompt();
    }

    viewRoles() {
        this.initialPrompt();
    }

    viewEmployees(){
        this.initialPrompt();
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