const db = require('../db/connection');

module.exports = function deleteDepartmentQuery(department_id) {
    const sql = `DELETE FROM department WHERE id =?`;

    return db.promise().query(sql, department_id)
    .catch(err => console.log(err))
}
 