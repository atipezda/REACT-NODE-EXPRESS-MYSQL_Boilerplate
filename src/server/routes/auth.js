const express = require('express');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const dbOptions = require('../modules/mssql');
const tokenHash = require('../modules/jwt');
const middleware = require('../modules/middlewares');

const router = express.Router();

sql.connect(dbOptions);
router.post('/login', (req, res) => {
  const { login, passwd } = req.body;
  console.log(req.body);
  sql
    .query(
      `select UserId, UserPassword FROM dbo.[User] where UserName = '${login}'`
    )
    .then((result) => {
      if (result.recordset.length) {
        if (passwd === result.recordset[0].UserPassword) {
          // console.log('auth ok');
          const { UserId } = result.recordset[0];
          const token = jwt.sign({ UserId }, tokenHash);
          res.json({ token });
        } else {
          console.log('unathorized');
          res.json({ err: true });
        }
      } else {
        console.log('unathorized');
        res.json({ err: true });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get('/token', middleware.checkToken, (req, res) => {
  // console.log(req.decoded.UserId);
  const userId = req.decoded.UserId;
  sql
    .query(`select UserId FROM dbo.[User] where UserId = '${userId}'`)
    .then((result) => {
      console.log(result);
      if (result.recordset[0].UserId) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    });
});

module.exports = router;
