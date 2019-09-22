const express = require('express');
const { fork } = require('child_process');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Birds home page');
});

router.get('/nano.php', (req, res) => {
  const { value, mac } = req.query;
  const termometer = { value, mac };
  const insertWorker = fork('./src/server/modules/insertToDb.js');
  insertWorker.send(termometer);
  res.sendStatus(200);
});

module.exports = router;
