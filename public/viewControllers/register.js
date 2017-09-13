function CreateUser(){
    console.log("made it")
    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var uName = document.getElementById("uName").value;
    var password = document.getElementById("pw").value;
    var birthDate = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("pn").value;

    axios.post("/api/users", {
        user: {
            FirstName: fName,
            LastName: lName,
            Username: uName,
            Password: password,
            Birthdate: birthDate,
            Email: email,
            PhoneNumber: phone,
            CurrentRentals: [],
            TransactionHistory: [],
            IsAdmin: false,

        }
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    });
}

function LoginUser(){

}