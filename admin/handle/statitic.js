var token = localStorage.getItem("token");
async function loadChart(year){
    document.getElementById("yearlb").innerText = year
    var url = 'http://localhost:8080/api/admin/statitic?year='+year
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var listresult = await response.json();
    var arr = []
    var max = 0;
    var total = 0;
    for(i=0; i<listresult.length; i++){
        if(max < listresult[i]){
            max = listresult[i]
        }
        arr.push(listresult[i])
        total += Number(listresult[i])
    } 

    document.getElementById("totalamount").innerText = formatmoney(total)
    var xValues = ["JAN","FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var yValues = arr;

    new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        yAxes: [{ticks: {min: 0, max:max}}],
        }
    }
    });
}


async function loadTotal(){
    var url = 'http://localhost:8080/api/admin/totalStatitic'
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var listresult = await response.json();
    document.getElementById("totaluser").innerText = listresult[0]
    document.getElementById("totaldoctor").innerText = listresult[1]
    document.getElementById("totalschedule").innerText = listresult[2]
    document.getElementById("totalinvoice").innerText = listresult[3]
}

function chooseYear(){
    var main = ''
    for(i=2023; i< 2041; i++){
        main += '<a onclick="loadChart('+i+')" class="dropdown-item" style="cursor: pointer;">'+i+'</a>';
    }

    document.getElementById("listyear").innerHTML = main
}

function formatmoney(money) {
    var USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return USD.format(money);
}
