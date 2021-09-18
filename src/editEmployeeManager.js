const db = require('../db/connection');

module.exports = function editEmployeeRoleQuery(employee_id, manager_id) {
    const sql = `UPDATE employee SET manager_id = ? WHERE id =?`;
    const params = [manager_id, employee_id];

    return db.promise().query(sql, params)
    .catch(err => console.log(err))
}
 