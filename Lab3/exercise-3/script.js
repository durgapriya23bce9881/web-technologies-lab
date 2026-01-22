// QUESTIONS

const questions = [

    {
        id: 1,
        text: "Enter your name",
        type: "text",
        required: true,
        maxLength: 20
    },

    {
        id: 2,
        text: "Select your gender",
        type: "radio",
        required: true,
        options: ["Male", "Female", "Other"]
    },

    {
        id: 3,
        text: "Select your favorite subjects (Max 2)",
        type: "checkbox",
        required: true,
        maxSelect: 2,
        options: ["Maths", "Physics", "Chemistry", "Computer"]
    },

    {
        id: 4,
        text: "Give feedback (Max 50 chars)",
        type: "text",
        required: true,
        maxLength: 50
    }
];


// ELEMENTS

const formArea = document.getElementById("formArea");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("surveyForm");
const successMsg = document.getElementById("successMsg");


// GENERATE FORM
function createForm() {

    questions.forEach(q => {

        const div = document.createElement("div");

        div.className = "question";
        div.id = "q" + q.id;


        let html = `<label>${q.text}</label>`;


        // TEXT
        if (q.type === "text") {

            html += `
                <input type="text"
                id="input${q.id}"
                maxlength="${q.maxLength}"
                oninput="validateForm()">
            `;
        }


        // RADIO
        if (q.type === "radio") {

            html += `<div class="options">`;

            q.options.forEach(opt => {

                html += `
                    <label>
                    <input type="radio"
                    name="radio${q.id}"
                    value="${opt}"
                    onchange="validateForm()">
                    ${opt}
                    </label>
                `;
            });

            html += `</div>`;
        }


        // CHECKBOX
        if (q.type === "checkbox") {

            html += `<div class="options">`;

            q.options.forEach(opt => {

                html += `
                    <label>
                    <input type="checkbox"
                    name="check${q.id}"
                    value="${opt}"
                    onchange="validateForm()">
                    ${opt}
                    </label>
                `;
            });

            html += `</div>`;
        }


        html += `<p class="error" id="error${q.id}"></p>`;


        div.innerHTML = html;

        formArea.appendChild(div);
    });
}


// VALIDATION

function validateForm() {

    let valid = true;


    questions.forEach(q => {

        const error =
        document.getElementById("error" + q.id);


        // TEXT VALIDATION
        if (q.type === "text") {

            const input =
            document.getElementById("input" + q.id);

            if (q.required && input.value.trim() === "") {

                error.innerText = "This field is required";
                valid = false;
            }

            else if
            (input.value.length > q.maxLength) {

                error.innerText =
                "Max " + q.maxLength + " characters";

                valid = false;
            }

            else {

                error.innerText = "";
            }
        }


        // RADIO VALIDATION
        if (q.type === "radio") {

            const radios =
            document.getElementsByName("radio" + q.id);

            let checked = false;

            radios.forEach(r => {

                if (r.checked) checked = true;
            });

            if (q.required && !checked) {

                error.innerText =
                "Please select one option";

                valid = false;
            }

            else {

                error.innerText = "";
            }
        }


        // CHECKBOX VALIDATION
        if (q.type === "checkbox") {

            const checks =
            document.getElementsByName("check" + q.id);

            let count = 0;

            checks.forEach(c => {

                if (c.checked) count++;
            });


            if (q.required && count === 0) {

                error.innerText =
                "Select at least one option";

                valid = false;
            }

            else if (count > q.maxSelect) {

                error.innerText =
                "Maximum " + q.maxSelect + " allowed";

                valid = false;
            }

            else {

                error.innerText = "";
            }
        }

    });


    submitBtn.disabled = !valid;

    return valid;
}


// SUBMIT 

form.addEventListener("submit", function (e) {

    e.preventDefault();


    if (validateForm()) {

        successMsg.innerText =
        "Survey Submitted Successfully!";

        form.reset();

        submitBtn.disabled = true;
    }

});


createForm();
