var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ore no App' });
});
router.get('/tes', function(req, res, next) {
  res.send('bisa nih!');
});

module.exports = router;
