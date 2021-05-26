var express = require('express');
const User = require('../models/user').User;
const Router = require('express-promise-router');
var router = new Router;
var debug = require('debug')(process.env.APP_NAME+':usersRoute');
var db = require('../db/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Users' });
});

router.post('/', (req, res, next) => {
  var marcus = new User({username: 'marcus'}, 'users');
  debug(marcus);
  res.send({username: 'marcus'});
});

module.exports = router;
