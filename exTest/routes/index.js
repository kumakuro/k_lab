var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/find', function(req, res, next) {
  res.render('findtheword2', { title: 'findtheword2!!!' });
});

router.get('/tools', function(req, res, next) {
  res.render('tools', { title: '工坊主' });
});

module.exports = router;
