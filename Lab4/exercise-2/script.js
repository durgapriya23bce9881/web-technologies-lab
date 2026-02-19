const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const statusDiv = document.getElementById("status");

let debounceTimer;
let currentRequest = 0;

// Debounced search
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  const query = searchInput.value.trim();

  debounceTimer = setTimeout(() => {
    if (query === "") {
      resultsDiv.innerHTML = "";
      statusDiv.textContent = "";
      return;
    }
    searchProducts(query);
  }, 400);
});

async function searchProducts(query) {
  const requestId = ++currentRequest;

  statusDiv.textContent = "Searching...";
  statusDiv.className = "status loading";
  resultsDiv.innerHTML = "";

  try {
    const response = await fetch("products.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Prevent race condition
    if (requestId !== currentRequest) return;

    const filtered = data.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    displayResults(filtered);

  } catch (error) {
    statusDiv.textContent = "Failed to fetch products.";
    statusDiv.className = "status error";
  }
}

function displayResults(products) {
  resultsDiv.innerHTML = "";

  if (products.length === 0) {
    statusDiv.textContent = "No results found.";
    statusDiv.className = "status no-results";
    return;
  }

  statusDiv.textContent = "";
  
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-name">${product.name}</div>
      <div class="product-price">₹${product.price}</div>
      <div class="product-category">${product.category}</div>
    `;

    resultsDiv.appendChild(card);
  });
}
