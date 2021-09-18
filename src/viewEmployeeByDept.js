const db = require('../db/connection');

module.exports = function viewEmployeeByDeptQuery(department_id) {
    const sql = `SELECT
    employee.id AS Employee_ID,
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    roles.title AS Job_Title,
    department.name AS Department,
    roles.salary AS Salary,
    concat( manager.first_name, ' ', manager.last_name) AS Manager
    FROM employee
    JOIN roles ON employee.role_id = roles.id 
    JOIN department ON department.id = roles.department_id 
    LEFT JOIN employee AS manager ON manager.id = employee.manager_id
    WHERE department.id = ?`;

    return db.promise().query(sql, department_id)
    .then( ([rows, fields]) => {
    console.log('');
    console.table(rows);
    })
    .catch(err => console.log(err))

}