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
                db.collection('Users').insertOne(user.toModel(), function(err, res){
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
}

module.exports.DataBaseManager = DataBaseManager;