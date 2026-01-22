// Get elements

const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const age = document.getElementById("age");
const role = document.getElementById("role");

const submitBtn = document.getElementById("submitBtn");

const skillsBox = document.getElementById("skillsBox");

const form = document.getElementById("regForm");

const success = document.getElementById("success");


//  EMAIL 

function checkEmail() {

    const error = document.getElementById("emailError");

    if (email.value === "") {

        error.innerText = "";
        return false;
    }

    if (!email.value.endsWith("@gmail.com")) {

        error.innerText = "Email must end with @gmail.com";
        return false;

    } else {

        error.innerText = "";
        return true;
    }
}


//  PASSWORD 

function checkPassword() {

    const error = document.getElementById("passwordError");

    let pwd = password.value;


    // If empty → no error yet
    if (pwd === "") {

        error.innerText = "";
        return false;
    }


    let valid = true;


    // Admin = strong password
    if (role.value === "admin") {

        if (pwd.length < 8 ||
            !/[A-Z]/.test(pwd) ||
            !/[0-9]/.test(pwd)) {

            error.innerText =
            "Admin: 8 chars, uppercase, number";

            valid = false;
        }
    }

    // Others = normal password
    else {

        if (pwd.length < 6) {

            error.innerText =
            "Minimum 6 characters";

            valid = false;
        }
    }


    if (valid) error.innerText = "";

    return valid;
}


// CONFIRM

function checkConfirm() {

    const error = document.getElementById("confirmError");


    // If empty → no error
    if (confirmPassword.value === "") {

        error.innerText = "";
        return false;
    }


    if (password.value !== confirmPassword.value) {

        error.innerText = "Passwords do not match";
        return false;

    } else {

        error.innerText = "";
        return true;
    }
}


//  AGE 

function checkAge() {

    const error = document.getElementById("ageError");


    // If empty → no error
    if (age.value === "") {

        error.innerText = "";
        return false;
    }


    let min = 0;

    if (role.value === "student") min = 16;
    if (role.value === "teacher") min = 22;
    if (role.value === "admin") min = 25;

    if (age.value < min) {

        error.innerText = "Minimum age: " + min;
        return false;

    } else {

        error.innerText = "";
        return true;
    }
}


// SKILLS

function toggleSkills() {

    if (role.value === "teacher") {

        skillsBox.classList.remove("hide");

    } else {

        skillsBox.classList.add("hide");
    }
}

// MAIN 

function checkForm() {

    let valid =

        checkEmail() &&
        checkPassword() &&
        checkConfirm() &&
        checkAge() &&
        role.value !== "";

    submitBtn.disabled = !valid;
}

// EVENTS 

email.addEventListener("input", checkForm);

password.addEventListener("input", checkForm);

confirmPassword.addEventListener("input", checkForm);

age.addEventListener("input", checkForm);

role.addEventListener("change", function () {

    toggleSkills();
    checkForm();

});


// SUBMIT

form.addEventListener("submit", function (e) {

    e.preventDefault();

    success.innerText =
    "Registration Successful!";

    form.reset();

    submitBtn.disabled = true;

});
