const db = require('../db/connection');

module.exports = function addDepartmentQuery(dept) {
    const sql = `INSERT INTO department(name)
                    VALUES (?)`;
    const params = dept;

                    return db.promise().query(sql, params)
                    .catch(err => console.log(err))
}
 