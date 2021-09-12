const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/viewDepartment', ({body},res)=>{

})

router.get('/viewDepartment', (req,res) => {
  const sql = `SELECT 1`;

  db.promise().query(sql)
  .then( (err,rows) => {
  console.log(rows);
  })
  .catch(console.log)
  .then( () => db.end());
    
}) 

function addDepartment () {
console.log('dept add');
};

module.exports = {viewDepartment,addDepartment};