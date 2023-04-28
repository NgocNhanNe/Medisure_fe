var token = localStorage.getItem("token");
async function loadMenu(){
    var menut = '<div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">'+
    '<div class="me-3">'+
      '<button class="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize"><span class="icon-menu"></span></button>'+
    '</div>'+
    '<div><a class="navbar-brand brand-logo" href="index.html"><img src="images/logo.svg" alt="logo" /></a></div>'+
  '</div>'+
  '<div class="navbar-menu-wrapper d-flex align-items-top"> '+
    '<ul class="navbar-nav">'+
      '<li class="nav-item font-weight-semibold d-none d-lg-block ms-0">'+
        '<h1 class="welcome-text"> <span class="text-black fw-bold"></span></h1>'+
      '</li>'+
    '</ul>'+
    '<ul class="navbar-nav ms-auto">'+
      '<li class="nav-item dropdown d-none d-lg-block user-dropdown">'+
        '<a class="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">'+
          '<img class="img-xs rounded-circle" src="images/faces/face8.jpg" alt="Profile image"> </a>'+
        '<div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">'+
          '<div class="dropdown-header text-center">'+
            '<img class="img-md rounded-circle" src="images/faces/face8.jpg" alt="Profile image">'+
            '<p class="mb-1 mt-3 font-weight-semibold">Allen Moreno</p>'+
          '</div>'+
          '<a class="dropdown-item"><i class="dropdown-item-icon mdi mdi-account-outline text-primary me-2"></i> My Profile <span class="badge badge-pill badge-danger">1</span></a>'+
          '<a class="dropdown-item" onclick="logoutadmin()"><i class="dropdown-item-icon mdi mdi-power text-primary me-2"></i>Sign Out</a>'+
        '</div>'+
      '</li>'+
    '</ul>'+
    '<button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas">'+
      '<span class="mdi mdi-menu"></span>'+
    '</button>'+
  '</div>'
  document.getElementById("topmenu").innerHTML = menut

  var menuleft = '<ul class="nav">'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="index.html"><i class="fa fa-tachometer"></i><span class="menu-title">Dashboard</span></a>'+
  '</li>'+
  '<li class="nav-item nav-category">Member</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="doctor.html"><i class="fa fa-user-md"></i><span class="menu-title">Doctor</span></a>'+
  '</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="user.html"><i class="fa fa-user"></i><span class="menu-title">User</span></a>'+
  '</li>'+
  '<li class="nav-item nav-category">Manager</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="specialist.html"><i class="fa fa-list"></i><span class="menu-title">Specialist</span></a>'+
  '</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="scheduleadmin.html"><i class="fa fa-calendar"></i><span class="menu-title">Schedule</span></a>'+
  '</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="blog.html"><i class="fa fa-newspaper-o"></i><span class="menu-title">Blog</span></a>'+
  '</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="process.html"><i class="fa fa-cogs"></i><span class="menu-title">Medicine</span></a>'+
  '</li>'+
  '<li class="nav-item nav-category">Profile</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="profile.html"><i class="fa fa-edit"></i><span class="menu-title"> Update Profile</span></a>'+
  '</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="changepass.html"><i class="fa fa-key"></i><span class="menu-title">Password</span></a>'+
  '</li>'+
  '<li class="nav-item nav-category">Doctor</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="myschedule.html"><i class="fa fa-edit"></i><span class="menu-title">Schedule</span></a>'+
  '</li>'+
'</ul>'
document.getElementById("sidebar").innerHTML = menuleft

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
      alert("only role Admin")
      window.location.replace('../login.html')
  }
}

async function checkroleDoctor(){
  var url = 'http://localhost:8080/api/doctor/checkroleDoctor';
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

async function logoutadmin(){
    localStorage.removeItem("token");
    window.location.replace("../login.html")
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