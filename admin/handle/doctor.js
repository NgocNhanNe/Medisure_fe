var token = localStorage.getItem("token");
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function isPhone(number) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}
async function loadAllDoctor() {
    var url = 'http://localhost:8080/api/public/searchAllDoctor'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listresult = await response.json(); 
    var main = '';
    for(i=0; i< listresult.length; i++){
        var sex = 'Male'
        if(listresult[i].user.sex == 1){
            sex = 'Female'
        }
        main += '<tr>'+
                    '<td><button onclick="deleteSpecialist('+listresult[i].id+')" class="btn btn-danger btn_nb"><i class="fa fa-trash"></i>Delete</button></td>'+
                    '<td><button onclick="replace('+listresult[i].id+')" class="btn btn-primary btn_nb"><i class="fa fa-edit"></i>Update</button></td>'+
                    '<td>#'+listresult[i].id+'</td>'+
                    '<td><img src="'+listresult[i].user.avatar+'"></td>'+
                    '<td>'+listresult[i].fulllName+'</td>'+
                    '<td>'+listresult[i].phone+'</td>'+
                    '<td>'+listresult[i].address+'</td>'+
                    '<td>'+listresult[i].specialist.name+'</td>'+
                    '<td>'+listresult[i].user.email+'</td>'+
                    '<td>'+sex+'</td>'+
                '</tr>'
    }
    document.getElementById("listdoctor").innerHTML = main
    $('#example').DataTable();
}
async function loadAllSpecialistDoctor() {
    var url = 'http://localhost:8080/api/public/allSpecialist'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listresult = await response.json(); 
    var main = '';
    for(i=0; i< listresult.length; i++){
        main += '<option value="'+listresult[i].id+'">'+listresult[i].name+'</option>'
    }
    document.getElementById("listspecialist").innerHTML = main
}

function replace(id){
    window.location.replace('adddoctor.html?id='+id)
}

async function loadADoctor() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/getDoctorById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var doctor = await response.json();
        document.getElementById("fullname").value = doctor.fulllName
        document.getElementById("address").value = doctor.address
        document.getElementById("sex").value = doctor.user.sex
        document.getElementById("username").value = doctor.user.username
        document.getElementById("email").value = doctor.user.email
        document.getElementById("listspecialist").value = doctor.specialist.id
        document.getElementById("iddoctor").value = doctor.id
        document.getElementById("phone").value = doctor.phone
        document.getElementById("iduserdoctor").value = doctor.user.id
        document.getElementById("avatar_img").src = doctor.user.avatar
        linkbanner = doctor.user.avatar
        tinyMCE.get('editor').setContent(doctor.description)
    }
}

var linkbanner = ''
async function addDoctor(){

    var fullname = document.getElementById("fullname").value
    var address = document.getElementById("address").value
    var sex = document.getElementById("sex").value
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var listspecialist = document.getElementById("listspecialist").value
    var description = tinyMCE.get('editor').getContent()

    if(fullname === "" && address === "" && username === "" && email === "" 
            && phone === "" && description === "" && listspecialist === "" && sex === ""){
        alert("Data cannot be empty!")
        return
    }

    if(fullname == ""){
        alert("Fullname is empty, enter data please!")
        return
    }
    if(address == ""){
        alert("Address is empty, enter data please!")
        return
    }
    if(username == ""){
        alert("Username is empty, enter data please!")
        return
    }
    if(email == ""){
        alert("Email is empty, enter data please!")
        return
    }
    if(phone == ""){
        alert("Phone is empty, enter data please!")
        return
    }
    if(description == ""){
        alert("Description is empty, enter data please!")
        return
    }
    if(listspecialist == ""){
        alert("Special List is empty, enter data please!")
        return
    }
    if(sex == ""){
        alert("Gender is empty, enter data please!")
        return
    }
    if(!isPhone(phone)) {
        alert('Phone is incorrect format!');
        return;
    }
    if(!isEmail(email)) {
        alert('Email is incorrect format!');
        return;
    }

    const filePath = document.getElementById('avatardoctor')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    var urlUpload = 'http://localhost:8080/api/public/upload';
    const res = await fetch(urlUpload, { 
             method: 'POST', 
              headers: new Headers({
             }),
             body: formData
    });
    if(res.status < 300){
        linkbanner = await res.text();
    }

    var token = localStorage.getItem("token");
    var iddoctor = document.getElementById("iddoctor").value
    var iduserdoctor = document.getElementById("iduserdoctor").value
   
    var avatars = linkbanner;
    var user = {
        "id":iduserdoctor,
        "username":username,
        "email":email,
        "sex":sex,
        "avatar":avatars
    }
    var url = 'http://localhost:8080/api/public/addUserDoctor';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
         }),
        body:JSON.stringify(user)
    });
    var userResult = null;
    if(response.status == 500){
        swal({
            title: "Notification", 
            text: "Username is existed, enter again please!", 
            type: "error"
          },
        function(){ 
            return;
        });
    }
    else if(response.status == 300){
        swal({
            title: "Notification", 
            text: "Email is existed, enter again please!", 
            type: "error"
          },
        function(){ 
            return;
        });
    }
    else{
        userResult = await response.json();
        var doctors = {
            "id":iddoctor,
            "fulllName":fullname,
            "phone":phone,
            "address":address,
            "description":description,
            "specialist":{
                "id":listspecialist
            },
            "user":{
                "id":userResult.id
            }
        }
        var url = 'http://localhost:8080/api/admin/adddoctor';
        const resp = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token, 
                'Content-Type': 'application/json'
             }),
            body:JSON.stringify(doctors)
        });
        if(resp.status < 300){
            swal({
                title: "Notification", 
                text: "Add or Update doctor successfully!", 
                type: "success"
              },
            function(){ 
                window.location.replace('doctor.html')
            });
        }
    }
}

