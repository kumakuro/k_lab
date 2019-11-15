var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('todo', { title: '待办' });
});

module.exports = router;
