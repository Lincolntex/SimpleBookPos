var UserModel = require('../models/UserModel.js').UserModel;
var BookModel = require('../models/BookModel.js').BookModel;
var AppointmenModel = require('../models/AppointmentModel.js').AppointmentModel;
var TransactionModel = require('../models/TransactionModel.js').TransactionModel;

var DatabaseManager = require('../DataBaseManager.js').DataBaseManager;
var db = new DatabaseManager();

class TestingSuite {
    constructor() {
        
    }

    // define very carefully architected test suites here
    RunTestSuite() {

    }

    // define random one off tests here
    RunRandomTest() {

    }
}

module.exports.TestingSuite = TestingSuite;