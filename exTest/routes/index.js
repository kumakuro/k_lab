var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Menu' });
});

router.get('/find', function(req, res, next) {
  res.render('findtheword2', { title: 'Findtheword2' });
});

router.get('/tools', function(req, res, next) {
  res.render('tools', { title: 'Tools' });
});

module.exports = router;
