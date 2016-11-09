var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var randomString = require('randomstring');
var serveStatic = require('serve-static');
var schema = mongoose.Schema;

var app = express();

app.io = require('socket.io')();

var sio = app.io;


var session = require('express-session');
var sessionStore = require('sessionstore');
store = sessionStore.createSessionStore();

app.use(session({
    store: store,
    secret: 'grooshbene',
    cookie: {
        path: '/',
        expires: false
    }
}));

app.use(serveStatic(__dirname, ({
    'index': false
})));

var UserSchema = new schema({
    _id : String,
    name : String,
    profile : String,
    password : String,
    email : String,
    projects : [{
        type : String,
        ref : 'projects'
    }]
});

var ProjectSchema = new schema({
    _id : String,
    name : String,
    invite_link : String
});

var ProjectUserSchema = new schema({
    _id : String,
    _projectId : String,
    profile : String,
    name : String
});

var ScrumSchema = new schema({
    _id : String,
    maker : String,
    title : String,
    date : Date,
    due : Date,
    important : Number,
    comment : String,
    memo : [{
        type : String,
        ref : 'memos'
    }],
    project : String,
    status : Number
});

var MemoSchema = new schema({
    _id : String,
    maker : String,
    comment : String
});

var User = mongoose.model('users', UserSchema);
var Project = mongoose.model('projects', ProjectSchema);
var ProjectUser = mongoose.model('projectusers', ProjectUserSchema);
var Scrum = mongoose.model('scrums', ScrumSchema);
var Memo = mongoose.model('memos', MemoSchema);
mongoose.connect("mongodb://localhost:27017/agile", function (err) {
    if(err){
        console.log("MongoDB Error");
        throw err;
    }
});

//requiring vars
var routes = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

require('./routes/auth.js')(app, User, randomString);
require('./routes/project.js')(app, User, Project, ProjectUser, randomString);
require('./routes/chat.js')(app, User, Project, ProjectUser, randomString, sio);
require('./routes/scrum.js')(app, User, Project, ProjectUser, Scrum, Memo, randomString);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
