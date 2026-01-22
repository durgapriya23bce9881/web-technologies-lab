//PRODUCTS

const products = [

    { name: "Laptop", price: 50000, category: "electronics" },
    { name: "Mobile", price: 20000, category: "electronics" },
    { name: "Book", price: 500, category: "education" },
    { name: "T-Shirt", price: 800, category: "clothing" }

];

let cart = [];


// ELEMENTS

const productList = document.getElementById("productList");
const cartBody = document.getElementById("cartBody");
const finalTotal = document.getElementById("finalTotal");

const couponInput = document.getElementById("coupon");
const applyCouponBtn = document.getElementById("applyCoupon");
const couponMsg = document.getElementById("couponMsg");

const timeMsg = document.getElementById("timeMsg");

let couponDiscount = 0;


// TIME DISCOUNT

function checkTimeDiscount() {

    const now = new Date();

    const hour = now.getHours();


    // Discount Time: 6PM to 10PM
    if (hour >= 18 && hour < 22) {

        timeMsg.innerText =
        "🎉 Time Offer Active: Extra 5% Discount (6PM - 10PM)";

        return true;
    }

    // Countdown
    else {

        let target = new Date();

        target.setHours(18, 0, 0, 0);

        if (hour >= 22) {
            target.setDate(target.getDate() + 1);
        }

        let diff = target - now;

        let hrs = Math.floor(diff / 3600000);
        let mins = Math.floor((diff % 3600000) / 60000);
        let secs = Math.floor((diff % 60000) / 1000);

        timeMsg.innerText =
        `Next Discount In: ${hrs}h ${mins}m ${secs}s`;

        return false;
    }
}


// SHOW PRODUCTS

function showProducts() {

    productList.innerHTML = "";

    products.forEach((item, index) => {

        const div = document.createElement("div");

        div.className = "product";

        div.innerHTML = `

            <span>
            ${item.name} (₹${item.price})
            </span>

            <button onclick="addToCart(${index})">
            Add
            </button>
        `;

        productList.appendChild(div);
    });
}


// ADD TO CART

function addToCart(index) {

    let product = products[index];

    let found = cart.find(item =>
        item.name === product.name
    );

    if (found) {

        found.qty++;

    } else {

        cart.push({

            name: product.name,
            price: product.price,
            category: product.category,
            qty: 1
        });
    }

    updateCart();
}


// REMOVE

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// UPDATE QTY

function updateQty(index, value) {

    if (value < 1) return;

    cart[index].qty = Number(value);

    updateCart();
}


// DISCOUNT

function applyDiscount(total) {

    let discount = 0;


    // Bulk Discount
    cart.forEach(item => {

        if (item.qty >= 5) {

            discount +=
            item.price * item.qty * 0.10;
        }
    });


    // Category Discount
    cart.forEach(item => {

        if (item.category === "education") {

            discount +=
            item.price * item.qty * 0.05;
        }
    });


    // Time Discount
    if (checkTimeDiscount()) {

        discount += total * 0.05;
    }


    // Coupon
    discount += couponDiscount;

    return discount;
}


// COUPON

applyCouponBtn.addEventListener("click", function () {

    let code =
    couponInput.value.trim().toUpperCase();

    couponDiscount = 0;


    if (code === "") {

        couponMsg.innerText = "Enter Coupon Code";
        couponMsg.style.color = "red";
        return;
    }


    if (code.startsWith("SAVE") && code.length === 6) {

        couponDiscount = 500;

        couponMsg.innerText =
        "₹500 Coupon Applied";

        couponMsg.style.color = "green";
    }

    else if (code === "STUDENT10") {

        couponDiscount = 1000;

        couponMsg.innerText =
        "₹1000 Student Discount";

        couponMsg.style.color = "green";
    }

    else {

        couponMsg.innerText = "Invalid Coupon";
        couponMsg.style.color = "red";
    }

    updateCart();
});


// UPDATE CART

function updateCart() {

    cartBody.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        let itemTotal =
        item.price * item.qty;

        total += itemTotal;


        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <td>
            <input type="number" min="1"
            value="${item.qty}"
            onchange="updateQty(${index},this.value)">
            </td>

            <td>₹${itemTotal}</td>

            <td>
            <button onclick="removeItem(${index})">
            X
            </button>
            </td>
        `;

        cartBody.appendChild(row);
    });


    let discount = applyDiscount(total);

    let final = total - discount;

    if (final < 0) final = 0;


    finalTotal.innerText =
    `Total: ₹${final.toFixed(2)}
     (Saved ₹${discount.toFixed(2)})`;
}


// TIMER

setInterval(function () {

    checkTimeDiscount();
    updateCart();

}, 1000);


showProducts();
