const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ore no App' });
});
router.get('/tes', function(req, res, next) {
  res.send(process.env.TES);
});

module.exports = router;
