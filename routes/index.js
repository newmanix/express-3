var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = "Our Home Page";
  res.render('pages/index',{
    title:title
  });
});

module.exports = router;
