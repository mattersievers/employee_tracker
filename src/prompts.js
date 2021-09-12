const inquirer = require('inquirer');
const {viewDepartment, addDepartment} = require('./departmentQuery');
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

class contentManager {
    constructor() {
        this.viewDepartment = viewDepartment();
        this.addDepartment = addDepartment();
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
            .then( (selectionChoice) =>{ 
                switch(selectionChoice) {
                    case 'View All Departments':
                        return this.viewDepartment();
                    case 'View All Roles':
                        return;
                    case 'View All Employees':
                        return;
                    case 'Add A Department':
                        return this.addDepartment();
                    case 'Add A Role':
                        return;
                    case 'Add An Employee':
                        return;
                    case 'Update an Employee Role':
                        return;
                }

            })
    }




};


let currentSession = new contentManager();
currentSession.initialPrompt();
module.exports = contentManager;