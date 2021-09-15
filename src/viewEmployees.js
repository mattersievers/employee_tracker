const db = require('../db/connection');

module.exports = function viewEmployeesQuery() {
    const sql = `SELECT
    employee.id AS Employee_ID,
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    roles.title AS Job_Title,
    department.name AS Department,
    roles.salary AS Salary,
    manager.first_name AS Manager
    FROM employee
    JOIN roles ON employee.role_id = roles.id 
    JOIN department ON department.id = roles.department_id 
    JOIN employee AS manager ON manager.id = employee.manager_id`;

    return db.promise().query(sql)
    .then( ([rows, fields]) => {
    console.log('');
    console.table(rows);
    })
    .catch(err => console.log(err))

}