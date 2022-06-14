

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

///// Filtriranje po nazivu
try{
    document.querySelector("#search").addEventListener("keyup", filterPoPretrazi);
    function filterPoPretrazi(){
        const unos = this.value;
        ajaxCallBack("products.json", function(search){
            let filterProducts = search.filter(el => {
                if(el.name.toLowerCase().includes(unos.toLowerCase())){
                    return true;
                }
            });
            showProducts(filterProducts);
        })
    }
}
catch(error){
    console.log("Error");
}

///// Sortiranje po ceni 
$(document).on('change', '#ddlSort', function(){
    ajaxCallBack('products.json', function(products){
        let tip = $("#ddlSort").val();
        console.log(tip);

        if(tip == '1'){
            products.sort(function(a, b){
                return a.price - b.price
            })
        }
        if(tip == '2'){
            products.sort(function(a, b){
                return b.price - a.price
            })
        }
        showProducts(products);
    })
})

///// Filter po kategoriji
$(document).on('change', '#ddlCategories', function(){
    ajaxCallBack('products.json', function(products){
        let idCat = $('#ddlCategories').val();
        console.log(idCat);

        let filteredProducts = products.filter(objProduct => objProduct.catID == idCat);
        if(idCat == '0'){
            showProducts(products);
        }
        else {
            showProducts(filteredProducts);
        }
    })
})

///// Filter po brendu
$(document).on('change', '#ddlBrands', function(){
    ajaxCallBack('products.json', function(products){
        let idBrand = $('#ddlBrands').val();
        console.log(idBrand);

        let filteredProducts = products.filter(objProduct => objProduct.brandID == idBrand);
        if(idBrand == '0'){
            showProducts(products);
        }
        else {
            showProducts(filteredProducts);
        }
    })
})

///// Filter po popustu
$(document).on('change', '#ddlDiscounts', function(){
    ajaxCallBack('products.json', function(products){
        let idDiscount = $('#ddlDiscounts').val();
        console.log(idDiscount);

        let filteredProducts = products.filter(objProduct => objProduct.discountID == idDiscount);
        if(idDiscount == '0'){
            showProducts(products);
        }
        else {
            showProducts(filteredProducts);
        }
    })
})

///// ajaxCallBack zahtev za menu elemente
ajaxCallBack("menu.json", function(result){
    showNavigation(result);
}); 
  
///// ajaxCallBack zahtev za isispivanje proizvoda
ajaxCallBack("products.json", function(result){
    showProducts(result);
})

///// ajaxCallBack zahtev za kategorije
ajaxCallBack("category.json", function(result){
    createDropDownList("Kategorije", "ddlCategories", "#category-list", result);
})
    
///// ajaxCallBack zahtev za sortiranje 
ajaxCallBack("sort.json", function(result){
    createDropDownList("Sortiraj", "ddlSort", "#sort-list", result);
})

});//// kraj window.onload funkcije

///// Funkcija za ispisivanje proizvoda
function showProducts(products){
    let html = "";
    let divProducts = document.querySelector("#product-list");

    if(products.length == 0){
        html +=`<p class="alert alert-danger text-center"> Currently products are not available </p>`
    }
    else {
        for(let product of products){
            html +=`<div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3  mt-5 product-wrapper" >
                        <img src="${product.img.src}" alt="${product.img.alt}" class="img-fluid products-img" width="100%"/>
                        <div class="product-text-wrapper">
                            <p class="product-name"> ${product.name} </p>
                            <p class="cakery-price"> ${product.price},00 RSD</p>
                            <ul class="description-cakes">  
                                <li> <b class="black-bold">Opis:</b> ${product.description.opis} </li>
                                <li> <b class="black-bold">Alergeni:</b> ${product.description.alergeni} </li>
                                <li> <b class="black-bold">Porcije:</b> ${product.description.porcije} </li>
                                <li> <b class="black-bold">Ostalo:</b> ${product.description.ostalo} </li>
                            </ul>

                        </div>
                        <div class="button-wrapper">
                            <input type="button" data-id=${product.id} value="Dodaj u korpu" class="button btn add-to-cart"/>
                        </div>
                    </div>`
        }
    }
    divProducts.innerHTML = html;
}






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


///// Funkcija za kreiranje dinamicke padajuce liste
function createDropDownList(label, ids, selector, array){
    let divSort = document.querySelector(selector);
    let html = `<div class="form-group">
                    <label class="label-text">${label}</label>
                    <select class="form-select" id="${ids}">
                        <option value="0">Izaberite..</option>`;
                        for(let objekat of array){
                            html += `<option value="${objekat.id}">${objekat.name}</option>`
                        }

                html += `</select>
                </div>`;
    divSort.innerHTML = html;
}

