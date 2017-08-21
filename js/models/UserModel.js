class UserModel {
    constructor(){
        this.fName = ''
        this.lName = '';
        this.birthDate = '';
        this.createDate = '';
        this.isAdmin = '';
        this.currentRentals = [];
        this.transHist = [];
    }

    CreateUser(fName, lName, birthDate, createDate, isAdmin, currentRentals, transHist){
        this.fName = fName;
        this.lName = lName;
        this.birthDate = birthDate;
        this.createDate = createDate;
        this.isAdmin = isAdmin;
        this.currentRentals = currentRentals;
        this.transHist = transHist;
        return this;

    }
    ToModel(){
        return{
            'FirstName' : this.fName,
            'LastName' : this.lName,
            'BirthDate' : this.birthDate,
            'CreationDate' : this.createDate,
            'IsAdmin' : this.isAdmin,
            'CurrentRentals' : this.currentRentals,
            'TransactionHistory' : this.transHist,
        }
    }

    _TestModel() {
        let rnd = Math.random() * (1000 - 1) + 1;

        return {
            'FirstName' : 'FirstName_' + rnd,
            'LastName' : 'LastName_' + rnd,
            'BirthDate' : Date.now(),
            'CreationDate' :  Date.now(),
            'IsAdmin' : (rnd % 2 == 0) ? true : false,
            'CurrentRentals' : ['rental1_' + rnd, 'rental2_' + rnd],
            'TransactionHistory' : ['trans1_' + rnd, 'trans2_' + rnd],
        }
    }
}
module.exports.UserModel = UserModel;