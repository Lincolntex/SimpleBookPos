// Node.js app setup

/*
 * Import Needed NPM libraries
*/
const express = require('express')
const app = express()
const PORT = 8080;
let _ = require('lodash');
let path = require('path');
let bodyParser = require('body-parser');

/*
 * Import our own needed files
*/
let UserModel = require('./js/models/UserModel.js').UserModel;

let DatabaseManager = require('./js/DatabaseManager.js').DataBaseManager;
let db = new DatabaseManager();

let TestSuiteManager = require('./js/tests/TestingSuite.js').TestingSuite;
let TestSuite = new TestSuiteManager();

/*
 * Specify all the folders that the server should serve to the client
 */
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/lib", express.static(__dirname + '/lib'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/views", express.static(__dirname + '/views'));

/*
 * Specify the middleware that the server will user
*/
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

/*
 * Define routes and their corresponding pages that will represent them
*/
app.get('/database_manager', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views/databaseManager.html'));
})


app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/views/signIn.html'));
});

app.get('/admin', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/views/admin.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/profile.html'));
});

/*
 * API endpoints for communication from client to server
*/
app.get('/api/users/:username', (req, res) => {
    console.info('GET /api/users/:username');

    db.getUser({'Username' : req.params['username']}, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send({'message' : err });
      } else {
        console.log(user)
        return res.status(200).send({'message' : user});
      }
    });
});

app.post('/api/users', (req, res) => {
    console.info('POST /api/users');
    let user = new UserModel().BuildUserFromApiReq(req);

    db.insertUser(user, (err, db_res) => {
      if (err) {
        return res.status(500).send({'messagee' : err});
      } else {
        return res.status(200).send({'message' : db_res});
      }
    });
});

app.delete('/api/users/:username', (req, res) => {
    console.info('DELETE /api/users/:username');

    db.deleteUser({'Username' : req.params['username']}, (err, db_res) => {
      if (err) {
        return res.status(500).send({'message' : err });
      } else {
        return res.status(200).send({'message' : db_res})
      }
    });
});

app.put('/api/users/:username', (req, res) => {
      console.info('UPDATE /api/users/:username');
      let updateParams = req.body['updateParams'];

      db.updateUser(searchParams, {'Username' : req.params['username']}, (err, db_res) => {
        if (err) {
          return res.status(500).send({'message' : err})
        } else if (db_res === null) {
          return res.status(200).send({'message' : "No user found to update"});
        } else {
          return res.status(200).send({'message' : null});
        }
      });
});

app.post('/api/login', (req, res) => {
  console.info('POST /api/login method');

  let searchParams = {
    'Username' : req.body['credentials']['Username'],
    'Password' : req.body['credentials']['Password']
  };

  db.getUser(searchParams, (err, db_res) => {
      if (err) {
        return res.status(500).send({'message' : err});
      } else if (db_res === null) {
        return res.status(403).send({'message' : "Invalid credentials"});
      } else {
        return res.status(200).send({'message' : null});
      }
    })
});

/*
 * Launch the server on the specified port
*/
app.listen(PORT, () => {
  console.log(`POS app listening on port ${PORT}`);

  // Uncomment the following lines to run the test suites
  // TestSuite.RunTestSuite();
  // TestSuite.RunRandomTest();
});
