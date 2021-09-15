const db = require('../db/connection');

module.exports = function getDepartmentQuery() {
    const sql = `SELECT
    department.name,
    FROM department`;

    db.promise().query(sql)
    .then( ([rows, fields]) => {
    return rows;
    })
    .catch(err => console.log(err))
}