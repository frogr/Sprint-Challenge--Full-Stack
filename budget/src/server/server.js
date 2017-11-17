const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

const Account = require('./AccountModel.js');

const STATUS_USER_E = 422;
const STATUS_SERVER_E = 500;
const STATUS_GOOD = 200;
const server = express();

server.use(bodyParser.json());

// root show accounts
server.get('/accounts', (req, res) => {
  Account.find({}, (err, accounts) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({
        error: '!!E: unable to find accounts'
      });
    } else {
      res.status(STATUS_GOOD).json(accounts);
    }
  });
});
// check account by id
server.get('/accounts/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, accounts) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({
        error: '!!E: unable to find account with matching ID'
      });
    } else {
      res.status(STATUS_GOOD).json(accounts);
    }
  });
});
// add account
server.post('/accounts', (req, res) => {
  const newAccount = new Account(req.body);

  newAccount.save((err, accounts) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({
        error: '!!E: unable to create account!'
      });
    } else {
      res.status(201).json(accounts);
    }
  });
});
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
