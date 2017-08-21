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


// tell the server which files we want to serve and where they are located
app.use("/styles", express.static(__dirname + '/styles')); // where we create our own custom css
app.use("/assets", express.static(__dirname + '/assets')); // where we store our image assets
app.use("/lib", express.static(__dirname + '/lib')); // where the bootstrap css and js are located

// define the main endpoint "localhost:port/"
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/dashboard.html'));
});

// tell the server to start listening to requests at "localhost:3000/"
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  TestSuite.RunTestSuite()
  TestSuite.RunRandomTest();
})