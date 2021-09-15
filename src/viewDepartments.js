const db = require('../db/connection');

module.exports = function viewDepartmentsQuery() {
    const sql = `SELECT
    department.name AS Department_Name,
    department.id AS Department_ID
    FROM department`;

    return db.promise().query(sql)
    .then( ([rows, fields]) => {
    console.log('');
    console.table(rows);
    })
    .catch(err => console.log(err))
};