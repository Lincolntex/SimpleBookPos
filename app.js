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

// define API endpoints
app.get('/api/users/:username', function(req, res) {
    console.info('hit /api/users/:username method: GET');  
  
    db.getUser({'Username' : req.params['username']}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).send({'error' : err });
      } else {
        console.log(user)
        return res.status(200).send({'user' : user})
      }
    });
});

// expects user model in form of JSON in request body
app.post('/api/users', function(req, res) {
    console.info('hit /api/users method: POST');

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
    console.info('hit /api/users/:username method: DELETE');
  
    db.deleteUser({'Username' : req.params['username']}, function(err, db_res) {
      if (err) {
        return res.status(500).send({'error' : err });
      } else {
        return res.status(200).send({'user' : db_res})
      }
    });
});

// update params will be included in the body of the response object
app.put('/api/users/:username', function(req, res) {
      console.info('hit /api/users/:username method: UPDATE');
    
      let updateParams = req.body['updateParams'];
  // TODO
});

//login
app.post('/api/login', function(req, res) {
  console.info('hit /api/login method: POST');

  db.getUser(
    {
      'Username' : req.body['credentials']['Username'],
      'Pasword' : req.body['credentials']['Password']
    }, 
    function(err, db_res) {
      if (err) {
        return res.status(500).send({'error' : err})
      } else if (db_res === null) {
        return res.status(403).send({'error' : "Invalid credentials"});
      } else {
        return res.status(200).send({'error' : null});
      }
    })
});

// tell the server to start listening to requests at "localhost:3000/"
app.listen(ENV_PORT, function () {
  console.log('Example app listening on port ' + ENV_PORT)
  // TestSuite.RunTestSuite();
  // TestSuite.RunRandomTest();
})