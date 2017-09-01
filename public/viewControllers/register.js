var DBManager = require("./../../js/DataBaseManager.js").DataBaseManager;
var db = new DBManager();
var userModel = require("./../../js/models/UserModel.js").UserModel;
function CreateUser(){
    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var uName = document.getElementById("uName").value;
    var password = document.getElementById("pw").value;
    var birthDate = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pn").value;
    var user = new userModel().CreateUser(fName, lName, uName, password, birthDate, email, phoneNumber, currentRentals, transHist);
    db.insertUser(user, function(err,res){
        if(err){
            console.log(err);
        }
        else{
            console.log('success');
        }
    })
    
}

function LoginUser(){

}