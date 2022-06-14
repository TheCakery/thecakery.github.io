$(document).ready(function(){

    let formCheck = [];
    let button = $(':button');

    button.click(function(){
        let firstName = $('#first-name');
        let lastName = $('#last-name');
        let email = $('#email');

        let firstNameCheck = /^[A-Z][a-z]{2,20}(\s[A-Z][a-z]{2,30})*$/;
        let lastNameCheck = /^[A-Z][a-z]{2,20}(\s[A-Z][a-z]{2,30})*$/;
        let emailCheck = /^\w([\.-_]?\w+\d*)*@\w+\.\w{2,6}$/;

        let firstNameSuccess;
        let lastNameSuccess;
        let emailSuccess;

        /// FIRST NAME
        if(firstName.val() == ''){
            firstName.val('');
            firstName.attr("placeholder", "Polje za ime ne moze biti prazno. ");
        }
        else if (firstNameCheck.test(firstName.val())){
            formCheck.push(firstName.val());
            firstNameSuccess = true;
        }
        else {
            firstName.val('');
            firstName.attr('placeholder', 'Niste ispravno popunili polje (eg. Cakery). ');
        }
        /// LAST NAME
        if(lastName.val() == ''){
            lastName.val('');
            lastName.attr("placeholder", "Polje za prezime ne moze biti prazno. ");
        }
        else if (lastNameCheck.test(lastName.val())){
            formCheck.push(lastName.val());
            lastNameSuccess = true;
        }
        else {
            lastName.val('');
            lastName.attr('placeholder', 'Niste ispravno popunili polje (eg. Cakery). ');
        }
        /// EMAIL
        if(email.val() == ''){
            email.val('');
            email.attr("placeholder", "Email adresa je obavezna. ");
        }
        else if (emailCheck.test(email.val())){
            formCheck.push(email.val());
            emailSuccess = true;
        }
        else {
            email.val('');
            email.attr('placeholder', 'Niste ispravno popunili polje (eg. thecakery@gmail.com). ');
        }
        /// SPAN
        if(firstNameSuccess == true && lastNameSuccess == true && emailSuccess == true){
            $(document).ready(function(){
                $('#successForm').css('display', 'block');
            })
        }
        else {
            $(document).ready(function(){
                $('#successForm').css('display', 'none');
            })
        }
    })

    /// LOCAL STORAGE
    function submitForm(){
        var firstName, lastName, email;

        firstName = $('#first-name').val();
        lastName = $('#last-name').val();
        email = $('#email').val();

        localStorage.setItem("name", firstName);
        localStorage.setItem("surname", lastName);
        localStorage.setItem("email", email);
    }

    $(document).on('click', 'formBtn', submitForm);

    function getData(){
        let nameLS = localStorage.getItem('name');
        let surnameLS = localStorage.getItem('surname');
        let emailLS = localStorage.getItem('email');

        if(nameLS){
            document.getElementById("first-name").value == nameLS;
        }
        if(surnameLS){
            document.getElementById("last-name").value == surnameLS;
        }
        if(emailLS){
            document.getElementById("email").value == emailLS;
        }
    }
    getData();
})