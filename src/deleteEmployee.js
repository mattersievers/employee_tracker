const db = require('../db/connection');

module.exports = function deleteEmployeeQuery(employee_id) {
    const sql = `DELETE FROM employee WHERE id =?`;

    return db.promise().query(sql, employee_id)
    .catch(err => console.log(err))
}
