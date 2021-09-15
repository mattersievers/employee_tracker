const db = require('../db/connection');

module.exports = function viewRolesQuery () {
    const sql = `SELECT
    roles.title AS Job_Title, 
    roles.id AS Role_ID,
    department.name AS Department_Name,
    roles.salary AS Salary
    FROM roles
    JOIN department
    ON roles.department_id = department.id`;

    return db.promise().query(sql)
    .then( ([rows, fields]) => {
    console.log('');
    console.table(rows);
    })
    .catch(err => console.log(err))

};