var express = require('express');
var router = express.Router();
var debug = require('debug')(process.env.APP_NAME+':indexRoute');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food App' });
});

module.exports = router;
