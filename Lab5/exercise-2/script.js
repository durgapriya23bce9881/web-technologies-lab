let xmlDoc = null;

const table = document.getElementById("bookTable");
const messageDiv = document.getElementById("message");

const bookId = document.getElementById("bookId");
const title = document.getElementById("title");
const author = document.getElementById("author");
const status = document.getElementById("status");

const form = document.getElementById("bookForm");

// ================= LOAD XML =================
function loadXML() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "books.xml", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      if (!xhr.responseXML) {
        showMessage("500 Internal Server Error – Malformed XML", "error");
        return;
      }

      xmlDoc = xhr.responseXML;
      displayBooks();
      showMessage("200 OK – Books loaded successfully", "success");
    } else {
      showMessage("404 Not Found – books.xml missing", "error");
    }
  };

  xhr.onerror = function () {
    showMessage("500 Internal Server Error – Network Error", "error");
  };

  xhr.send();
}

// ================= DISPLAY BOOKS =================
function displayBooks() {
  table.innerHTML = "";

  const books = xmlDoc.getElementsByTagName("book");

  for (let i = 0; i < books.length; i++) {

    const id = books[i].getElementsByTagName("id")[0].textContent;
    const t = books[i].getElementsByTagName("title")[0].textContent;
    const a = books[i].getElementsByTagName("author")[0].textContent;
    const s = books[i].getElementsByTagName("status")[0].textContent;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${id}</td>
      <td>${t}</td>
      <td>${a}</td>
      <td class="${s === "Available" ? "available" : "issued"}">${s}</td>
      <td>
        <button onclick="toggleStatus('${id}')">
          ${s === "Available" ? "Issue Book" : "Return Book"}
        </button>
        <button onclick="deleteBook('${id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  }
}

// ================= ADD BOOK =================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = bookId.value.trim();
  const t = title.value.trim();
  const a = author.value.trim();
  const s = status.value;

  if (!id || !t || !a || !s) {
    showMessage("400 Bad Request – All fields required", "error");
    return;
  }

  const books = xmlDoc.getElementsByTagName("book");

  for (let i = 0; i < books.length; i++) {
    if (books[i].getElementsByTagName("id")[0].textContent === id) {
      showMessage("400 Bad Request – Book ID already exists", "error");
      return;
    }
  }

  const book = xmlDoc.createElement("book");

  const idNode = xmlDoc.createElement("id");
  idNode.textContent = id;

  const titleNode = xmlDoc.createElement("title");
  titleNode.textContent = t;

  const authorNode = xmlDoc.createElement("author");
  authorNode.textContent = a;

  const statusNode = xmlDoc.createElement("status");
  statusNode.textContent = s;

  book.appendChild(idNode);
  book.appendChild(titleNode);
  book.appendChild(authorNode);
  book.appendChild(statusNode);

  xmlDoc.documentElement.appendChild(book);

  showMessage("201 Created – Book added successfully", "success");

  form.reset();
  displayBooks();
});

// ================= TOGGLE ISSUE / RETURN =================
function toggleStatus(id) {
  const books = xmlDoc.getElementsByTagName("book");

  for (let i = 0; i < books.length; i++) {
    if (books[i].getElementsByTagName("id")[0].textContent === id) {

      const statusNode = books[i].getElementsByTagName("status")[0];

      if (statusNode.textContent === "Available") {
        statusNode.textContent = "Issued";
        showMessage("200 OK – Book Issued Successfully", "success");
      } else {
        statusNode.textContent = "Available";
        showMessage("200 OK – Book Returned Successfully", "success");
      }

      displayBooks();
      return;
    }
  }

  showMessage("404 Not Found – Book not found", "error");
}

// ================= DELETE =================
function deleteBook(id) {
  const books = xmlDoc.getElementsByTagName("book");

  for (let i = 0; i < books.length; i++) {
    if (books[i].getElementsByTagName("id")[0].textContent === id) {

      xmlDoc.documentElement.removeChild(books[i]);
      showMessage("200 OK – Book deleted successfully", "success");
      displayBooks();
      return;
    }
  }

  showMessage("404 Not Found – Book not found", "error");
}

// ================= MESSAGE =================
function showMessage(msg, type) {
  messageDiv.textContent = msg;
  messageDiv.className = type;
}

// Load
loadXML();
