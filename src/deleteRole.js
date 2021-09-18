const db = require('../db/connection');

module.exports = function deleteRoleQuery(role_id) {
    const sql = `DELETE FROM roles WHERE id =?`;

    return db.promise().query(sql, role_id)
    .catch(err => console.log(err))
}
