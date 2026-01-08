const form = document.getElementById("userForm");
const tableBody = document.getElementById("userTable");
const error = document.getElementById("error");

// Load users on page load
document.addEventListener("DOMContentLoaded", loadUsers);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validations
    if (!name || !email || !mobile || !password) {
        error.textContent = "All fields are mandatory";
        return;
    }

    if (!/^\d{10}$/.test(mobile)) {
        error.textContent = "Mobile number must be 10 digits";
        return;
    }

    if (password.length < 6) {
        error.textContent = "Password must be at least 6 characters";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        error.textContent = "Email already registered";
        return;
    }

    users.push({ name, email, mobile });
    localStorage.setItem("users", JSON.stringify(users));

    form.reset();
    error.textContent = "";
    loadUsers();
});

// Load users
function loadUsers() {
    tableBody.innerHTML = "";
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td>
                    <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Delete single user
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users"));
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}

// Clear all users
function clearAllUsers() {
    localStorage.removeItem("users");
    loadUsers();
}