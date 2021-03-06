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

    getUser(searchParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][getUser] : could not get user info");
                callback(err,null);
            }
            else{
                if(util.ValidateUserSearchParams(searchParams)){
                    db.collection(UsersTableName).findOne(searchParams, function(err,res){
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

    getUsers(searchParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][getUsers] : Could not get user info");
                callback(err,null);
            }
            else{
                if(util.ValidateUserSearchParams(searchParams)){
                    db.collection(UsersTableName).find(searchParams,function(err,res){
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

    updateUser(searchParams,updateParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][updateUser] : Could not connect to DB");
                callback(err,null);
            }
            else{
                if(util.ValidateUserSearchParams(searchParams) && util.ValidateUserSearchParams(updateParams)){
                    var updateParamsFormatted = {$set : updateParams};
                    db.collection(UsersTableName).updateOne(searchParams, updateParamsFormatted, function(err,res){
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

    deleteUser(searchParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][getUsers] : Could not get user info");
                callback(err,null);
            }
            else{
                if(util.ValidateUserSearchParams(searchParams)){
                    db.collection(UsersTableName).findOneAndDelete(searchParams,function(err,res){
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

    getBook(searchParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][getBook] : could not connect to the DB");
                callback(err,null);
            }
            else{
                if(util.ValidateBookSearchParams(searchParams)){
                    db.collection(BooksTableName).findOne(searchParams,function(err,res){
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
                if(ValidateBookSearchParams(searchParams)){
                    db.collection(BooksTableName).find(searchParams,function(err,res){
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

    updateBook(searchParams,updateParams,callback){
        this.MongoClient.connect(this.url,function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][updateBook] : Could not connect to DB");
                callback(err,null);
            }
            else{
                if(util.ValidateBookSearchParams(searchParams) && util.ValidateBookSearchParams(updateParams)){
                    var updateParamsFormatted = {$set : updateParams};
                    db.collection(BooksTableName).updateOne(searchParams,updateParamsFormatted,function(err,res){
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

    deleteBook(searchParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error("[DB-Manager][deleteBook] : could not connect to DB");
                callback(err,null);
            }
            else{
                if(util.ValidateBookSearchParams(searchParams)){
                    db.collection(BooksTableName).findOneAndDelete(searchParams,function(err,res){
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

    getAppointment(searchParams, callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][getAppointment] : Could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateAppointmentSearchParams(searchParams)){
                    db.collection(AppointmentsTableName).findOne(searchParams, function(err,res){
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

    getAppointments(searchParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][getAppointments] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateAppointmentSearchParams(searchParams)){
                    db.collection(AppointmentsTableName).find(searchParams, function(err,res){
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

    updateAppointments(searchParams,updateParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][updateAppointment] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateAppointmentSearchParams(searchParams) && util.ValidateAppointmentSearchParams(updateParams)){
                    var updateParamsFormatted = {$set : updateParams};
                    db.collection(AppointmentsTableName).updateOne(searchParams,updateParamsFormatted, function(err,res){
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

    deleteAppointment(searchParams,callback){
        this.MongoClient.connect(this.url,function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][deleteAppointment] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateAppointmentSearchParams(searchParams)){
                    db.collection(AppointmentsTableName).findOneAndDelete(searchParams, function(err,res){
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
    getTransaction(searchParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close()
                console.error('[DB-Manager][getTransaction] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateTransactionSearchParams(searchParams)){
                    db.collection(TransactionsTableName).findOne(searchParams, function(err,res){
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

    getTransactions(searchParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close()
                console.error('[DB-Manager][getTransaction] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateTransactionSearchParams(searchParams)){
                    db.collection(TransactionsTableName).find(searchParams, function(err,res){
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

    updateTransaction(searchParams,updateParams,callback){
        this.MongoClient.connect(this.url, function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][updateTransaction] : Could not connect to the DB');
                callback(err,null);
            }
            else{
                if(util.ValidateTransactionSearchParams(searchParams) && util.ValidateTransactionSearchParams(updateParams)){
                    var updateParamsFormatted = {$set : updateParams};
                    db.collection(TransactionsTableName).updateOne(searchParams,updateParamsFormatted, function(err,res){
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

    deleteTransatction(searchParams,callback){
        this.MongoClient.connect(this.url,function(err,db){
            if(err){
                db.close();
                console.error('[DB-Manager][deleteTransaction] : could not connect to DB');
                callback(err,null);
            }
            else{
                if(util.ValidateTransactionSearchParams(searchParams)){
                    db.collection(TransactionsTableName).findOneAndDelete(searchParams, function(err,res){
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