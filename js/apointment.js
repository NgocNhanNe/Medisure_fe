async function checkpatines(){
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/checkpatinet'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var check = await response.text();
    if(check === 'false'){
        alert("Please add patient record")
        window.location.replace('updateaccount.html')
    }
}
async function loadAllSpecialist() {
    var url = 'http://localhost:8080/api/public/allSpecialist'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listresult = await response.json(); 
    var main = '<option value="-1">All</option>';
    for(i=0; i< listresult.length; i++){
        main += '<option value="'+listresult[i].id+'">'+listresult[i].name+'</option>'
    }
    document.getElementById("specialist").innerHTML = main
}

var doctorId = -1;

async function loadAllDoctor() {
    var sex = document.getElementById("sex").value
    var specialist = document.getElementById("specialist").value
    var param = document.getElementById("param").value
    if(param === ""){
        param = null
    }
    if(specialist == ""){
        specialist = -1
    }
    
    var searchDto = {
        "param":param,
        "sex":sex,
        "specialistId":specialist
    }
    var url = 'http://localhost:8080/api/public/searchDoctorByAll'
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(searchDto)
    });
    var listresult = await response.json(); 
    var main = '';
    for(i=0; i< listresult.length; i++){
        var sex ='Male'
        if(listresult[i].user.sex == 1){sex = 'Female'}
        main += '<div class="singel_profile singel_p" onclick="clickDoctor(this,'+listresult[i].id+')">'+
                    '<table class="table_singel_profile">'+
                        '<tr>'+
                            '<td class="col_1"><i class="u_sing fa fa-user"></i></td>'+
                            '<td class="col_2 u_sing">Doctor: <span>'+listresult[i].fulllName+'</span></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td><i class="fa fa-user-md"></i></td>'+
                            '<td class="col_2">Specialist: <span>'+listresult[i].specialist.name+'</span></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td><i class="fa fa-venus"></i></td>'+
                            '<td class="col_2">Gender: <span>'+sex+'</span></td>'+
                        '</tr>'+
                    '</table>'+
                    '<label class="radio-custom chonbs">Choose'+
                        '<input type="radio" name="radio">'+
                        '<span class="checkmark"></span>'+
                    '</label>'+
                '</div>'
    }
    document.getElementById("listdoctor").innerHTML = main
}










var arrTime = ['08:00-09:00','09:00-10:00', '10:00-11:00', '11:00-12:00', 
'12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
'17:00-18:00','18:00-19:00','19:00-20:00']

function loadInitTime(){
    var main = ''
    for(i=0; i<arrTime.length; i++){
        main += '<div class="col-md-6" style="margin-top: 10px;">'+
                    '<label onclick="openButtonBook('+i+')" class="btn chongio">'+
                        '<input type="radio" name="chonthoigian" value="'+arrTime[i]+'" checked="checked" />'+arrTime[i]+''+
                    '</label>'+
                '</div>';
    }
    document.getElementById("listtime").innerHTML = main
    // document.getElementById('chonngay').valueAsDate = new Date();
    document.getElementById("datechoose").innerHTML =  document.getElementById('chonngay').value
}

function openButtonBook(i){
    document.getElementById("butoonbook").disabled = false;
    document.getElementById("butoonbook").style.backgroundColor = '#e12454'
    document.getElementById("butoonbook").style.fontWeight = 'bold'
    document.getElementById("timechoose").innerHTML = arrTime[i]
}

async function clickDoctor(e, iddoctor){
    var len = document.getElementsByClassName("singel_profile").length
    for(i=0; i<len; i++){
        document.getElementsByClassName("singel_profile")[i].style.backgroundColor = '#fff'
    }
    e.style.backgroundColor = '#93e9f5'
    doctorId = iddoctor

    var url = 'http://localhost:8080/api/public/getDoctorById?id='+doctorId;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var doctor = await response.json();
    document.getElementById("doctorname").innerText = doctor.fulllName
    document.getElementById("specialistname").innerText = doctor.specialist.name
    loadScheduleOfDoctor();
}

async function chonNgay(){
    var dates = document.getElementById("chonngay").value
    if(doctorId == -1){
        alert("Please choose a doctor!")
        document.getElementById("chonngay").value = null;
        return;
    }
    document.getElementById("datechoose").innerText = dates
    loadScheduleOfDoctor();
}

async function loadScheduleOfDoctor(){
    if(doctorId == -1){
        return;
    }
    var dates = document.getElementById("chonngay").value
    var url = 'http://localhost:8080/api/user/getScheduleByDateAndDoctor?date='+dates+'&id='+doctorId+'';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var listSchedule = await response.json();
    console.log(listSchedule)
    if(listSchedule.length == 0){
        loadInitTime();
        return;
    }
    var main = ''
    for(i=0; i< listSchedule.length; i++){
        for(j=0; j<arrTime.length; j++){
            var st = ''
            var str = listSchedule[i].bookingTime.split(":")[0]+":"+listSchedule[i].bookingTime.split(":")[1]+'-'+listSchedule[i].toTime.split(":")[0]+":"+listSchedule[i].toTime.split(":")[1]
            if(str === arrTime[j]){
                st = 'style="background-color: gray;"'
            }
            main += '<div class="col-md-6" style="margin-top: 10px;">'+
                        '<label '+st+' onclick="openButtonBook('+j+')" class="btn chongio">'+
                            '<input type="radio" name="chonthoigian" value="'+arrTime[j]+'" checked="checked" />'+arrTime[j]+''+
                        '</label>'+
                    '</div>';
        }
    }
    document.getElementById("listtime").innerHTML = main
}




