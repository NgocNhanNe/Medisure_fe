var token = localStorage.getItem("token");
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function isPhone(number) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}
async function regis() {
    var sex = document.getElementById("sex").value
    //upload image
    var uploadimg = 'http://localhost:8080/api/public/upload';
    const filePath = document.getElementById('avatar')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    const response = await fetch(uploadimg, {
        method: 'POST',
        headers: new Headers({

        }),
        body: formData
    });
    var linkimage = ''
    if(response.status < 300){
        linkimage = await response.text();
    }
    else{
        if(sex == "0"){
            linkimage = "https://as2.ftcdn.net/v2/jpg/02/23/50/73/1000_F_223507324_jKl7xbsaEdUjGr42WzQeSazKRighVDU4.jpg"
        }
        if(sex == "1"){
            linkimage = "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png"
        }
    }



    var url = 'http://localhost:8080/api/public/regisacount'
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var repassword = document.getElementById("repassword").value
   

    var user = {
        "username": username,
        "email": email,
        "avatar": linkimage,
        "password": password,
        "sex": sex,
    }
    if(password === "" && repassword === "" && email === "" && username === ""){
        alert("Data cannot be empty!")
        return;
    }
    if(username === "" ){
        alert("Enter Username, please!")
        return;
    }
    if(password === "" ){
        alert("Enter Password, please!")
        return;
    }
    if(repassword === "" ){
        alert("Enter Confirm Password, please!")
        return;
    }
    if(email === "" ){
        alert("Enter Email, please!")
        return;
    }
    
    if(!isEmail(email)) {
        alert('Email is incorrect format!');
        return;
    }
    if(password.length < 6 ){
        alert("Password must be more than 5 characters!")
        return;
    }
    if(password != repassword){
        alert("Password and Confirm Password does not match!")
        return;
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await res.text();
    console.log(result)
    if (res.status == 300) {
        alert("Email has been registered in the system!")
        return
    }
    else if (res.status == 500) {
        alert("Username already used!")
        return
    }
    else if (res.status < 300) {
        swal({
            title: "Notification", 
            text: "Register Account Successfully!", 
            type: "success"
          },
        function(){ 
            window.location.replace('login.html')
        });
    }
}

async function login() {
    var url = 'http://localhost:8080/api/authenticate'
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var user = {
        "username": username,
        "password": password
    }
    if(password === "" && username === ""){
        alert("Enter username and password, please!")
        return;
    }
    if(username === "" ){
        alert("Enter Username, please!")
        return;
    }
    if(password === "" ){
        alert("Enter Password, please!")
        return;
    }

    console.log(user)
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var token = await response.text(); 

    
    if(response.status > 300){
        alert("Username or Password is invalid!")
    }
    if(response.status < 300){

        window.localStorage.setItem('token', token);
       
        var urlAccount = 'http://localhost:8080/api/all/userlogged';
        const res = await fetch(urlAccount, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token, 
                'Content-Type': 'application/json'
            })
        });

        var account = await res.json();
        window.localStorage.setItem('username', account.username);
        console.log(account)
        var check = 0;
        for(i=0; i<account.authorities.length; i++){
            if(account.authorities[i].name === 'ROLE_ADMIN'){
                check = 1;
            }
            if(account.authorities[i].name === 'ROLE_DOCTOR'){
                check = 2;
            }
        }
        if(check === 0){
            window.location.replace('index.html')
        }
        if(check === 1){
            window.location.replace('admin/index.html')
        }
        if(check === 2){
            window.location.replace('admin/myschedule.html')
        }
    }
}

async function logoutadmin(){
    localStorage.removeItem("token");
    window.location.replace("../login.html")
}


async function checkroleAdmin(){
    var url = 'http://localhost:8080/api/admin/checkroleAdmin';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        window.location.replace('../login.html')
    }
}

async function forgotpass(){
    var email = document.getElementById("emailreset").value
    var url = 'http://localhost:8080/api/resetpass';
    
    if(email === "" ){
        alert("Enter Email, please!");
        return;
    }
    
    if(!isEmail(email)) {
        alert('Email is incorrect format!');
        return;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({ }),
        body:email
    });
    console.log(response.status)
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "Check your email!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        alert("Email does not existed!");
    }
}

