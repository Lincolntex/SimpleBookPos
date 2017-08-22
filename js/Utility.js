/* 
 * Author: Jacob Leveroni
 * Created 2017-08-20
 * 
 * Utility is where we define functions and objects that will
 * be used throughout our entire application. Any function of object
 * that is not directly related to a certain page or subset of our project
 * will be defined here. This was we can keep functions that are used 
 * throughout our entire application in one area.
*/
var UserModel = require('./models/UserModel.js').UserModel;
var BookModel = require('./models/BookModel.js').BookModel;
var AppointmentModel = require('./models/AppointmentModel.js').AppointmentModel;
var TransactionModel = require('./models/TransactionModel.js').TransactionModel;

var _ = require('lodash');

class Utility {
    constructor() {

    }

    // generates a 32 character string seperated with '-' that 
    // will statistically always be unique 
    GenerateGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    // validates user query object being
    // passed into a db search function contains valid keys
    ValidateUserSearchParams(obj) {
        var validationModel = new UserModel().ToModel();
        var allKeysAreValid = true;

        _.forOwn(obj, (value, key) => {
            if (validationModel[key] == null) {
                allKeysAreValid = false;
                return;
            }
        });

        return allKeysAreValid;
    }

    // validates book query object being
    // passed into a db search function contains valid keys
    ValidateBookSearchParams(obj) {
        var validationModel = new BookModel().ToModel();
        var allKeysAreValid = true;

        _.forOwn(obj, (value, key) => {
            if (validationModel[key] == null) {
                allKeysAreValid = false;
                return;
            }
        });

        return allKeysAreValid;
    }

    // validates transaction query object being
    // passed into a db search function contains valid keys
    ValidateTransactionSearchParams(obj) {
        var validationModel = new TransactionModel().ToModel();
        var allKeysAreValid = true;

        _.forOwn(obj, (value, key) => {
            if (validationModel[key] == null) {
                allKeysAreValid = false;
                return;
            }
        });

        return allKeysAreValid;
    }

    // validates appt. query object being
    // passed into a db search function contains valid keys
    ValidateAppointmentSearchParams(obj) {
        var validationModel = new AppointmentModel().ToModel();
        var allKeysAreValid = true;

        _.forOwn(obj, (value, key) => {
            if (validationModel[key] == null) {
                allKeysAreValid = false;
                return;
            }
        });

        return allKeysAreValid;
    }
}

module.exports.Utility = Utility;