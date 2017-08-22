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
                    console.error("[DB-Manager][getUser] : Invalad search perameters provided");
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
                    console.error("[DB-Manager][getUsers] : Invalad search perameters provided")
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
                    callback(err,null);
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
                    console.error("[DB-Manager][getUsers] : Invalad search perameters provided")
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
}


module.exports.DataBaseManager = DataBaseManager;