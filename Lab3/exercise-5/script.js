// VARIABLES

const stages = document.querySelectorAll(".stage");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");

const progress = document.getElementById("progress");

const form = document.getElementById("mainForm");
const success = document.getElementById("success");


let current = 0;


// Store data
let formData = {

    name: "",
    email: "",
    password: "",
    college: "",
    year: "",
    city: ""
};


// SHOW STAGE

function showStage(index) {

    stages.forEach((stage, i) => {

        stage.classList.remove("active");

        if (i === index) {

            stage.classList.add("active");
        }
    });


    // Buttons
    prevBtn.style.display =
        index === 0 ? "none" : "inline-block";

    nextBtn.style.display =
        index === stages.length - 1 ?
        "none" : "inline-block";

    submitBtn.style.display =
        index === stages.length - 1 ?
        "inline-block" : "none";


    // Progress
    progress.style.width =
        ((index + 1) / stages.length) * 100 + "%";
}


//VALIDATION

function validateStage() {

    let valid = true;


    // Clear errors
    document.querySelectorAll(".error")
    .forEach(e => e.innerText = "");


    // Stage 1
    if (current === 0) {

        const name =
        document.getElementById("name");

        const email =
        document.getElementById("email");


        if (name.value.trim() === "") {

            document.getElementById("nameError")
            .innerText = "Enter name";

            valid = false;
        }

        if (!email.value.includes("@")) {

            document.getElementById("emailError")
            .innerText = "Invalid email";

            valid = false;
        }


        if (valid) {

            formData.name = name.value;
            formData.email = email.value;
        }
    }


    // Stage 2
    if (current === 1) {

        const pass =
        document.getElementById("password");

        const confirm =
        document.getElementById("confirm");


        if (pass.value.length < 6) {

            document.getElementById("passError")
            .innerText = "Min 6 chars";

            valid = false;
        }

        if (pass.value !== confirm.value) {

            document.getElementById("confirmError")
            .innerText = "Not matching";

            valid = false;
        }


        if (valid) {

            formData.password = pass.value;
        }
    }


    // Stage 3
    if (current === 2) {

        const college =
        document.getElementById("college");

        const year =
        document.getElementById("year");


        if (college.value.trim() === "") {

            document.getElementById("collegeError")
            .innerText = "Enter college";

            valid = false;
        }

        if (year.value < 1 || year.value > 4) {

            document.getElementById("yearError")
            .innerText = "Enter 1 to 4";

            valid = false;
        }


        if (valid) {

            formData.college = college.value;
            formData.year = year.value;
        }
    }


    // Stage 4
    if (current === 3) {

        const city =
        document.getElementById("city");

        const agree =
        document.getElementById("agree");


        if (city.value.trim() === "") {

            document.getElementById("cityError")
            .innerText = "Enter city";

            valid = false;
        }

        if (!agree.checked) {

            document.getElementById("agreeError")
            .innerText = "Accept terms";

            valid = false;
        }


        if (valid) {

            formData.city = city.value;
        }
    }


    return valid;
}


// BUTTONS

nextBtn.addEventListener("click", function () {

    if (validateStage()) {

        current++;

        showStage(current);
    }
});


prevBtn.addEventListener("click", function () {

    current--;

    showStage(current);
});


form.addEventListener("submit", function (e) {

    e.preventDefault();


    if (validateStage()) {

        success.innerText =
        "Registration Successful!";

        console.log("Saved Data:", formData);

        form.reset();

        current = 0;

        showStage(current);
    }
});



showStage(current);
