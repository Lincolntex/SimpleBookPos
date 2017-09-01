// var DBManager = require("./../DataBaseManager.js").DataBaseManager;
// var db = new DBManager();
function CreateUser(){
    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var uName = document.getElementById("uName").value;
    var pw = document.getElementById("pw").value;
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var pn = document.getElementById("pn").value;
    console.log(fName);
    var user = {fName,lName,uName,pw,dob,email,pn};
    console.log(user);
}

function LoginUser(){

}