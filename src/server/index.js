const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const appRoute = require('./routes/routes.js');

const app = express();

app.use(express.static('dist'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use('/auth', authRoute);
app.use('/', appRoute);

app.listen(9761, () => {});
