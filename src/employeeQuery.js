const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

db.promise().query("SELECT 3")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => db.end());

module.exports = router;