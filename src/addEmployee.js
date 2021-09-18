const db = require('../db/connection');

module.exports = function addEmployeeQuery(first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                    VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id];

    return db.promise().query(sql, params)
    .catch(err => console.log(err))
}
 