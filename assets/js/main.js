$('.homepage-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrow:false,
    prevArrow: false,
    nextArrow: false
  });

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

window.onload = function (){

///// ajaxCallBack zahtev za menu elemente
ajaxCallBack("menu.json", function(result){
    showNavigation(result);
}); 

}//// kraj window.onload funkcije

///// Funkcija za ispis navigacije
function showNavigation(elements){
    let html = "";
    let divNav = document.querySelector("#menu");

    for(let element of elements){
        html +=`<div class="menu-element">
                    <a href="${element.href}" class="menu-link">${element.name}</a>
                </div>`
    }
    divNav.innerHTML = html;
}


