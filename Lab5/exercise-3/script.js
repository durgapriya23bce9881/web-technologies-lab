let students = [];
let editingId = null;

const table = document.getElementById("studentTable");
const messageDiv = document.getElementById("message");
const form = document.getElementById("studentForm");
const searchInput = document.getElementById("search");

// ================= FETCH JSON =================
async function loadStudents() {
  try {
    const response = await fetch("students.json");

    if (!response.ok) {
      throw new Error("404 Not Found");
    }

    students = await response.json(); // Parsing JSON
    displayStudents(students);

    showMessage("200 OK – Students loaded successfully", "success");

  } catch (error) {
    showMessage("500 Internal Server Error – JSON loading failed", "error");
  }
}

// ================= DISPLAY =================
function displayStudents(data) {
  table.innerHTML = "";

  data.forEach(student => {
    const grade = calculateGrade(student.marks);
    const markClass = getMarkClass(student.marks);

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.course}</td>
      <td class="${markClass}">${student.marks}</td>
      <td>${grade}</td>
      <td>
        <button onclick="editStudent(${student.id})">Edit</button>
        <button onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// ================= GRADE CALC =================
function calculateGrade(marks) {
  if (marks >= 80) return "A";
  if (marks >= 60) return "B";
  if (marks >= 40) return "C";
  return "Fail";
}

function getMarkClass(marks) {
  if (marks >= 80) return "high";
  if (marks >= 60) return "medium";
  return "low";
}

// ================= VALIDATION =================
function validate(id, name, course, marks) {
  if (!id || !name || !course || marks === "") {
    showMessage("400 Bad Request – All fields required", "error");
    return false;
  }

  if (marks < 0 || marks > 100) {
    showMessage("400 Bad Request – Marks must be 0-100", "error");
    return false;
  }

  return true;
}

// ================= CREATE / UPDATE =================
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const id = Number(document.getElementById("id").value);
  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value.trim();
  const marks = Number(document.getElementById("marks").value);

  if (!validate(id, name, course, marks)) return;

  if (editingId) {
    const student = students.find(s => s.id === editingId);
    student.course = course;
    student.marks = marks;
    showMessage("200 OK – Student updated", "success");
    editingId = null;
  } else {
    if (students.some(s => s.id === id)) {
      showMessage("400 Bad Request – ID already exists", "error");
      return;
    }

    students.push({ id, name, course, marks });
    showMessage("201 Created – Student added", "success");
  }

  form.reset();
  displayStudents(students);
});

// ================= DELETE =================
function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  showMessage("200 OK – Student deleted", "success");
  displayStudents(students);
}

// ================= EDIT =================
function editStudent(id) {
  const student = students.find(s => s.id === id);

  document.getElementById("id").value = student.id;
  document.getElementById("name").value = student.name;
  document.getElementById("course").value = student.course;
  document.getElementById("marks").value = student.marks;

  editingId = id;
  showMessage("200 OK – Editing student", "success");
}

// ================= SEARCH =================
searchInput.addEventListener("input", function() {
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(this.value.toLowerCase())
  );
  displayStudents(filtered);
});

// ================= MESSAGE =================
function showMessage(msg, type) {
  messageDiv.textContent = msg;
  messageDiv.className = type;
}

// Load on start
loadStudents();
