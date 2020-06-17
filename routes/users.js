var express = require('express');
var router = express.Router();
//var data = require('../data/test.json');

// show list of users 
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

//show an individual user
router.get('/view/:id', function(req, res, next) {
  var title = "User Page";
  var db = req.db;
  var id = req.params.id;
  var collection = db.get('test_collection');
  collection.find({'_id':id},{limit:1},function(e,docs){
      res.render('users/view', {
          title:title,
          users:docs
      });
  });
});

//form to add user
router.get('/add', function(req, res, next) {
  var title = "Add User";
      res.render('users/add', {
          title:title
      });
});

module.exports = router;

