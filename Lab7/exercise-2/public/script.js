let page = 1;

let search = "";
let category = "";
let sort = "";

async function loadBooks(reset = false) {

    if (reset) {
        page = 1;
        document.getElementById("books").innerHTML = "";
    }

    const res = await fetch(`/books?page=${page}&search=${search}&category=${category}&sort=${sort}`);

    const books = await res.json();

    const container = document.getElementById("books");

    books.forEach(book => {

        container.innerHTML += `
        <div class="book">
            <h3>${book.title}</h3>
            <p><b>Author:</b> ${book.author}</p>
            <p><b>Category:</b> ${book.category}</p>
            <p><b>Price:</b> ₹${book.price}</p>
            <p><b>Rating:</b> ⭐ ${book.rating}</p>
        </div>
        `;

    });

}

function loadMore() {
    page++;
    loadBooks(false);
}

function searchBook() {

    search = document.getElementById("searchTitle").value;
    category = "";
    sort = "";

    loadBooks(true);
}

function filterCategory(cat) {

    category = cat;
    search = "";
    sort = "";

    loadBooks(true);
}

function sortPrice() {

    sort = "price";
    search = "";
    category = "";

    loadBooks(true);
}

function topBooks() {

    sort = "rating";
    search = "";
    category = "";

    loadBooks(true);
}

loadBooks();