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

    CreateUser(fName, lName, uName, password, birthDate, email, phoneNumber, currentRentals, transHist, isAdmin = false){
        var cdate = new Date(Date.now());
        this.fName = fName;
        this.lName = lName;
        this.uName = uName;
        this.password = password;
        this.birthDate = birthDate;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.createDate = `${cdate.getFullYear()}-${cdate.getMonth()+1}-${cdate.getDate()}`;
        this.isAdmin = isAdmin;
        this.currentRentals = currentRentals;
        this.transHist = transHist;
        return this;

    }
    ToModel() {
        return {
            'FirstName' : this.fName,
            'LastName' : this.lName,
            'Username' : this.uName,
            'Password' : this.password,
            'Email' : this.email,
            'PhoneNumber' : this.phoneNumber,
            'BirthDate' : this.birthDate,
            'CreationDate' : this.createDate,
            'IsAdmin' : this.isAdmin,
            'CurrentRentals' : this.currentRentals,
            'TransactionHistory' : this.transHist,
        }
    }

    _TestModel() {
        let rnd = Math.random() * (10 - 1) + 1;

        this.fName = 'FirstName_' + rnd;
        this.lName = 'LastName_' + rnd;
        this.birthDate = Date.now();
        this.createDate =  Date.now();
        this.isAdmin = (rnd % 2 == 0) ? true : false;
        this.currentRentals = ['rental1_' + rnd, 'rental2_' + rnd];
        this.transHist = ['trans1_' + rnd, 'trans2_' + rnd];
        return this;
    }

    BuildUserFromApiReq(req) {
        this.fName = req.body['user']['FirstName'];
        this.lName = req.body['user']['LastName'];
        this.uName = req.body['user']['Username'];
        this.password = req.body['user']['Password'];
        this.birthDate = req.body['user']['Birthdate'];
        this.email = req.body['user']['Email'];
        this.phoneNumber = req.body['user']['PhoneNumber'];
        this.currentRentals = req.body['user']['CurrentRentals'];
        this.transHist = req.body['user']['TransactionHistory'];
        this.isAdmin = req.body['user']['IsAdmin'];
        return this;
    }
}
module.exports.UserModel = UserModel;