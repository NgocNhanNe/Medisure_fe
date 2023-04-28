var token = localStorage.getItem("token");

async function loadAllSchedule(type) {
    var startdate = document.getElementById("startdate").value
    var enddate = document.getElementById("enddate").value
    var url = 'http://localhost:8080/api/user/getScheduleByUser'
    if(startdate != "" && enddate != ""){
        url = 'http://localhost:8080/api/user/getScheduleByUser?from='+startdate+'&to='+enddate
    }
    var param = document.getElementById("param").value
    if(param != "" && type == 1){
        url = 'http://localhost:8080/api/user/getScheduleByUserParam?param='+param  
    }
    if(param == "" && (type == 1 || type == 0)){
        url = 'http://localhost:8080/api/user/getScheduleByUser'
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var listresult = await response.json(); 
    console.log(listresult)
    var main = '';
    for(i=0; i< listresult.length; i++){
        var btndel = '<button onclick="deleteSchedule('+listresult[i].id+')" class="btn btn-danger ">Delete</button>'
        if(listresult[i].paid == 1){
            btndel = '<button onclick="loadDetailInvoice('+listresult[i].id+')" class="btn btn-success btn_nb" data-toggle="modal" data-target=".viewInvoice"><i class="fa fa-list"></i> View Invoice</button>'
        }
        main += '<div class="singel_profile">'+
                    '<table class="table_singel_profile">'+
                        '<tr>'+
                            '<td class="col_1"><i class="u_sing fa fa-user"></i></td>'+
                            '<td class="col_2 u_sing">Doctor: <span>'+listresult[i].doctors.fulllName+'</span></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td><i class="fa fa-user-md"></i></td>'+
                            '<td class="col_2">Specialist: <span>'+listresult[i].doctors.specialist.name+'</span></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td><i class="fa fa-calendar"></i></td>'+
                            '<td class="col_2">Apointment Date: <span>'+listresult[i].bookingDate+'</span></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td><i class="fa fa-clock"></i></td>'+
                            '<td class="col_2">Apointment Time: <span>'+listresult[i].bookingTime+'-'+listresult[i].toTime+'</span></td>'+
                        '</tr>'+
                    '</table><br>'+
                    ''+btndel+''+
                    '<button onclick="loadDetailSchedule('+listresult[i].id+')" class="btn btn-success btndel" data-toggle="modal" data-target=".bd-example-modal-lg">Note</button>'+
                '</div>'
    }
    document.getElementById("list_schedule").innerHTML = main
}

async function deleteSchedule(id) {
    var url = 'http://localhost:8080/api/user/deleteSchedule?id='+id
    var deleteMessage = confirm("Are you sure to delete?")
    if(deleteMessage){
        const response = await fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer '+token
            })
        });
        if(response.status < 300){
            swal({
                title: "Notification", 
                text: "Delete successfully!", 
                type: "success"
                },
            function(){ 
                window.location.reload();
            });
        }
        else{
            swal({
                title: "Notification", 
                text: "Cannot Delete This Schedule!", 
                type: "error"
                },
            function(){ 
            });
        }
    }
    else{
        return false;
    }
    
}

async function loadDetailSchedule(id){
    var url = 'http://localhost:8080/api/user/getScheduleById?id='+id
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var schedule = await response.json(); 
    document.getElementById("doctorname").innerHTML = schedule.doctors.fulllName
    document.getElementById("medicines").innerHTML = schedule.medicines
    document.getElementById("noteschedule").innerHTML = schedule.note

    var urls = 'http://localhost:8080/api/public/ImageScheduleByScheduleId?id='+id
    const res = await fetch(urls, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var list = await res.json();  
    var main = ''
    for(i=0; i<list.length; i++){
        main += ` <div class="col-md-4">
                    <img src="${list[i].link}" style="width: 100%;">
                </div>`
    }
    document.getElementById("listimgs").innerHTML = main
}

async function addSchedule(){
    var url = 'http://localhost:8080/api/user/addSchedule';
    var bookingdate = document.getElementById("chonngay").value
    var time = document.querySelector('input[name="chonthoigian"]:checked').value;
    var starttime = time.split("-")[0]
    var endtime = time.split("-")[1]
    var doctorid = doctorId;

    var schedule = {
        "bookingDate":bookingdate,
        "bookingTime":starttime,
        "toTime":endtime,
        "doctors":{
            "id":doctorid
        }
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
         }),
        body:JSON.stringify(schedule)
    });
    if(response.status == 350){
        swal({ title: "Notification", text: "Someone booked this time!",  type: "warning"},
        function(){  return });
    }
    else if(response.status == 305){
        swal({ title: "Notification", text: "You made an appointment!",  type: "warning"},
        function(){  return });
    }
    else{
        swal({ title: "Notification", text: "Appointment booked successfully!",  type: "success"},
        function(){  window.location.reload() });
    }
}


async function loadDetailInvoice(id) {
    var url = 'http://localhost:8080/api/user/detailInvoiceByInvoiceId?id='+id
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var listresult = await response.json(); 
    var main = '';
    for(i=0; i< listresult.length; i++){
        main += '<tr>'+
                    '<td>#'+listresult[i].id+'</td>'+
                    '<td>'+listresult[i].medicalProcess.processName+'</td>'+
                    '<td></td>'+
                    '<td>'+listresult[i].medicalProcess.price+'</td>'+
                    '<td></td>'+
                    '<td>'+listresult[i].medicalProcess.description+'</td>'+
                    // '<td>'+listresult[i].invoice.surcharge+'</td>'+
                '</tr>' 
    }
    main += '<tr>'+
            '<td>Total</td>'+
            '<td></td>'+
            '<td style="font-size: 20px; font-weight: bold;">'+listresult[0].invoice.totalAmount+'</td>'+
            '<td></td>'+
        '</tr>'
    document.getElementById("listdetail").innerHTML = main

}


