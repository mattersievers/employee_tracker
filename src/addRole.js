const db = require('../db/connection');

module.exports = function addRoleQuery(name, salary, department) {
    const sql = `INSERT INTO roles(name, salary, department)
                    VALUES (?,?,?)`;
    const params = [name,salary,department];

                    return db.promise().query(sql, params)
                    .catch(err => console.log(err))
}
 