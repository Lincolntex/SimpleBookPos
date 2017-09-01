/*
 * Since we are using Node.js in our app to serve up the
 * pages when they are requested, this is where we define 
 * the main server side logic. What folders and files to serve up 
 * and the main entrypoint of the application - "dashboard.html"
*/

// import libraries
const express = require('express')
const app = express()
var path = require('path');
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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req,res) {
  res.sendFile(path.join(__dirname, '/public/views/register.html'))
})

// define API endpoints
app.get('/api/users/:username', function(req, res) {
    db.getUser({'Username' : req.params.username}, function(err, user) {
      if (err) {
        return res.send(500, {'error' : err });
      } else {
        return res.send(200, {'user' : user})
      }
    });
});

// tell the server to start listening to requests at "localhost:3000/"
app.listen(ENV_PORT, function () {
  console.log('Example app listening on port ' + ENV_PORT)
  // TestSuite.RunTestSuite();
  // TestSuite.RunRandomTest();
})