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
  // var dbfile = require('./js/DataBaseManager.js').DataBaseManager;
  // var db = new dbfile();
  // var UserModel = require('./js/models/UserModel.js').UserModel;
  // var User = new UserModel().makeUser('Me', 'Doe', '12', '06', true, [4], [7])

  // db.insertUser(User, function(err, res){
  //   if(err){
  //     console.error("[app] error - "+ err)
  //   }
  //   else{
  //     console.log(res);
  //   }
  // })
})