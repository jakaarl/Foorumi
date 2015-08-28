var express = require('express');
var router = express.Router();

var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /users

// POST /users
router.post('/', function(req, res, next){
  var userToAdd = req.body;
  Models.User.count({
    where: { username: userToAdd.username }
  }).then(function(count) {
    if (count == 0) {
      Models.User.create(userToAdd).then(function(user) {
        res.json(user);
      });
    } else {
      res.status(400).json({ error: 'Käyttäjätunnus on jo käytössä!' });
    }
  });
});

// POST /users/authenticate
router.post('/authenticate', function(req, res, next){
  var userToCheck = req.body;
  if (userToCheck === null || userToCheck.username === null || userToCheck.password === null) {
    res.send(403);
    return;
  }
  Models.User.findOne({
    where: { username: userToCheck.username, password: userToCheck.password }
  }).then(function(user) {
    if (user) {
      req.session.userId = user.id;
      res.json(user);
    } else {
      res.send(403);
    }
  });
});

// GET /users/logged-in
router.get('/logged-in', function(req, res, next){
  var loggedInId = req.session.userId ? req.session.userId : null;
  if (loggedInId === null) {
    res.json({});
  } else {
    Models.User.findOne(loggedInId).then(function(user) {
      res.json(user);
    });
  }
});

// GET /users/logout
router.get('/logout', function(req, res, next){
  req.session.userId = null;

  res.send(200);
});

module.exports = router;
