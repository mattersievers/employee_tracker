const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable =require('console.table');

router.get('/roles', (req, res) => {
  const sql = `SELECT * FROM roles`
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


module.exports = router;