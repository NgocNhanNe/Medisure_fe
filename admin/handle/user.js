var token = localStorage.getItem("token");
async function loadAllUser() {
    var url = 'http://localhost:8080/api/admin/getAllUserNotAdmin'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var listresult = await response.json(); 
    var main = '';
    for(i=0; i< listresult.length; i++){
        var type = 0;
        var sex = 'Male'
        var activebtn = 'btn btn-danger'
        var activebtnname = 'Unlock'
        if(listresult[i].sex == 1){
            sex = 'Female'
        }
        if(listresult[i].actived == 1){
            var activebtn = 'btn btn-primary'
            activebtnname = 'Lock'
            type = 1;
        }
        main += '<tr>'+
                    '<td>#'+listresult[i].id+'</td>'+
                    '<td>'+listresult[i].username+'</td>'+
                    '<td>'+listresult[i].email+'</td>'+
                    '<td>'+listresult[i].created_date+'</td>'+
                    '<td>'+sex+'</td>'+
                    '<td>'+listresult[i].authorities[0].name+'</td>'+
                    '<td><button onclick="lockOrUnlock('+listresult[i].id+', '+type+')" class="'+activebtn+'"><i class="fa fa-lock"></i> '+activebtnname+'</button></td>'+
                '</tr>'
    }
    document.getElementById("listuser").innerHTML = main
    $('#example').DataTable();
}

async function lockOrUnlock(id, type) {
    var url = 'http://localhost:8080/api/admin/activeUser?id=' + id;
        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        if (response.status < 300) {
            var mess = '';
            if(type == 1){
                mess = 'Lock successfully!'
            }
            else{
                mess = 'Unlock successfully!'
            }
                swal({
                    title: "Notification", 
                    text: mess, 
                    type: "success"
                  },
                function(){ 
                    window.location.reload();
                });
            
        }
        else {
            swal({
                title: "Notification", 
                text: "Error", 
                type: "error"
              },
            function(){ 
                window.location.reload();
            });
        }

   
}