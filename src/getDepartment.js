const db = require('../db/connection');
let names =[];

module.exports = function getDepartmentQuery() {
    return new Promise(resolve => {
        const sql = `SELECT
        department.id,
        department.name
        FROM department`;

        db.promise().query(sql)
        .then( ([rows, fields]) => {
            for (let i=0; i < rows.length; i++) {
                console.log(rows);
                let current = rows[i].id +". "+ rows[i].name;
                names.push(current);
            }
            resolve(names);
        })   
        .catch(err => console.log(err))
    })
};