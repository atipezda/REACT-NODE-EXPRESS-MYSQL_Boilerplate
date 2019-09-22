const express = require('express');
const jwt = require('jsonwebtoken');
const tokenHash = require('../modules/jwt');
const middleware = require('../modules/middlewares');
const mc = require('../modules/mysql');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { login, passwd } = req.body;
  console.log(req.body);
  const user = await mc.query(
    'SELECT userID FROM Users WHERE username = ? and password = ?',
    [login, passwd]
  );
  const userID = user.length ? user[0].userID : null;
  console.log(userID);
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
  // console.log(req.decoded.UserId);
  const { userID } = req.decoded;
  console.log(userID);
  const authorisation = await mc.query(
    'SELECT userID FROM Users WHERE userID = ?',
    [userID]
  );
  const isAuth = authorisation.length > 0;
  if (isAuth) return res.json({ success: true });
  return res.json({ success: false });
});

module.exports = router;
