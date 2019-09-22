const jwt = require('jsonwebtoken');
const tokenHash = require('../modules/jwt');

module.exports = {
  checkToken: (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, tokenHash, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
    return 0;
  }
};
