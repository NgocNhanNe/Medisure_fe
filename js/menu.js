async function logout(){
    localStorage.removeItem("token");
    window.location.replace("login.html")
}

function loadactive(indexd){
    sessionStorage.setItem('indexmenu', indexd);
    var x =sessionStorage.getItem('indexmenu');
    for (const li of document.querySelectorAll("li.activedd")) {
        li.classList.remove("activedd");
    }
}
function loaac(){
    var x =sessionStorage.getItem('indexmenu');
    if(x == '1'){
        document.getElementById("idexns").classList.add('activedd')
    }
    if(x == '2'){
        document.getElementById("abouds").classList.add('activedd')
    }
    if(x == '3'){
        document.getElementById("service").classList.add('activedd')
    }
    if(x == '4'){
        document.getElementById("process").classList.add('activedd')
    }
    if(x == '5'){
        document.getElementById("guidelines").classList.add('activedd')
    }
    if(x == '6'){
        document.getElementById("appon").classList.add('activedd')
    }
    if(x == '7'){
        document.getElementById("doctor").classList.add('activedd')
    }
    if(x == '8'){
        document.getElementById("blog").classList.add('activedd')
    }
    if(x == '9'){
        document.getElementById("contact").classList.add('activedd')
    }
}
async function loadmenu(){
    var accounts = '<li class="nav-item"><a href="login.html" class="nav-link btn-signUp" style="color: white">Login</a></li>'
    var token = localStorage.getItem("token");
    if(token != null){
        accounts =  '<li class="nav-item dropdown">'+
                    '<a class="nav-link dropdown-toggle" href="department.html" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account <i class="icofont-thin-down"></i></a>'+
                    '<ul class="dropdown-menu" aria-labelledby="dropdown02">'+
                        '<li><a class="dropdown-item" href="updateaccount.html">Update Account</a></li>'+
                        '<li><a class="dropdown-item" href="profile.html">My appointment</a></li>'+
                        '<li><a class="dropdown-item" style="cursor: pointer;" onclick="logout()">Logout</a></li>'+
                    '</ul>'+
                '</li>'
    }

    var menu = '<div class="header-top-bar">'+
    '<div class="container">'+
        '<div class="row align-items-center">'+
            '<div class="col-lg-6">'+
                '<ul class="top-bar-info list-inline-item pl-0 mb-0">'+
                    '<li class="list-inline-item"><a href="mailto:support@gmail.com"><i class="icofont-support-faq mr-2"></i>support@medisure.com</a></li>'+
                    '<li class="list-inline-item"><i class="icofont-location-pin mr-2"></i>Address , Viet Nam</li>'+
                '</ul>'+
            '</div>'+
            '<div class="col-lg-6">'+
                '<div class="text-lg-right top-right-bar mt-2 mt-lg-0">'+
                    '<a href="tel:+23-345-67890" >'+
                        '<span>Call Now : </span>'+
                        '<span class="h4">0123456058</span>'+
                    '</a>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>'+
'<nav class="navbar navbar-expand-lg navigation" id="navbar">'+
    '<div class="container">'+
          '<a class="navbar-brand" href="index.html">'+
              '<img src="images/logo.png" alt="" class="img-fluid">'+
          '</a>'+

          '<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarmain" aria-controls="navbarmain" aria-expanded="false" aria-label="Toggle navigation">'+
        '<span class="icofont-navigation-menu"></span>'+
      '</button>'+
  
      '<div class="collapse navbar-collapse" id="navbarmain">'+
        '<ul class="navbar-nav ml-auto">'+
            '<li id="idexns" onclick="loadactive(1)" class="nav-item menuitem"><a class="nav-link" href="index.html">Home</a></li>'+
            '<li id="abouds" onclick="loadactive(2)" class="nav-item menuitem"><a class="nav-link" href="about.html">About</a></li>'+
            '<li id="appon" onclick="loadactive(6)" class="nav-item menuitem"><a class="nav-link" href="appoinment.html">Appoinment</a></li>'+
            '<li id="service" onclick="loadactive(3)" class="nav-item menuitem"><a class="nav-link" href="service.html">Service</a></li>'+
            '<li id="process" onclick="loadactive(4)" class="nav-item menuitem"><a class="nav-link" href="process.html">Question</a></li>'+
            '<li id="guidelines" onclick="loadactive(5)" class="nav-item menuitem"><a class="nav-link" href="guidelines.html">Guideline</a></li>'+
            '<li id="doctor" onclick="loadactive(7)" class="nav-item menuitem"><a class="nav-link" href="doctor.html">Doctor</a></li>'+
            '<li id="blog" onclick="loadactive(8)" class="nav-item menuitem"><a class="nav-link" href="blog-sidebar.html">News</a></li>'+
            '<li id="contact" onclick="loadactive(9)" class="nav-item menuitem"><a class="nav-link" href="contact.html">Contact</a></li>'+
            ''+accounts+''+
        '</ul>'+
      '</div>'+
    '</div>'+
'</nav>'
document.getElementById("menu").innerHTML = menu


var footer = '<div class="container">'+
'<div class="row">'+
    '<div class="col-lg-4 mr-auto col-sm-6">'+
        '<div class="widget mb-5 mb-lg-0">'+
            '<div class="logo mb-4">'+
                '<img src="images/logo1.png" alt="" class="img-fluid">'+
            '</div>'+
            '<p>Tempora dolorem voluptatum nam vero assumenda voluptate, facilis ad eos obcaecati tenetur veritatis eveniet distinctio possimus.</p>'+

            '<ul class="list-inline footer-socials mt-4">'+
                '<li class="list-inline-item"><a href="https://www.facebook.com/themefisher"><i class="icofont-facebook"></i></a></li>'+
                '<li class="list-inline-item"><a href="https://twitter.com/themefisher"><i class="icofont-twitter"></i></a></li>'+
                '<li class="list-inline-item"><a href="https://www.pinterest.com/themefisher/"><i class="icofont-linkedin"></i></a></li>'+
            '</ul>'+
        '</div>'+
    '</div>'+

    '<div class="col-lg-2 col-md-6 col-sm-6">'+
        '<div class="widget mb-5 mb-lg-0">'+
            '<h4 class="text-capitalize mb-3">Department</h4>'+
            '<div class="divider mb-4"></div>'+

            '<ul class="list-unstyled footer-menu lh-35">'+
                '<li><a href="#">Surgery </a></li>'+
                '<li><a href="#">Wome Health</a></li>'+
                '<li><a href="#">Radiology</a></li>'+
                '<li><a href="#">Cardioc</a></li>'+
                '<li><a href="#">Medicine</a></li>'+
            '</ul>'+
        '</div>'+
    '</div>'+

    '<div class="col-lg-2 col-md-6 col-sm-6">'+
        '<div class="widget mb-5 mb-lg-0">'+
            '<h4 class="text-capitalize mb-3">Support</h4>'+
            '<div class="divider mb-4"></div>'+

            '<ul class="list-unstyled footer-menu lh-35">'+
                '<li><a href="#">Terms & Conditions</a></li>'+
                '<li><a href="#">Privacy Policy</a></li>'+
                '<li><a href="#">Company Support </a></li>'+
                '<li><a href="#">FAQuestions</a></li>'+
                '<li><a href="#">Company Licence</a></li>'+
            '</ul>'+
        '</div>'+
    '</div>'+

    '<div class="col-lg-3 col-md-6 col-sm-6">'+
        '<div class="widget widget-contact mb-5 mb-lg-0">'+
            '<h4 class="text-capitalize mb-3">Get in Touch</h4>'+
            '<div class="divider mb-4"></div>'+

            '<div class="footer-contact-block mb-4">'+
                '<div class="icon d-flex align-items-center">'+
                    '<i class="icofont-email mr-3"></i>'+
                    '<span class="h6 mb-0">Support Available for 24/7</span>'+
                '</div>'+
                '<h7 class="mt-2"><a href="tel:+23-345-67890">Support@email.com</a></h7S>'+
            '</div>'+

            '<div class="footer-contact-block">'+
                '<div class="icon d-flex align-items-center">'+
                    '<i class="icofont-support mr-3"></i>'+
                    '<span class="h6 mb-0">Mon to Fri : 08:30 - 18:00</span>'+
                '</div>'+
                '<h4 class="mt-2"><a href="tel:+23-345-67890">+23-456-6588</a></h4>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>'+
'</div>'
document.getElementById("footer").innerHTML = footer
loaac();
}

async function checkRoleUser(){
    var url = 'http://localhost:8080/api/user/checkroleUser';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        alert("Please login!")
        window.location.replace('login.html')
    }
}