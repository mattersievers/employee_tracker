const db = require('../db/connection');
let roles =[];

module.exports = function getRoleQuery() {
    return new Promise(resolve => {
        const sql = `SELECT
        roles.id,
        roles.title,
        department.name
        FROM roles
        JOIN department
        ON roles.department_id = department.id`;

        db.promise().query(sql)
        .then( ([rows, fields]) => {
            for (let i=0; i < rows.length; i++) {
                let current = rows[i].id + ". " + rows[i].title + " in " + rows[i].name;
                roles.push(current);
            }
            resolve(roles);
        })   
        .catch(err => console.log(err))
    })
};