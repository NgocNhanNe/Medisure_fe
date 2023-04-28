var token = localStorage.getItem("token");
async function loadAllScheduleTeacher() {
    var startdate = document.getElementById("startdate").value
    var enddate = document.getElementById("enddate").value
    var confirm = 0;
    var lfckv = document.getElementById("confirmradio").checked;
    if(lfckv == false){
        confirm = 1;
    }
    var url = 'http://localhost:8080/api/doctor/getScheduleByDoctor'+'?confirm='+confirm

    if(startdate != "" && enddate != ""){
        url = 'http://localhost:8080/api/doctor/getScheduleByDoctor?from='+startdate+'&to='+enddate+'&confirm='+confirm
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
        var confirm = 'confirm'
        var btns = 'success'
        if(listresult[i].confirm == 1){
            var confirm = 'unconfirm'
            btns = 'danger'
        }
        main += `<tr>
                    <td><button onclick="confirm(${listresult[i].id})" class="btn btn-${btns} btn_table"><i class="fa fa-check"></i> ${confirm}</button></td>
                    <td><a href="mailto:${listresult[i].patientRecord.user.email}" target="_blank" class="btn btn-success btn_table"><i class="fa fa-envelope"></i>Send</a></td>
                    <td><button onclick="loadNote(${listresult[i].id})" class="btn btn-success btn_table"  data-toggle="modal" data-target=".bd-example-modal-lg"><i class="fa fa-list"></i>Prescribing Medicine</button></td>
                    <td>${listresult[i].bookingDate}</td>
                    <td>${listresult[i].bookingTime}-${listresult[i].toTime}</td>
                    <td>${listresult[i].patientRecord.fulllName}</td>
                    <td>${listresult[i].patientRecord.phone}</td>
                    <td>${listresult[i].patientRecord.description}</td>
                </tr>`
    }
    document.getElementById("listschedule").innerHTML = main
    $('#example').DataTable();
}

async function confirm(id) {
    var url = 'http://localhost:8080/api/doctor/confirm?id='+id
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "Successful!", 
            type: "success"
            },
        function(){ 
            window.location.reload();
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "Unsuccessful Comfirm this schedule!", 
            type: "error"
            },
        function(){ 
        });
    }
}


async function loadNote(id) {
    var url = 'http://localhost:8080/api/doctor/getScheduleByIdRoleDoctor?id='+id
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var result = await response.json(); 
    document.getElementById("medicines").value = result.medicines
    document.getElementById("note").value = result.note
    document.getElementById("idschedule").value = id

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
                    <button onclick="deleteImageSchedule(${list[i].id})" class="btn_table btn-danger btn_re">Delete</button>
                </div>`
    }
    document.getElementById("listimgs").innerHTML = main
}

async function deleteImageSchedule(id){
    var url = 'http://localhost:8080/api/doctor/deleteImageSchedule?id='+id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "Delete medicine image successfully!", 
            type: "success"
            },
        function(){ 
            window.location.reload();
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "Cannot delete this medicine image!", 
            type: "error"
            },
        function(){ 
        });
    }
}


async function addNote(){
    document.getElementById("loading").style.display='block'
    var idschedule = document.getElementById("idschedule").value
    var medicines = document.getElementById("medicines").value
    var note = document.getElementById("note").value
    if(medicines === "" && note === ""){
        alert("Data cannot be empty!")
        return
    }
    if(medicines == ""){
        alert("Medicine is empty, please enter data!")
    }
    if(note == ""){
        alert("Note is empty, please enter data!")
    }
    var schedule = {
        "id":idschedule,
        "medicines":medicines,
        "note":note
    }
    var url = 'http://localhost:8080/api/doctor/updateSchedule';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
         }),
        body:JSON.stringify(schedule)
    });

    var urlUpload = 'http://localhost:8080/api/public/upload';
    const filePath = document.getElementById('imageschedule')
    if(filePath.files.length > 0){
        for(i=0; i<filePath.files.length; i++){
            const formData = new FormData()
            formData.append("file", filePath.files[i])
            const res = await fetch(urlUpload, { 
                method: 'POST', 
                 headers: new Headers({
                }),
                body: formData
            });
            linkbanner = await res.text();

            var imageschedule = {
                "link":linkbanner,
                "schedule":{
                    "id":idschedule
                }
            }
            var urladd = 'http://localhost:8080/api/doctor/saveImageSchedule';
            const response = await fetch(urladd, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer '+token, 
                    'Content-Type': 'application/json'
                 }),
                body:JSON.stringify(imageschedule)
            });

        }
    }


    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "Save Prescribing Medicine successfully!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "Cannot Save Prescribing Medicine Error!", 
            type: "error"
          },
        function(){ 
        });
    }
    document.getElementById("loading").style.display='none'
}


