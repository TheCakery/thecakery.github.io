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
///// ajaxCallBack zahtev za proizvode
ajaxCallBack("menu.json", function(result){
    showCart(result);
}); 

$(document).on('click', '.add-to-cart', addToCart);

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
///// Funkcija za skladistenje podataka u local storage
function setToLocalStorage(key, value){
    localStorage.setItem(key, value);
    refreshIcon();
}
///// Funkcija za iscitavanje podataka iz local storage-a
function getFromLocalStorage(key){
    return localStorage.getItem(key);
}
///// Funkcija za brisanje iz local storage-a
function deleteFromLocalStorage(key){
    localStorage.removeItem(key);
    refreshIcon();
}

function addToCart(){
    let id = $(this).data('id');
    let cartLS = getFromLocalStorage('cart');

    if(cartLS && cartLS.length){
        let cart = JSON.parse(cartLS);
        let index;
        let cartItem = cart.find((x,y)=>{
            if(x.id == id){
                index = y;
                return true
            }
            return false;
        });
        if(cartItem){
            cart[index].quantity++;
        }
        else {
            cart.push({"id":id,"quantity":1})
        }
        cartLS = cart;
    }
    else {
        cartLS=[{"id":id,"quantity":1}]
    }
    setToLocalStorage('cart', JSON.stringify(cartLS));
}

function showCart(){
    let cartLS = getFromLocalStorage('cart');
    let html = "";
    let cart = JSON.parse(cartLS);
        ajaxCallBack('products.json',function(allProducts){
            if(cart && cart.length>0){
                cart.forEach(x=>{
                    let product = allProducts.find(p=>p.id == x.id);
                    html +=`<div class="col-8 d-flex product-cart-wrapper mb-3">
                                <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                    <img src="${product.img.src}" alt="${product.img.alt}" class="img-fluid cart-img"/>
                                </div>
                                <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                    <p class="cart-product-name">
                                        ${product.name}
                                    </p>
                                </div>
                                <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 cart-quantity">
                                    <p class="quantity-title"> Kolicina </p>
                                    <input type="number" class="productQuantity" data-id="${product.id}" min="1" value="${x.quantity}"/>
                                    <span class="total-product-price">${product.price * x.quantity} RSD</span>
                                </div>
                                <div class="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                                    <a href="#!" class="btn btn-danger delete-product" data-id="${product.id}"> Obriši </a>
                                </div>
                            </div>`
                })
                $('#cart-content').html(html);
                totalPrice(cart);
        
                $('.productQuantity').change(function(){
                    let value = $(this).val();
                    for(let i in cart){
                        if(cart[i].id == $(this).data('id')){
                            cart[i].quantity = value;
                            let product= allProducts.find(p=>p.id==cart[i].id);
                            $(this).next().html(product.price*cart[i].quantity + "RSD");
                            totalPrice(cart);
                            break;
                        }
                    }
                    setToLocalStorage('cart', JSON.stringify(cart));
                })

                $('.delete-product').click(function(){
                    let id = $(this).data('id');
                    for(let j in cart){
                        if(cart[j].id == $(this).data('id')){
                            cart.splice(j,1);
                            break;
                        }
                    }
                    setToLocalStorage('cart', JSON.stringify(cart));
                    showCart();
                })
            }/// kraj IF

            else {
                $('#cart-content').html(`<div class="col-12 col-sm-12 col-md-10 col-lg-6 col-xl-2 col-xxl-2 alert alert-danger empty-cart"><p class="danger-info text-center">Korpa je prazna!</p></div>`)
            }/// kraj ELSE

        })

}

///// Funkcija koja ispisuje broj proizvoda u korpi
function refreshIcon(){
    let print=getFromLocalStorage('cart') ? JSON.parse(getFromLocalStorage('cart')).length ? String(JSON.parse(getFromLocalStorage('cart')).length) : "" : "";
    $('.cart-number').text(print);
}

function totalPrice(){
    let total = 0;
    let cartLS = getFromLocalStorage('cart');
    let cart = JSON.parse(cartLS);
    ajaxCallBack('products.json', function(allProducts){
        cart.forEach(x=>{
            let product=allProducts.find(p=>p.id==x.id);
            total += product.price*x.quantity;
        })
        $('.total').remove();
        $('#cart-content').append(`<div class="container-fluid">
                                    <div class="row">
                                        <div class="col-8 remove-or-order">
                                            <p class="total-text"> Ukupna cena: <span class="total-cart-price">${total} RSD</span></p>
                                            <a href="#!" id="deleteAll" class="btn btn-danger"> Obriši sve </a>
                                            <a href="#!" id="order" class="btn btn-primary"> Naruči </a>
                                        </div>
                                    </div>
                                   </div>`);
        $('#deleteAll').click(function(){
            deleteAll(showCart);
        })
        $('#order').click(function(){
            deleteAll(order);
        })
    })
}

function deleteAll(callBack){
    deleteFromLocalStorage('cart');
    callBack();
}
function order(){
    $('#cart-content').html(`<div class="col-12 col-sm-12 col-md-10 col-lg-6 col-xl-2 col-xxl-2 alert alert-success success-shopping">
    <p class="success-info text-center">Uspešna kupovina!</p></div>`)
}
