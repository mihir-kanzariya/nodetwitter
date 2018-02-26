process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let flash = require('express-flash');
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const multer = require('multer');
const nodemailer = require('nodemailer');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
let bcrypt = require('bcrypt');


const routes = require('./routes');
const User = require('./models/users.models');
const help = require('./controllers/helper.controller.js');
const mongoDb = require('./helpers/mongoDb');

const app = express();
require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('Shh, its a secret!'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "Shh, its a secret!" ,  cookie: { maxAge: 600000000 }}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
console.log("console running...");
app.use('/', routes);


// ========================== Database Connection ==============================
const mongoURL = mongoDb.makeConnectionString();
mongoose.connect(mongoURL);
const db = mongoose.connection;


db.on('connecting', function() {
  console.log(chalk.yellow('connecting to MongoDB...'));
});

db.on('error', function(error) {
  console.log(chalk.red('Error in MongoDb connection: ' + error));
  mongoose.disconnect();
});

db.on('connected', function() {
  console.log(chalk.green(mongoURL+' => connected'));
});

db.once('open', function() {
  console.log(chalk.green('MongoDB connection opened!'));
});

db.on('reconnected', function () {
  console.log(chalk.blue('MongoDB reconnected!'));
});

app.use(function(req, res, next) {
  req.db = db;
  next();
});

mongoose.Promise = global.Promise;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.render('error');
});


//LOCAL STRATEGY FOR AUTHENTICATION
passport.use(new LocalStrategy(
  async function(username, password, done) {
  let getuser = await User.getUser({username: username});

  if (getuser) {
    if (getuser.status === true) {
      let ismatch = await help.comparePassword(password,getuser);
      if (ismatch) {
        return done(null, getuser);
      } else {
        // req.flash('failed');
        return done(null, false ,{message:'password incorrect'});
      }
    } else {
      return done(null, false ,{message:'Please verified your account check your mail id'});
    }
  } else {
      return done(null,false,{message: 'user not found.'})
   }
  }
 )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(async function(id, done) {
 let user = await User.getUserById(id);
 if (user) {
    done(null, user);
 }
});


app.listen();
module.exports = app;
