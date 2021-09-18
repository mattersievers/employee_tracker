const db = require('../db/connection');

module.exports = function addRoleQuery(title, salary, department) {
    const sql = `INSERT INTO roles(title, salary, department_id)
                    VALUES (?,?,?)`;
    const params = [title,salary,department];

    return db.promise().query(sql, params)
    .catch(err => console.log(err))
}
 