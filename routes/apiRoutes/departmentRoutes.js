const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable =require('console.table');


router.get('/department', (req,res) => {
  const sql = `SELECT * FROM department`;

  db.promise().query(sql)
  .then( ([rows,fields]) => {
    res.json({
      message:'success',
      data: rows,
    });
    console.table(rows);
  })
  .catch(console.log('error'))
  
    
}) 

router.post('/department', ({body},res)=> {

})

module.exports = router;