let xmlDoc = null;
let editingId = null;

const table = document.getElementById("employeeTable");
const messageDiv = document.getElementById("message");

const empId = document.getElementById("empId");
const empName = document.getElementById("empName");
const empDept = document.getElementById("empDept");
const empSalary = document.getElementById("empSalary");

const form = document.getElementById("employeeForm");

// Load XML using AJAX
function loadXML() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "employees.xml", true);

  xhr.onload = function () {
    if (xhr.status === 200) {

      if (!xhr.responseXML) {
        showMessage("Malformed XML detected", "error");
        return;
      }

      xmlDoc = xhr.responseXML;
      displayEmployees();

    } else {
      showMessage("Error loading XML file", "error");
    }
  };

  xhr.onerror = function () {
    showMessage("Network Error", "error");
  };

  xhr.send();
}

// Display Employees (READ)
function displayEmployees() {
  table.innerHTML = "";

  const employees = xmlDoc.getElementsByTagName("employee");

  if (employees.length === 0) {
    showMessage("No employees found (Empty XML)", "error");
    return;
  }

  for (let i = 0; i < employees.length; i++) {
    const id = employees[i].getElementsByTagName("id")[0].textContent;
    const name = employees[i].getElementsByTagName("name")[0].textContent;
    const dept = employees[i].getElementsByTagName("department")[0].textContent;
    const salary = employees[i].getElementsByTagName("salary")[0].textContent;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${dept}</td>
      <td>${salary}</td>
      <td>
        <button onclick="editEmployee('${id}')">Edit</button>
        <button onclick="deleteEmployee('${id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  }
}

// CREATE & UPDATE
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = empId.value;
  const name = empName.value;
  const dept = empDept.value;
  const salary = empSalary.value;

  if (editingId) {
    updateEmployee(id, name, dept, salary);
  } else {
    createEmployee(id, name, dept, salary);
  }

  form.reset();
  editingId = null;
  displayEmployees();
});

// CREATE
function createEmployee(id, name, dept, salary) {
  const employee = xmlDoc.createElement("employee");

  const idNode = xmlDoc.createElement("id");
  idNode.textContent = id;

  const nameNode = xmlDoc.createElement("name");
  nameNode.textContent = name;

  const deptNode = xmlDoc.createElement("department");
  deptNode.textContent = dept;

  const salaryNode = xmlDoc.createElement("salary");
  salaryNode.textContent = salary;

  employee.appendChild(idNode);
  employee.appendChild(nameNode);
  employee.appendChild(deptNode);
  employee.appendChild(salaryNode);

  xmlDoc.documentElement.appendChild(employee);

  showMessage("Employee added successfully", "success");
}

// UPDATE
function updateEmployee(id, name, dept, salary) {
  const employees = xmlDoc.getElementsByTagName("employee");

  for (let i = 0; i < employees.length; i++) {
    const empIdNode = employees[i].getElementsByTagName("id")[0];

    if (empIdNode.textContent === id) {
      employees[i].getElementsByTagName("department")[0].textContent = dept;
      employees[i].getElementsByTagName("salary")[0].textContent = salary;
      showMessage("Employee updated successfully ", "success");
      return;
    }
  }

  showMessage("Employee not found (404)", "error");
}

// DELETE
function deleteEmployee(id) {
  const employees = xmlDoc.getElementsByTagName("employee");

  for (let i = 0; i < employees.length; i++) {
    const empIdNode = employees[i].getElementsByTagName("id")[0];

    if (empIdNode.textContent === id) {
      xmlDoc.documentElement.removeChild(employees[i]);
      showMessage("Employee deleted successfully", "success");
      displayEmployees();
      return;
    }
  }

  showMessage("Employee not found", "error");
}

// EDIT
function editEmployee(id) {
  const employees = xmlDoc.getElementsByTagName("employee");

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].getElementsByTagName("id")[0].textContent === id) {

      empId.value = id;
      empName.value = employees[i].getElementsByTagName("name")[0].textContent;
      empDept.value = employees[i].getElementsByTagName("department")[0].textContent;
      empSalary.value = employees[i].getElementsByTagName("salary")[0].textContent;

      editingId = id;
      return;
    }
  }
}

function showMessage(msg, type) {
  messageDiv.textContent = msg;
  messageDiv.className = type;
}

// Load initially
loadXML();
