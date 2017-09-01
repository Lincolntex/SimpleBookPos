var UserModel = require('../models/UserModel.js').UserModel;
var BookModel = require('../models/BookModel.js').BookModel;
var AppointmentModel = require('../models/AppointmentModel.js').AppointmentModel;
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


//updateBook test
    // var test = {"Title" : "IT", "Author" : "Stephen King"};
    // var updateperameters = {"Title" : "Maximum Ride", "author" : "Patterson"}
    // db.updateBook(test,updateperameters,function(err,res){
    //     if(err){
    //         console.error(err);
    //     }
    //     else{
    //         console.log(res);
    //     }
    // })

//getBooks test
        var book = {"CustomerId" : "test2", "transactionDate" : "test2"}
        db.deleteTransatction(book,function(err,res){
        console.log(res);
    })
        
//insertBook test
        // var book = new BookModel()._TestModel();
        // db.insertBook(book,function(err,res){

        // })

//getBook test
        // var test = {"CustomerId" : "ID_545.9924177464321", "TransactionDate" : 1503298264949 }
        // db.getTransaction(test,function(err,res){
        //     console.log(err,res);
        // })

//updateUser test
        // var test = {"CustomerId" : "ID_244.03819074003093", "TransactionDate" : 1503453877951};
        // var updateperameters = {"CustomerId" : "test2", "TransactionDate" : 'test2'}
        // db.updateTransaction(test, updateperameters,function(err,res){
        //     if(err){
        //         console.error(err);
        //     }
        //     else{
        //         console.log(res);
        //     }
        // })

        // var Appointment = new AppointmentModel()._TestModel();
        // var Transaction = new TransactionModel()._TestModel();
    }
}

module.exports.TestingSuite = TestingSuite;