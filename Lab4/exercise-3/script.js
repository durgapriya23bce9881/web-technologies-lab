const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const message = document.getElementById("message");

let students = [];
let editMode = false;

// READ (Fetch students)
function fetchStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) throw { status: 500 };
            return response.json();
        })
        .then(data => {
            students = data.students;
            displayStudents();
            showMessage("Students loaded successfully (200 OK)", "success");
        })
        .catch(error => {
            showMessage("Error loading students (500 Server Error)", "error");
        });
}

// DISPLAY TABLE
function displayStudents() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.marks}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// CREATE / UPDATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value;
    const dept = document.getElementById("studentDept").value;
    const marks = document.getElementById("studentMarks").value;

    const existing = students.find(s => s.id === id);

    if (existing && !editMode) {
        showMessage("Student ID already exists (404 Conflict)", "error");
        return;
    }

    if (editMode) {
        const index = students.findIndex(s => s.id === id);
        students[index] = { id, name, department: dept, marks };
        showMessage("Student updated successfully (200 OK)", "success");
        editMode = false;
    } else {
        students.push({ id, name, department: dept, marks });
        showMessage("Student added successfully (200 OK)", "success");
    }

    form.reset();
    displayStudents();
});

// EDIT
function editStudent(index) {
    const student = students[index];

    document.getElementById("studentId").value = student.id;
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentDept").value = student.department;
    document.getElementById("studentMarks").value = student.marks;

    editMode = true;
}

// DELETE
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete?")) {
        students.splice(index, 1);
        displayStudents();
        showMessage("Student deleted successfully (200 OK)", "success");
    }
}

// MESSAGE DISPLAY
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// INITIAL LOAD
fetchStudents();