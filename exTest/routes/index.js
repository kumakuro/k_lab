var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Menu' });
});

router.get('/find', function(req, res, next) {
  res.render('findtheword2', { title: 'Findtheword2' });
});

router.get('/read', function(req, res, next) {
  res.render('readonmyownlb', { title: 'Readonmyownlb' });
});


router.get('/tools', function(req, res, next) {
  res.render('tools', { title: 'Tools' });
});

router.get('/dude', function(req, res, next) {
  res.render('panda', { title: 'dude' });
});

router.get('/panda', function(req, res, next) {
  res.render('panda2', { title: 'Santa Panda' });
});

router.get('/test', function(req, res, next) {
  res.render('phaser', { title: 'phaser test' });
});

module.exports = router;
