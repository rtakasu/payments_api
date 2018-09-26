var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoDB = 'mongodb://rafael:password7@ds115283.mlab.com:15283/takasu_bank';
var bodyParser = require('body-parser')
var User = require('../models/User.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Hello world */
router.get('/hello', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ hello: "world" }));
});

router.post('/parse-body', jsonParser, function(req, res, next) {
  res.send(JSON.stringify({ email: req.body.email }));
})

// app.post('/login', urlencodedParser, function (req, res) {
//   res.send('welcome, ' + req.body.username)
// })

router.post('/create-user', function(req, res, next) {
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.send('User successfully created');
      }
    });
  }
});



module.exports = router;
