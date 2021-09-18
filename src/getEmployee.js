const db = require('../db/connection');
let employees =[];

module.exports = function getEmployeeQuery() {
    return new Promise(resolve => {
        const sql = `SELECT
        employee.id,
        employee.first_name,
        employee.last_name
        FROM employee`;

        db.promise().query(sql)
        .then( ([rows, fields]) => {
            for (let i=0; i < rows.length; i++) {
                let current = rows[i].id + ". " + rows[i].last_name + ", " + rows[i].first_name;
                employees.push(current);
            }
            resolve(employees);
        })   
        .catch(err => console.log(err))
    })
};