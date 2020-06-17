var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var title = "Our Users Page";
  var db = req.db;
  var collection = db.get('test_collection');
  collection.find({},{limit:20},function(e,docs){
      console.log(docs);
      res.render('users/index', {
          title:title,
          users:docs
      });
  });
});

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

/* add user form */
router.get('/add', function(req, res, next) {
  var title = "Add User";
      res.render('users/add', {
          title:title
      });
});

/* insert user */
router.post('/insert', function(req, res) {
    // retrieve form values - reliant on name attributes
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    //we're generating a random number here, to manage the images
    var id = Math.floor(Math.random() * 99) + 1;
    var db = req.db;
    var collection = db.get('test_collection');
  
  collection.insert({
    "first_name" : first_name,
     "last_name" : last_name,
     "email" : email,
     "id": id
  })
  .then((docs) => {
    // docs contains the documents inserted with added **_id** fields
    console.log(docs);
    
    var title = "New User Added!";
    //show new user/view page - docs required [] as was not an array
    res.render('users/view', {
          title:title,
          users:[docs]
      });
    
  }).catch((err) => {
     res.send("ERROR: User not added.");
  }).then(() => db.close())
});

module.exports = router;

