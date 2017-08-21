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

    makeUser(fName, lName, birthDate, createDate, isAdmin, currentRentals, transHist){
        this.fName = fName;
        this.lName = lName;
        this.birthDate = birthDate;
        this.createDate = createDate;
        this.isAdmin = isAdmin;
        this.currentRentals = currentRentals;
        this.transHist = transHist;
        return this;

    }
    toModel(){
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
}
module.exports.UserModel = UserModel;