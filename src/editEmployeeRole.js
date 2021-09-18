const db = require('../db/connection');

module.exports = function editEmployeeRoleQuery(employee_id, role_id) {
    const sql = `UPDATE employee SET role_id = ? WHERE id =?`;
    const params = [role_id, employee_id];

    return db.promise().query(sql, params)
    .catch(err => console.log(err))
}
 