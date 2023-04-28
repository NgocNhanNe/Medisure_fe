var token = localStorage.getItem("token");
async function loadAllProcess() {
    var url = 'http://localhost:8080/api/public/allMedicalProcess'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listresult = await response.json(); 
    var main = '';
    for(i=0; i< listresult.length; i++){
        main += '<tr>'+
                    '<td>#'+listresult[i].id+'</td>'+
                    '<td>'+listresult[i].processName+'</td>'+
                    '<td>'+listresult[i].price+'</td>'+
                    '<td style="white-space:pre-wrap; word-wrap:break-word;line-height:20px">'+listresult[i].description+'</td>'+
                    '<td><button onclick="deleteProcess('+listresult[i].id+')" class="btn btn-danger btn_nb"><i class="fa fa-trash"></i>Delete</button></td>'+
                    '<td><button onclick="replace('+listresult[i].id+')" class="btn btn-primary btn_nb"><i class="fa fa-edit"></i>Update</button></td>'+
                '</tr>'
    }
    document.getElementById("listprocess").innerHTML = main
    $('#example').DataTable();
}
function replace(id){
    window.location.replace('addprocess.html?id='+id)
}
async function loadAProcess() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/medicalProcessById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var process = await response.json();
        document.getElementById("id").value = process.id
        document.getElementById("processtname").value = process.processName
        document.getElementById("processprice").value = process.price
        document.getElementById("description").value = process.description
    }
}

async function addProcess(){
    var token = localStorage.getItem("token");
    var id = document.getElementById("id").value
    var processName = document.getElementById("processtname").value
    var price = document.getElementById("processprice").value
    var description = document.getElementById("description").value

    if(processName === "" && price === ""){
        alert("Data cannot be empty!")
        return
    }

    if(processName == ""){
        alert("Process Name is empty, please enter data!")
        return
    }
    if(price == ""){
        alert("Price is empty, please enter data!")
        return
    }
    if(price<0){
        alert("Price must be positive number!");
        return
    }
    var process = {
        "id":id,
        "processName":processName,
        "price":price,
        "description":description
    }
    var url = 'http://localhost:8080/api/admin/saveOrUpdateMedicalProcess';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
         }),
        body:JSON.stringify(process)
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "Save or Update Successfully!", 
            type: "success"
          },
        function(){ 
            window.location.replace('process.html')
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "Save or Update Unsuccessfully!", 
            type: "error"
          },
        function(){ 
        });
    }
}

async function deleteProcess(id){
    var url = 'http://localhost:8080/api/admin/deleteMedicalProcess?id='+id;
    var delMessage = confirm("Are you sure to delete this medical?")
    if(delMessage){
          const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "Delete this medical successfully!", 
            type: "success"
            },
        function(){ 
            window.location.reload();
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "Delete this medical unsuccessful!", 
            type: "error"
            },
        function(){ 
            window.location.reload();
        });
    }
    }
    else{
        return false
    }
  
}