async function changepass(){
    var token = localStorage.getItem("token");
    var oldpass = document.getElementById("oldpass").value
    var newpass = document.getElementById("newpass").value
    var renewpass = document.getElementById("renewpass").value
    
    if(oldpass === "" && newpass === "" && renewpass === ""){
      alert("Data cannot be empty!")
      return;
    }
  if(oldpass===""){
      alert("Current Passowrd is empty!")
      return
  }
  if(newpass===""){
    alert("Confirm Passowrd is empty!")
    return
  }
  if(renewpass===""){
      alert("New Passowrd is empty!")
      return
  }
  if(renewpass.length < 2){
    alert("Password must be more than 5 characters!")
    return;
  }
  if(newpass != renewpass){
    alert("New password and Confirm Password does not macth!")
    return
  }
  
  var passdto = {
        "oldPass":oldpass,
        "newPass":newpass
  }
  
    console.log(passdto)
    var url = 'http://localhost:8080/api/all/changePassword';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
         }),
        body:JSON.stringify(passdto)
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "Change Password successfully!", 
            type: "success"
          },
        function(){ 
          logoutadmin()
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "Current password is incorrected!", 
            type: "error"
          },
        function(){ 
            window.location.reload();
        });
    }
  }


async function loadAllSpecialist(){
    var url = 'http://localhost:8080/api/public/allSpecialist';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
         })
    });
    var result = await response.json();
    var main = ''
    for(i=0; i<result.length; i++){
        main += '<option value="'+result[i].id+'">'+result[i].name+'</option>'
    }
    document.getElementById("specialist").innerHTML = main;
}

async function loadPatinetRecode(){
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/getPatientRecordByUserLogged';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
         })
    });
    if(response.status > 300){
        swal({
            title: "Notification", 
            text: "Please register patient records!", 
            type: "warning"
          });
    }
    else{
        var record = await response.json();
        document.getElementById("fullname").value = record.fulllName
        document.getElementById("phone").value = record.phone
        document.getElementById("address").value = record.address
        document.getElementById("specialist").value = record.specialist.id;
        document.getElementById("description").value = record.description;
        document.getElementById("idpatinet").value = record.id;
    }
}

async function loadmail(){
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/all/userlogged';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token
         })
    });
    var user = await response.json();
    document.getElementById("email").value = user.email
    document.getElementById("sex").value = user.sex
}


async function addPatinetRecord(){
    var token = localStorage.getItem("token");
    var idpatinet = document.getElementById("idpatinet").value
    var fullname = document.getElementById("fullname").value
    var phone = document.getElementById("phone").value
    var address = document.getElementById("address").value
    var specialist = document.getElementById("specialist").value
    var description = document.getElementById("description").value
    var sex = document.getElementById("sex").value
    var patinet = {
        "id":idpatinet,
        "fulllName":fullname,
        "phone":phone,
        "address":address,
        "description":description,
        "specialist":{
            "id":specialist
        }
    }
    if(fullname === "" && phone === "" && address === "" && sex === "" && description === "" && specialist === ""){
        alert("Data cannot be empty!")
        return;
    }
    if(fullname == ""){
        alert("Full Name is empty, please enter data!")
        return
    }
    if(phone == ""){
        alert("Phone Number is empty, please enter data!")
        return
    }
    if(address == ""){
        alert("Address is empty, please enter data!")
        return
    }
    if(sex == ""){
        alert("Gender is empty, please enter data!")
        return
    }
    if(description == ""){
        alert("Description is empty, please enter data!")
        return
    }
    if(specialist == ""){
        alert("Special List is empty, please enter data!")
        return
    }
    if (!isPhone(phone)) {
        alert('Phone Number is incorrect format!');
        return;
    }
    
   
    var url = 'http://localhost:8080/api/user/addOrUpdatePatient';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
         }),
        body:JSON.stringify(patinet)
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "Add or Update Patient Record is successful!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "Add or Update Patient Record is unsuccessful!", 
            type: "error"
          },
        function(){ 
        });
    }
}
async function updateEmail(){
    var token = localStorage.getItem("token");
    var email = document.getElementById("email").value
    var sex = document.getElementById("sex").value
    var url = 'http://localhost:8080/api/user/updateemail?email='+email+'&sex='+sex;
    if(email === "" ){
        alert("Enter Email, please!")
        return;
    }
    
    if(!isEmail(email)) {
        alert('Email is incorrect format!');
        return;
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token
         })
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "Update email successful!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "Update email error!", 
            type: "error"
          },
        function(){ 
        });
    }
}