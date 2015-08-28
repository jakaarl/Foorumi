"use strict";
var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /topics

// GET /topics
router.get('/', function(req, res, next) {
    Models.Topic.findAll().then(function(topics) {
        res.json(topics);
    });
});

// GET /topics/:id
router.get('/:id', function(req, res, next) {
  var topicId = req.params.id;
  Models.Topic.findOne({
    where: { id: topicId },
    include: { model: Models.Message }
  }).then(function(topic) {
      res.json(topic);
  });
});

// POST /topics
router.post('/', function(req, res, next) {
  var topicToAdd = req.body;
  Models.Topic.create(topicToAdd).then(function() {
      res.json(topicToAdd);
  });
});

// POST /topics/:id/message
router.post('/:id/message', function(req, res, next) {
  var topicId = req.params.id;
  var messageToAdd = req.body;
  messageToAdd.TopicId = topicId;
  Models.Message.create(messageToAdd).then(function (message) {
    res.json(message);
  });
});

module.exports = router;
