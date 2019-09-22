const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const appRoute = require('./routes/routes.js');

const app = express();

app.use(cookieParser());
app.use(express.static('dist'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use('/auth', authRoute);
app.use('/', appRoute);

app.listen(9761, () => {});
