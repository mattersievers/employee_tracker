const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/roles', (req, res) => {
  const sql = `SELECT * FROM roles`
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


module.exports = router;