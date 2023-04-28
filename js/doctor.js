async function loadAllSpecialist() {
    var url = 'http://localhost:8080/api/public/allSpecialist'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listresult = await response.json(); 
    var main = '';
    for(i=0; i< listresult.length; i++){
        var active = ''
        if(i==0){
           active = 'active'
           loadAllDoctor(listresult[i].id)
        }
        main += '<label onclick="loadAllDoctor('+listresult[i].id+')" class="btn '+active+'">'+
                    '<input type="radio" name="shuffle-filter" value="cat1" />'+listresult[i].name+''+
                '</label>'
    }
    document.getElementById("listspecialist").innerHTML = main
}

async function loadAllDoctor(id) {
    var url = 'http://localhost:8080/api/public/findDoctorBySpecialist?id='+id
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listresult = await response.json(); 
    console.log(listresult)
    var main = '';
    for(i=0; i< listresult.length; i++){
        main += '<div class="col-lg-3 col-sm-6 col-md-6 mb-4 shuffle-item illustration" data-groups="[&quot;cat2&quot;]">'+                    '<div class="position-relative doctor-inner-box">'+
                        '<div class="doctor-profile">'+
                            '<div class="doctor-img">'+
                            '<img style="height:250px" src="'+listresult[i].user.avatar+'" alt="doctor-image" class="img-fluid w-100">'+
                            '</div>'+
                        '</div>'+
                        '<div class="content mt-3">'+
                            '<h4 class="mb-0"><a href="doctor-single.html?id='+listresult[i].id+'">'+listresult[i].fulllName+'</a></h4>'+
                            '<p>'+listresult[i].specialist.name+'</p>'+
                        '</div>'+ 
                    '</div>'+
                '</div>'
    }
    document.getElementById("listdoctor").innerHTML = main
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
        document.getElementById("doctorname").innerHTML = doctor.fulllName
        document.getElementById("doctornames").innerHTML = doctor.fulllName
        document.getElementById("ckhuyenkhoa").innerHTML = doctor.specialist.name
        document.getElementById("description").innerHTML = doctor.description
        document.getElementById("img_doctordetail").src = doctor.user.avatar
    }
}