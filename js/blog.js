var token = localStorage.getItem("token");
async function loadAllBlog(page) {
    var s = window.location.search.split('search=')[1];
    var url = 'http://localhost:8080/api/public/allBlogPage?size=5&page='+page
    if(s != null){
        var url = 'http://localhost:8080/api/public/allBlogPage?search='+s+'&size=5&page='+page
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listresult = await response.json(); 
    console.log(listresult)
    var main = '';
    for(i=0; i< listresult.content.length; i++){
        main += '<div class="col-lg-12 col-md-12 mb-5">'+
                    '<div class="blog-item">'+
                        '<div class="blog-thumb">'+
                            '<img src="'+listresult.content[i].imageBanner+'" alt="" class="img-fluid ">'+
                        '</div>'+
                        '<div class="blog-item-content">'+
                            '<div class="blog-item-meta mb-3 mt-4">'+
                                '<span class="text-black text-capitalize mr-3"><i class="icofont-calendar mr-1"></i> '+listresult.content[i].createdDate+'</span>'+
                            '</div> '+
                            '<h2 class="mt-3 mb-3"><a href="blog-single.html">'+listresult.content[i].title+'</a></h2>'+
                            '<p class="mb-4"> '+listresult.content[i].description+'</p>'+
                            '<a href="blog-single.html?id='+listresult.content[i].id+'" target="_blank" class="btn btn-main btn-icon btn-round-full">Read More <i class="icofont-simple-right ml-2  "></i></a>'+
                        '</div>'+
                    '</div>'+
                '</div>'
    }
    document.getElementById("listblog").innerHTML = main
    var totalpage = listresult.totalPages
    var pg = ''
    for(i=0; i<totalpage; i++){
        var c = i+1
        pg+= '<a class="page-numbers" onclick="loadAllBlog('+i+')">'+c+'</a>'
    }
    document.getElementById("listpage").innerHTML = pg
}

async function loadAblog() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/getBlogById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var blog = await response.json();
        console.log(blog)
        document.getElementById("ngaydang").innerHTML = '<i class="icofont-calendar mr-2"></i> '+blog.createdDate
        document.getElementById("title").innerHTML = blog.title
        document.getElementById("content").innerHTML = blog.content
    }
}

