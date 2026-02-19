const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const form = document.getElementById("registerForm");
const submitBtn = document.getElementById("submitBtn");

let debounceTimer;
let isAvailable = false;
let currentRequest = 0;

// Debounce input
usernameInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  const username = usernameInput.value.trim();

  if (username.length < 4) {
    showFeedback("Username must be at least 4 characters", "error");
    submitBtn.disabled = true;
    return;
  }

  debounceTimer = setTimeout(() => {
    checkUsername(username);
  }, 500);
});

async function checkUsername(username) {
  const requestId = ++currentRequest;

  showFeedback("Checking availability...", "loading");
  submitBtn.disabled = true;

  try {
    const response = await fetch("users.json");
    const data = await response.json();

    // Prevent race condition
    if (requestId !== currentRequest) return;

    if (data.usernames.includes(username.toLowerCase())) {
      showFeedback("❌ Username already taken", "error");
      isAvailable = false;
    } else {
      showFeedback("✅ Username available", "success");
      isAvailable = true;
    }

    submitBtn.disabled = !isAvailable;

  } catch (error) {
    showFeedback("Server error. Try again.", "error");
    submitBtn.disabled = true;
  }
}

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = "feedback " + type;
}

form.addEventListener("submit", function (e) {
  if (!isAvailable) {
    e.preventDefault();
    alert("Please choose a valid username.");
  } else {
    alert("Registration Successful!");
  }
});
