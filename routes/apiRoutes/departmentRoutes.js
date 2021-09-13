const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/department', (req,res) => {
  const sql = `SELECT * FROM department`;

  db.promise().query(sql)
  .then( ([rows,fields]) => {
    res.json({
      message:'success',
      data: rows,
    });
  })
  .catch(console.log('error'))
  .then( () => db.end());
    
}) 

router.post('/department', ({body},res)=> {

})

module.exports = router;