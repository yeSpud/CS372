
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error", "form--hidden");
    messageElement.classList.add(`form__message--${type}`);
}


async function sendUserData(username, password) {
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

 async function sendLoginData(username, password) {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            return response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    }

document.addEventListener("DOMContentLoaded", () => {
    const logIn = document.querySelector("#LogIn");
    const both = document.querySelectorAll('.btn');
    const loginAttemptMessage = document.getElementById("loginAttemptMessage");
    let LogIN_test = false;
    let SignUp_test = true;
    let clickedButton = "";

    both.forEach(bt => {
        bt.addEventListener('mousedown', (a) => {
            clickedButton = a.target.innerHTML;
            console.log(clickedButton);
            if(clickedButton == "loginButton") {
                console.log("Logging in");
                LogIN_test = true;
            } else { 
                console.log("Signing up");
                SignUp_test = true;
            }
        });
    });

    logIn.addEventListener("submit_login", async e => {
        e.preventDefault();
        const userID = document.getElementById("username").value;
        const pass = document.getElementById("password").value;


        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var lower = false;
        var upper = false;
        var special = false;
        var number = false;
        var specials = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

        if(password.length >= 8){
            for(let i = 0; i < password.length; i++){
                if(password.charAt(i) == password.charAt(i).toLowerCase()){
                    lower = true;
                }
                if(password.charAt(i) == password.charAt(i).toUpperCase()){
                    upper = true;
                }
                if(password.charAt(i) >= 0 && password.charAt(i) <= 9){
                    number = true;
                }
                if(specials.test(password)){
                    special = true;
                }
            }

        if (!(username.length >= 5 && username.split("_").length === 2)) {
            setFormMessage(logIn, "error", "Invalid username. Usernames must consist of at least 4 letters, and end in an underscore.");
        } else if (!(lower && upper && number && special)){
            setFormMessage(logIn, "error", "Invalid password.");
        } else {

            const response = await sendLoginData(userID, pass);
            if (response.error){
                setFormMessage(logIn, "error", response.message);
                if (response.attemptsLeft != null) {
                    loginAttemptMessage.textContent = "Attempts remaining: " + response.attemptsLeft; // Update attempt message
                }
            }
            else{
            setFormMessage(logIn, "success", "Valid Username and password");
            //window.location.href = '/mainpage'; //redirect to success page 
            }
        }
        console.log(both);

    }});

    signUp.addEventListener("submit_signup", async e => {
        e.preventDefault();
        const userID = document.getElementById("username").value;
        const pass = document.getElementById("password").value;


        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var lower = false;
        var upper = false;
        var special = false;
        var number = false;
        var specials = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

        if(password.length >= 8){
            for(let i = 0; i < password.length; i++){
                if(password.charAt(i) == password.charAt(i).toLowerCase()){
                    lower = true;
                }
                if(password.charAt(i) == password.charAt(i).toUpperCase()){
                    upper = true;
                }
                if(password.charAt(i) >= 0 && password.charAt(i) <= 9){
                    number = true;
                }
                if(specials.test(password)){
                    special = true;
                }
            }

        if (!(username.length >= 5 && username.split("_").length === 2)) {
            setFormMessage(logIn, "error", "Invalid username. Usernames must consist of at least 4 letters, and end in an underscore.");
        } else if (!(lower && upper && number && special)){
            setFormMessage(logIn, "error", "Invalid password.");
        } else {

            const response = await sendLoginData(userID, pass);
            
            setFormMessage(logIn, "success", "Valid Username and password");
            //window.location.href = '/mainpage'; //redirect to success page 
        }
        console.log(both);

    }});
   

});

