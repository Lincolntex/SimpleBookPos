class UserModel {
    constructor(){
        this.fName = '';
        this.lName = '';
        this.uName = '';
        this.password = '';
        this.birthDate = '';
        this.email = '';
        this.phoneNumber = '';
        this.createDate = '';
        this.isAdmin = '';
        this.currentRentals = [];
        this.transHist = [];
    }

    CreateUser(fName, lName, uName, password, birthDate, email, phoneNumber, currentRentals, transHist){
        this.fName = fName;
        this.lName = lName;
        this.uName = uName;
        this.password = password;
        this.birthDate = birthDate;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.createDate = Date.now();
        this.isAdmin = false;
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

        this.fName = 'FirstName_' + rnd;
        this.lName = 'LastName_' + rnd;
        this.birthDate = Date.now();
        this.createDate =  Date.now();
        this.isAdmin = (rnd % 2 == 0) ? true : false;
        this.currentRentals = ['rental1_' + rnd, 'rental2_' + rnd];
        this.transHist = ['trans1_' + rnd, 'trans2_' + rnd];
        return this;
    }
}
module.exports.UserModel = UserModel;