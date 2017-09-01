/*
 * Author: Jacob Leveroni
 * Created 2017-08-20
 * 
 * DataBaseManager defines all the structure of all data models
 * that will be stored in our database, as well as functoins for
 * creating those models in our code. It also defines functions
 * for inserting, updating, retrieving, and deleting objects in 
 * our database, think of this as the middleman between our application
 * and our databse. the database should not be accessed from anywhere 
 * outside of the functions defined in this file.
*/
var UserModel = require('./models/UserModel.js').UserModel;
var BookModel = require('./models/BookModel.js').BookModel;
const UsersTableName = "Users";
const BooksTableName = "Books";
const AppointmentsTableName = "Appointments";
const TransactionsTableName = "Transactions";
var Utility = require("./Utility.js").Utility;
var util = new Utility()

class DataBaseManager{
    constructor(){
        this.MongoClient = require('mongodb').MongoClient;
        this.url = 'mongodb://localhost:27017/posDatabase';

    }

    insertUser(user, callback) {
        this.MongoClient.connect(this.url, function(err,db) {
            if(err) {
                db.close();
                console.error('[DB-Manager][insertUser] : could not connect to DB');
                callback(err, null);
            }
            else{
                db.collection(UsersTableName).insertOne(user.ToModel(), function(err, res){
                    db.close();
                    if(err) {
                        console.error('[DB-Manager][insertUser] : could not insert user');
                        callback(err, null);
                    }
                    else {
                        callback(null, res);
                    }
                })
            }
        })
    }

