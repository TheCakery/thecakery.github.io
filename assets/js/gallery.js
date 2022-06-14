function ajaxCallBack(fileName, result){
    $.ajax({
        url : "assets/data/" + fileName,
        method : "get",
        dataType : "json",
        success : result,
        error : function(xhr){
            console.log(xhr);
        }
    })
}

$(document).ready(function(){

    ///// ajaxCallBack zahtev za menu elemente
    ajaxCallBack("gallery.json", function(result){
        showGallery(result);
        console.log(result);
    }); 
       
});//// kraj window.onload funkcije


function showGallery(images){
    let html = "";
    let divProducts = document.querySelector("#gallery-image");

    for(let image of images){
        html +=`<div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-2">
                    <a href="${image.img.href}" data-lightbox="example-set">
                        <img src="${image.img.src}" alt="${image.img.alt}" class="single-img" />
                    </a>
                </div>`
    }
    divProducts.innerHTML = html;
}