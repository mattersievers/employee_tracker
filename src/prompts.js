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
            .then( (selectionChoice) =>{ 
                switch(selectionChoice) {
                    case 'View All Departments':
                        return console.log('works');
                    case 'View All Roles':
                        return console.log('works2');
                    case 'View All Employees':
                        return console.log('works3');
                    case 'Add A Department':
                        return console.log('works4');
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

module.exports = contentManager;