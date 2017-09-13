/*
 * Since we are using Node.js in our app to serve up the
 * pages when they are requested, this is where we define 
 * the main server side logic. What folders and files to serve up 
 * and the main entrypoint of the application - "dashboard.html"
*/

// import libraries
const express = require('express')
const app = express()
var _ = require('lodash');
var path = require('path');
var bodyParser = require('body-parser');

var UserModel = require('./js/models/UserModel.js').UserModel;
var DatabaseManager = require('./js/DatabaseManager.js').DataBaseManager;
var db = new DatabaseManager();
var TestSuiteManager = require('./js/tests/TestingSuite.js').TestingSuite;
var TestSuite = new TestSuiteManager();

var ENV_PORT = 8080;

// tell the server which files we want to serve and where they are located
app.use("/styles", express.static(__dirname + '/styles')); // where we create our own custom css
app.use("/assets", express.static(__dirname + '/assets')); // where we store our image assets
app.use("/lib", express.static(__dirname + '/lib')); // where the bootstrap css and js are located
app.use("/js", express.static(__dirname + '/js'));
app.use("/views", express.static(__dirname + '/views'));
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req,res) {
  res.sendFile(path.join(__dirname, '/public/views/register.html'))
})

// Allow CORS for now, need to restrict in future
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// define API endpoints
app.get('/api/users/:username', function(req, res) {
    db.getUser({'Username' : req.params['username']}, function(err, user) {
      if (err) {
        return res.send(500, {'error' : err });
      } else {
        return res.send(200, {'user' : user})
      }
    });
});

// expects user model in form of JSON in request body
app.post('/api/users', function(req, res) {
    var user = new UserModel().CreateUser(
        req.body['user']['FirstName'],
        req.body['user']['LastName'],
        req.body['user']['Username'],
        req.body['user']['Password'],
        req.body['user']['Birthdate'],
        req.body['user']['Email'],
        req.body['user']['PhoneNumber'],
        req.body['user']['CurrentRentals'],
        req.body['user']['TransactionHistory'],
        req.body['user']['IsAdmin']
    );

    db.insertUser(user, function(err, db_res) {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send(db_res);
      }
    });
});

app.delete('/api/users/:username', function(req, res) {
    db.deleteUser({'Username' : req.params['username']}, function(err, res) {
      if (err) {
        res.send(500, {'error' : err});
      } else {
        res.send(200, {'user' : res});
      }
    });
});

// update params will be included in the body of the response object
app.put('/api/users/:username', function(req, res) {
      let updateParams = req.body['updateParams'];

});

// tell the server to start listening to requests at "localhost:3000/"
app.listen(ENV_PORT, function () {
  console.log('Example app listening on port ' + ENV_PORT)
  // TestSuite.RunTestSuite();
  // TestSuite.RunRandomTest();
})