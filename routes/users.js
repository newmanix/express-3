var express = require('express');
var router = express.Router();
//var data = require('../data/test.json');

router.get('/', function(req, res, next) {
  var title = "Our Users Page";
  var db = req.db;
  var collection = db.get('test_collection');
  collection.find({},{limit:20},function(e,docs){
      res.render('users/index', {
          title:title,
          users:docs
      });
  });
});

module.exports = router;

