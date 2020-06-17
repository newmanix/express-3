var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let credentials = require('./credentials');//store mongodb credentials in separate, non-tracked file
var db_admin = credentials.getCredentials();
//console.log(db_admin);

//monk will be our db connection tool
var monk = require('monk');
//connection to Atlas
var uri = "mongodb+srv://" + db_admin.username + ":" + db_admin.password + "@cluster0-i3nnd.gcp.mongodb.net/test_db?retryWrites=true&w=majority";
var db = monk(uri);

db.then(()=>{
  console.log('Connected to server');
});

const collection = db.get('test_collection');

collection.find({}, function(err, docs){
    if(err){
      console.log(err);
    }else{
	console.log(docs);
    }
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.get('/collections/:name',function(req,res){
  var collection = db.get(req.params.name);
  collection.find({},{limit:20},function(e,docs){
    res.json(docs);
  })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to routers
app.use(function(req,res,next){
 req.db = db;
 next();
});

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
