const db = require('../db/connection');
let names =[];

module.exports = function getDepartmentQuery() {
    return new Promise(resolve => {
        const sql = `SELECT
        department.name
        FROM department`;

        db.promise().query(sql)
        .then( ([rows, fields]) => {
            for (let i=0; i < rows.length; i++) {
                names.push(rows[i].name);
            }
            resolve(names);
        })   
        .catch(err => console.log(err))
    })
};