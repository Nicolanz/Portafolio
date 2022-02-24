
// waits to storage object
if (typeof(Storage) !== 'undefined') {

    const user = getUser();

    if (Object.keys(user).length > 0){
        displayMessage(user);
    } else {
        /**
         * save user from the form data and save into local storage
         */

        // hide confirmation message and show form
        $("#form").css("display", "block");
        $("#messageDiv").css("display", "none");

        $("#form").submit(function(event){
            event.preventDefault();

            const form = new FormData(this);
            const name = form.get('name');
            const email = form.get('email');
            const subject = form.get('subject');
            const message = form.get('message');

            user.name = name;
            user.email = email;
            user.subject = subject;
            user.message = message;

            sessionStorage.setItem('user', JSON.stringify(user));
            emailjs.send('service_9n4249o', "template_r5xicbi", user).then(function(res){
                console.log("Success", res.status);
            });
            displayMessage(user);
        });
    }
} else {
    alert("Sorry, your browser does not support Web storage. Try again with a better one");
}

// function to get user from session storage
function getUser () {
    let user = {}
    if (sessionStorage.length == 0) {
        sessionStorage.setItem('user', JSON.stringify(user))
        return (user);
    }
    else {
        user = JSON.parse(sessionStorage.getItem('user'));
        return (user);
    }
}

// function to show message after sending email and hide form
function displayMessage(user){
    const location = document.location.href;
    const str = location.slice(-14);

    if (str !== "translate.html"){
        $("#messageDiv").append(`Thanks ${user.name}, I'll contact you`);
    } else {
        $("#messageDiv").append(`Gracias ${user.name}. Me pondre en contacto contigo`);
    }

    $("#messageDiv").css("display", "block");
    $("#form").css("display", "none");
    $("#fill").css("display", "none");
}