async function deleteSpecialist(id){
    var url = 'http://localhost:8080/api/admin/deleteSpecialist?id='+id;
    var deleteMessage = confirm("Are you sure to delete?")
    if(deleteMessage){
        const response = await fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        if(response.status < 300){
            swal({
                title: "Notification", 
                text: "Delete Doctor successfully!", 
                type: "success"
                },
            function(){ 
                window.location.reload();
            });
        }
        else{
            swal({
                title: "Notification", 
                text: "Cannot delete this doctor because already appointment!", 
                type: "error"
                },
            function(){ 
                window.location.reload();
            });
        }
    }
    else{
        return false;
    }
    
}


async function loadMyProfile() {
    var url = 'http://localhost:8080/api/doctor/getDoctorByUserLogged'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var doctor = await response.json();
    document.getElementById("fullname").value = doctor.fulllName
    document.getElementById("address").value = doctor.address
    document.getElementById("sex").value = doctor.user.sex
    document.getElementById("email").value = doctor.user.email
    document.getElementById("listspecialist").value = doctor.specialist.id
    document.getElementById("iddoctor").value = doctor.id
    document.getElementById("phone").value = doctor.phone
    document.getElementById("iduserdoctor").value = doctor.user.id
    document.getElementById("avatar_img").src = doctor.user.avatar
    linkbanner = doctor.user.avatar
    tinyMCE.get('editor').setContent(doctor.description)
}

async function updateProfile(){


    var fullname = document.getElementById("fullname").value
    var address = document.getElementById("address").value
    var sex = document.getElementById("sex").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var listspecialist = document.getElementById("listspecialist").value
    var description = tinyMCE.get('editor').getContent()
    
    if(fullname === "" && address === "" && email === "" && phone ==="" && description ===""){
        alert("Data cannot be empty")
        return
    }

    if(fullname == ""){
        alert("Fullname is empty, please enter data!")
        return
    }
    if(address == ""){
        alert("Address is empty, please enter data!")
        return
    }
    if(email == ""){
        alert("Email is empty, please enter data!")
        return
    }
    if(phone == ""){
        alert("Phone Number is empty, please enter data!")
        return
    }
    if(description == ""){
        alert("Description is empty, please enter data!")
        return
    }
    if(listspecialist == ""){
        alert("Special List is empty, please enter data!")
        return
    }
    if(sex == ""){
        alert("Gender is empty, please enter data!")
        return
    }
    if(!isPhone(phone)) {
        alert('Phone is incorrect format!');
        return;
    }
    if(!isEmail(email)) {
        alert('Email is incorrect format!');
        return;
    }
    
    var token = localStorage.getItem("token");
    var urlAccount = 'http://localhost:8080/api/all/userlogged';
    const ress = await fetch(urlAccount, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        })
    });
    var account = await ress.json();
    var linkbanner = account.avatar

    const filePath = document.getElementById('avatardoctor')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    var urlUpload = 'http://localhost:8080/api/public/upload';
    const res = await fetch(urlUpload, { 
             method: 'POST', 
              headers: new Headers({
             }),
             body: formData
    });
    if(res.status < 300){
        linkbanner = await res.text();
    }

    var iddoctor = document.getElementById("iddoctor").value
    var iduserdoctor = document.getElementById("iduserdoctor").value
 
 
    var avatars = linkbanner;
    var user = {
        "id":iduserdoctor,
        "email":email,
        "sex":sex,
        "avatar":avatars
    }
    var url = 'http://localhost:8080/api/doctor/updateUserForDoctor';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
         }),
        body:JSON.stringify(user)
    });
    var userResult = null;
    if(response.status > 300){
        swal({
            title: "Notification", 
            text: "Update Profile is unsuccessful!", 
            type: "error"
          },
        function(){ 
            return;
        });
    }
    else{
        userResult = await response.json();
        var doctors = {
            "id":iddoctor,
            "fulllName":fullname,
            "phone":phone,
            "address":address,
            "description":description,
            "specialist":{
                "id":listspecialist
            },
            "user":{
                "id":userResult.id
            }
        }
        var url = 'http://localhost:8080/api/doctor/updatedoctor';
        const resp = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token, 
                'Content-Type': 'application/json'
             }),
            body:JSON.stringify(doctors)
        });
        if(resp.status < 300){
            swal({
                title: "Notification", 
                text: "Update Profile Successfully!", 
                type: "success"
              },
            function(){ 
                window.location.reload();
            });
        }
    }
}
