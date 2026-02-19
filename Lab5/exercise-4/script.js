let products = [];
let editingId = null;

const table = document.getElementById("inventoryTable");
const totalValueSpan = document.getElementById("totalValue");
const messageDiv = document.getElementById("message");
const form = document.getElementById("productForm");
const searchInput = document.getElementById("searchCategory");

// ================= LOAD DATA =================
async function loadProducts() {
  try {
    const response = await fetch("inventory.json");

    if (!response.ok) {
      throw new Error("404 Not Found");
    }

    products = await response.json();
    displayProducts(products);
    calculateTotalValue();

    showMessage("200 OK – Inventory loaded", "success");

  } catch (error) {
    showMessage("500 Internal Server Error – JSON Load Failed", "error");
  }
}

// ================= DISPLAY PRODUCTS =================
function displayProducts(data) {
  table.innerHTML = "";

  data.forEach(product => {
    const row = document.createElement("tr");

if (product.stock <= 5) {
  row.classList.add("low-stock");
}

const total = product.price * product.stock;

row.innerHTML = `
  <td>${product.id}</td>
  <td>${product.name}</td>
  <td>${product.category}</td>
  <td>₹${product.price}</td>
  <td>${product.stock}</td>
  <td>₹${total}</td>
  <td>
    <button onclick="editProduct(${product.id})">Edit</button>
    <button onclick="deleteProduct(${product.id})">Delete</button>
  </td>
`;


    table.appendChild(row);
  });
}

// ================= TOTAL INVENTORY VALUE =================
function calculateTotalValue() {
  const total = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  totalValueSpan.textContent = total;
}

// ================= VALIDATION =================
function validate(id, name, category, price, stock) {

  if (!id || !name || !category || price === "" || stock === "") {
    showMessage("400 Bad Request – All fields required", "error");
    return false;
  }

  if (price < 0 || stock < 0) {
    showMessage("400 Bad Request – Price & Stock must be positive", "error");
    return false;
  }

  return true;
}

// ================= ADD / UPDATE =================
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const id = Number(document.getElementById("id").value);
  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value.trim();
  const price = Number(document.getElementById("price").value);
  const stock = Number(document.getElementById("stock").value);

  if (!validate(id, name, category, price, stock)) return;

  if (editingId) {
    const product = products.find(p => p.id === editingId);
    product.price = price;
    product.stock = stock;
    showMessage("200 OK – Product updated", "success");
    editingId = null;
  } else {
    if (products.some(p => p.id === id)) {
      showMessage("400 Bad Request – ID already exists", "error");
      return;
    }

    products.push({ id, name, category, price, stock });
    showMessage("201 Created – Product added", "success");
  }

  form.reset();
  displayProducts(products);
  calculateTotalValue();
});

// ================= DELETE =================
function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  showMessage("200 OK – Product deleted", "success");
  displayProducts(products);
  calculateTotalValue();
}

// ================= EDIT =================
function editProduct(id) {
  const product = products.find(p => p.id === id);

  document.getElementById("id").value = product.id;
  document.getElementById("name").value = product.name;
  document.getElementById("category").value = product.category;
  document.getElementById("price").value = product.price;
  document.getElementById("stock").value = product.stock;

  editingId = id;
  showMessage("200 OK – Editing product", "success");
}

// ================= SEARCH BY CATEGORY =================
searchInput.addEventListener("input", function() {
  const filtered = products.filter(p =>
    p.category.toLowerCase().includes(this.value.toLowerCase())
  );

  displayProducts(filtered);
});

// ================= MESSAGE =================
function showMessage(msg, type) {
  messageDiv.textContent = msg;
  messageDiv.className = type;
}

// Load on start
loadProducts();
