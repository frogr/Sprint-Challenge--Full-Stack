const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

const Account = require('./AccountModel.js');

const STATUS_USER_E = 422;
const STATUS_SERVER_E = 500;
const STATUS_GOOD = 200;
const server = express();

server.use(bodyParser.json());

// root users
server.get('/users');

// plumbing
mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/budget', {
  useMongoClient: true
});

connect.then(
  () => {
    const port = 3000;
    server.listen(port);
    console.log(`Listening! PORT: ${port}`);
  },
  err => {
    console.log(
      '!!E: unable to connect to mongo. make sure server is running!'
    );
  }
);
