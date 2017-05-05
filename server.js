const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var routes = require('./routes');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
var flash    = require('connect-flash');
var compress = require('compression');
var port = process.env.PORT || 4000;

var dbData = require('./config/database.js');

var configDB = dbData.prod;

const MongoClient = require('mongodb').MongoClient;
var app = express(),
  dir = __dirname,
  publicDir = path.join(dir, 'public'),
  imagesDir = path.join(dir, 'public', 'images'),
  buildDir = path.join(dir, 'public', 'build');


var db;

// CORS
app.use(logger('dev'));
app.use(compress());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(publicDir));
app.use(bodyParser.raw({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json());

app.use(favicon(path.join(imagesDir, 'favicon.ico')));

// required for passport
app.use(session({ secret: configDB.secret})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated());
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      console.log("res", req.user);
      return next();
    } else {
      console.log("res", req.user);
       // if they aren't redirect them to the home page
      res.status(403).send('failed authentication');
    }
}

// mongodb://localhost:27017/fmcg
MongoClient.connect('mongodb://localhost:27017/', {
  uri_decode_auth: true
}, (err, database) => {

  // ... start the server
  if (err) {
    app.get ('/', (req, res, next) => {
      res.sendFile(path.join(publicDir, 'index.html'));
    });

    app.use((req, res, next) => {
      res.sendFile(path.join(publicDir, 'index.html'));
    });

    app.listen(port, () => {
      console.log('listening on', port)
    });
    return console.log(err)
  }
  else {
    db = database;

    require('./config/passport')(passport, db);

    app.get ('/', (req, res, next) => {
      res.sendFile(path.join(publicDir, 'index.html'));
    });

    app.post('/api/getData',
             (req, res, next) => routes.loginUser(req, res, next, passport));

    app.get('/api/logout',
             isLoggedIn,
             (req, res) => routes.logoutUser(req, res));

    app.get('/api/getData',
            (req, res) => routes.getData(req, res, db));

    app.put('/api/submitData', (req, res) => routes.submitData(req, res, db));

    app.use((req, res, next) => {
      res.sendFile(path.join(publicDir, 'index.html'));
    });

    app.listen(port, () => {
      console.log('listening on', port)
    });
  }
});