    getUser(searchPerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][getUser] : could not get user info");
                callback(err,null);
            }
            else{
                if(util.ValidateUserSearchParams(searchPerams)){
                    db.collection(UsersTableName).findOne(searchPerams, function(err,res){
                        db.close();
                        if(err){
                            console.error("[DB-Manager][getUser] : Query failed");
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error("[DB-Manager][getUser] : Invalid search parameters provided");
                    callback("404",null);
                }
            }
        })
    }

    getUsers(searchPerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][getUsers] : Could not get user info");
                callback(err,null);
            }
            else{
                if(util.ValidateUserSearchParams(searchPerams)){
                    db.collection(UsersTableName).find(searchPerams,function(err,res){
                        db.close();
                        if(err){
                            console.error("[DB-Manager][getUsers] : Querys failed");
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error("[DB-Manager][getUsers] : Invalid search parameters provided")
                    callback("404",null);
                }
            }
        })
    }

    updateUser(searchPerams,updatePerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][updateUser] : Could not connect to DB");
                callback(err,null);
            }
            else{
                if(util.ValidateUserSearchParams(searchPerams) && util.ValidateUserSearchParams(updatePerams)){
                    var updateParamsFormatted = {$set : updatePerams};
                    db.collection(UsersTableName).updateOne(searchPerams, updateParamsFormatted, function(err,res){
                        db.close();
                        if(err){
                            console.error("[DB-Manager][UpdateUser] : Could not update user");
                            callback(err,null);
                        }
                        else{
                            callback(null,res)
                        }
                    })
                }
                else{
                    console.error("Invalid search parameters provided");
                    callback('404',null);
                } 
            }
        })
    }

    deleteUser(searchPerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][getUsers] : Could not get user info");
                callback(err,null);
            }
            else{
                if(util.ValidateUserSearchParams(searchPerams)){
                    db.collection(UsersTableName).findOneAndDelete(searchPerams,function(err,res){
                        db.close();
                        if(err){
                            console.error("[DB-Manager][getUsers] : Querys failed");
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error("[DB-Manager][getUsers] : Invalid search parameters provided")
                    callback("404",null);
                }
            }
        })
    }

    insertBook(book,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][insertBook] : could not connect to DB');
                callback(err,null);
            }
            else{
                db.collection(BooksTableName).insertOne(book.ToModel(), function(err, res){
                    db.close();
                    if(err){
                        console.error('[DB-Manager][insertBook] : could not insert book');
                        callback(err, null);
                    }
                    else{
                        callback(null, res);
                    }
                })
            }
        })
    }

    getBook(searchPerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][getBook] : could not connect to the DB");
                callback(err,null);
            }
            else{
                if(util.ValidateBookSearchParams(searchPerams)){
                    db.collection(BooksTableName).findOne(searchPerams,function(err,res){
                        db.close();
                        if(err){
                            console.error("[DB-Manager][getBook] : Query failed");
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error("[DB-Manager][getBook] : Invalid search parameters provided");
                    callback("404",null);
                }
            }
        })
    }

    getBooks(book,callback){
        this.MongoClient.connect(this.url,function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][getBooks] : could not connect to the DB");
                callback(err,null);
            }
            else{
                if(ValidateBookSearchParams(searchPerams)){
                    db.collection(BooksTableName).find(searchPerams,function(err,res){
                        db.close();
                        if(err){
                            console.error("[DB-Manager][getBooks] : Query failed");
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error("[DB-Manager][getBooks] : Invalid search parameters provided");
                    callback("404",null);
                }
            }
        })
    }

    updateBook(searchPerams,updatePerams,callback){
        this.MongoClient.connect(this.url,function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][updateBook] : Could not connect to DB");
                callback(err,null);
            }
            else{
                if(util.ValidateBookSearchParams(searchPerams) && util.ValidateBookSearchParams(updatePerams)){
                    var updateParamsFormatted = {$set : updatePerams};
                    db.collection(BooksTableName).updateOne(searchPerams,updateParamsFormatted,function(err,res){
                        db.close();
                        if(err){
                            console.error("[DB-Manager][updateBook] : Could not update book");
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error("[DB-Manager][updateBook] : Invalid search parameters provided");
                    callback('404',null);
                }
            }
        })
    }

    deleteBook(searchPerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][deleteBook] : could not connect to DB");
                callback(err,null);
            }
            else{
                if(util.ValidateBookSearchParams(searchPerams)){
                    db.collection(BooksTableName).findOneAndDelete(searchPerams,function(err,res){
                        db.close();
                        if(err){
                            console.error("[DB-Manager][deleteBook] : Querys failed");
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
    
                }
                else{
                    console.error("[DB-Manager][deleteBook] : Invalid search parameters provided");
                    callback("404",null);
                }
            }
        })
    }

    insertAppointment(appointment,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close()
                console.error('[DB-Manager][insertAppointment] : could not connect to DB');
                callback(err,null);
            }
            else{
                db.collection(AppointmentsTableName).insertOne(appointment.ToModel(), function(err,res){
                    db.close();
                    if(err){
                        console.error('[DB-Manager][insertAppointment] : could not insert Appointment');
                        callback(err,null);
                    }
                    else{
                        callback(err,null);
                    }
                })
            }
        })
    }

    getAppointment(searchPerams, callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][getAppointment] : Could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateAppointmentSearchParams(searchPerams)){
                    db.collection(AppointmentsTableName).findOne(searchPerams, function(err,res){
                        db.close();
                        if(err){
                            console.error('[DB-Manager][getAppointment] : could not retrieve Appointment');
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    });
                }
                else{
                    console.error('[DB-Manager][getAppointment] : Invalid search parameter provided');
                    callback(err,null);
                }
            }
        });
    }

    getAppointments(searchPerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][getAppointments] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateAppointmentSearchParams(searchPerams)){
                    db.collection(AppointmentsTableName).find(searchPerams, function(err,res){
                        db.close();
                        if(err){
                            console.error('[DB-Manager][getAppointments] : could not retrieve Appointments');
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error('[DB-Manager][getAppointments] : Invalid search parameter provided');
                    callback("404",null);
                }
            }
        })
    }

    updateAppointments(searchPerams,updatePerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][updateAppointment] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateAppointmentSearchParams(searchPerams) && util.ValidateAppointmentSearchParams(updatePerams)){
                    var updateParamsFormatted = {$set : updatePerams};
                    db.collection(AppointmentsTableName).updateOne(searchPerams,updateParamsFormatted, function(err,res){
                        db.close();
                        if(err){
                            console.error('[DB-Manager][updateAppointment] : could not update Appointment');
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    });
                }
                else{
                    console.error('[DB-Manager][updateAppointment] : Invalid search parameters provided');
                    callback("404",null);
                }
            }
        });
    }

    deleteAppointment(searchPerams,callback){
        this.MongoClient.connect(this.url,function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][deleteAppointment] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateAppointmentSearchParams(searchPerams)){
                    db.collection(AppointmentsTableName).findOneAndDelete(searchPerams, function(err,res){
                        db.close()
                        if(err){
                            console.error('[DB-Manager][deleteAppointment] : could not remove appointment');
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error('[DB-Manager][deleteAppointment] : Invalid search parameters provided');
                    callback("404",null);
                }
            }
        })
    }

    insertTransaction(transaction, callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][insertTransaction] : could not connect to DB');
                callback(err,null);
            }
            else{
                db.collection(TransactionsTableName).insertOne(transaction.ToModel(), function(err, res){
                    db.close();
                    if(err){
                        console.error('[DB-Manager][insertTransaction] : could not insert Transaction');
                    }
                    else{
                        callback(err,null);
                    }
                })
            }
        })
    }
    getTransaction(searchPerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close()
                console.error('[DB-Manager][getTransaction] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateTransactionSearchParams(searchPerams)){
                    db.collection(TransactionsTableName).findOne(searchPerams, function(err,res){
                        db.close();
                        if(err){
                            console.error('[DB-Manager][getTransaction] : could not find transaction');
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error('[DB-Manager][getTransaction] : Invalid search parameters provided');
                    callback("404",null);
                }
            }
        })
    }

    getTransactions(searchPerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close()
                console.error('[DB-Manager][getTransaction] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateTransactionSearchParams(searchPerams)){
                    db.collection(TransactionsTableName).find(searchPerams, function(err,res){
                        db.close();
                        if(err){
                            console.error('[DB-Manager][getTransaction] : could not find transaction');
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error('[DB-Manager][getTransaction] : Invalid search parameters provided');
                    callback("404",null);
                }
            }
        })
    }

    updateTransaction(searchPerams,updatePerams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][updateTransaction] : Could not connect to the DB');
                callback(err,null);
            }
            else{
                if(util.ValidateTransactionSearchParams(searchPerams) && util.ValidateTransactionSearchParams(updatePerams)){
                    var updateParamsFormatted = {$set : updatePerams};
                    db.collection(TransactionsTableName).updateOne(searchPerams,updateParamsFormatted, function(err,res){
                        if(err){
                            console.error('[DB-Manager][updateTransaction] : Could not update the Transaction');
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error('[DB-Manager][updateTransaction] : Invalid search parameters provided');
                    callback("404",null);
                }
            }
        })
    }

    deleteTransatction(searchPerams,callback){
        this.MongoClient.connect(this.url,function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][deleteTransaction] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateTransactionSearchParams(searchPerams)){
                    db.collection(TransactionsTableName).findOneAndDelete(searchPerams, function(err,res){
                        db.close()
                        if(err){
                            console.error('[DB-Manager][deleteTransaction] : could not remove trasaction');
                            callback(err,null);
                        }
                        else{
                            callback(null,res);
                        }
                    })
                }
                else{
                    console.error('[DB-Manager][deleteAppointment] : Invalid search parameters provided');
                    callback("404",null);
                }
            }
        })
    }

}


module.exports.DataBaseManager = DataBaseManager;