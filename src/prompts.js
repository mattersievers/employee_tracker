const inquirer = require('inquirer');

class contentManager {
    constructor() {
        this.department = [];
        this.employee = [];
        this.roles = [];
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
    };
};

module.exports = contentManager;