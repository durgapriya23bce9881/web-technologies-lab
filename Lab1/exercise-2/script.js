function validateForm() {
    // Get values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Error elements
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    // Name validation
    if (name === "") {
        nameError.textContent = "Name is required.";
        isValid = false;
    } else if (name.length < 3) {
        nameError.textContent = "Name must be at least 3 characters.";
        isValid = false;
    }

    // Email validation
    if (email === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!email.includes("@")) {
        emailError.textContent = "Enter a valid email address.";
        isValid = false;
    }

    // Message validation
    if (message === "") {
        messageError.textContent = "Message is required.";
        isValid = false;
    } else if (message.length < 10) {
        messageError.textContent = "Message must be at least 10 characters.";
        isValid = false;
    }

    // If valid, show popup
    if (isValid) {
        alert("Form submitted successfully!");
        return true; // form submits
    }

    return false; // stop form submission
}
