var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let credentials = require('./credentials');//store mongodb credentials in separate, non-tracked file
var db_admin = credentials.getCredentials();
//console.log(db_admin);

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://" + db_admin.username + ":" + db_admin.password + "@cluster0-i3nnd.gcp.mongodb.net/test?retryWrites=true&w=majority";
// Connect to the db
MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test_db");
  //var query = { address: "Park Lane 38" };
  var query = {};
  dbo.collection("test_collection").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
