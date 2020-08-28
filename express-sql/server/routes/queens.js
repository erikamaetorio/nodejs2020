const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/queens', async (req, res, next) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/queens/:id', async (req, res, next) => {
  try {
    let results = await db.one(req.params.id);
    res.json(results);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;