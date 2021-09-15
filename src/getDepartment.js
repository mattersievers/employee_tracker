const db = require('../db/connection');
let names =[];

module.exports = function getDepartmentQuery() {
    const sql = `SELECT
    department.name
    FROM department`;

    db.promise().query(sql)
    .then( ([rows, fields]) => {
        
        for (let i=0; i < rows.length-1; i++) {
            names += rows[i].name + ', '
        }
        names += rows[rows.length-1].name;  
    })   
    .catch(err => console.log(err))
    return names
}