const express = require('express');
const jwt = require('jsonwebtoken');
const tokenHash = require('../modules/jwt');
const middleware = require('../modules/middlewares');
const mc = require('../modules/mysql');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { login, passwd } = req.body;
  const user = await mc.query(
    'SELECT userID FROM Users WHERE username = BINARY ? and password = BINARY ?',
    [login, passwd]
  );
  const userID = user.length ? user[0].userID : null;
  if (userID) {
    const token = jwt.sign({ userID }, tokenHash);
    res.cookie('jwt', token, { httpOnly: false, secure: false });
    res.json({ success: true });
  } else {
    console.log('unathorized');
    res.json({ err: true });
  }
});
router.get('/token', middleware.checkToken, async (req, res) => {
  const { userID } = req.decoded;
  const authorisation = await mc.query(
    'SELECT userID FROM Users WHERE userID = ?',
    [userID]
  );
  const isAuth = authorisation.length > 0;
  if (isAuth) return res.json({ success: true });
  return res.json({ success: false });
});
router.get('/logout', async (req, res) => {
  res.clearCookie('jwt');
  res.sendStatus(200);
});

module.exports = router;
