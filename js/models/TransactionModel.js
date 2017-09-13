var BookModel = require('./BookModel.js').BookModel;

class TransactionModel {
    constructor() {
        this.PurchasedItems = [Object];
        this.RentedItems = [Object];
        this.CustomerId = String;
        this.TransDate = Date;
        this.HasRentals = Boolean;
    }

    CreateTransaction(purchasedItems, rentedItems, customerId, date, isRental) {
        this.PurchasedItems = purchasedItems;
        this.RentedItems = rentedItems;
        this.CustomerId = customerId;
        this.TransDate = date;
        this.HasRentals = isRental; 
    }

    ToModel() {
        return {
            'PurchasedItem(s)' : this.PurchasedItems,
            'RentedItem(s)' : this.RentedItems,
            'CustomerId' : this.CustomerId,
            'TransactionDate' : this.TransDate,
            'HasRental' : this.HasRentals
        }
    }

    _TestModel() {
        let rnd = Math.random() * (10 - 1) + 1;

        this.PurchasedItems = ['Test ' + rnd, 'Test2 ' + rnd],
        this.RentedItems ['Test ' + rnd, 'Test2 ' + rnd],
        this.CustomerId = 'ID_' + rnd,
        this.TransDate = Date.now(),
        this.HasRentals = (rnd % 2 == 0) ? true : false
        return this;
    }
}

module.exports.TransactionModel = TransactionModel;