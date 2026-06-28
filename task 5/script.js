const products = [
{
id:1,
name:"Laptop",
price:65000,
category:"Electronics",
image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
},
{
id:2,
name:"Smartphone",
price:30000,
category:"Electronics",
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
},
{
id:3,
name:"Headphones",
price:4000,
category:"Accessories",
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
},
{
id:4,
name:"Watch",
price:2500,
category:"Accessories",
image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500"
},
{
id:5,
name:"T-Shirt",
price:1200,
category:"Fashion",
image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
},
{
id:6,
name:"Shoes",
price:3500,
category:"Fashion",
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
},
{
id:7,
name:"Tablet",
price:22000,
category:"Electronics",
image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500"
},
{
id:8,
name:"Backpack",
price:1800,
category:"Fashion",
image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
},
{
id:9,
name:"Gaming Mouse",
price:1500,
category:"Accessories",
image:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
},
{
id:10,
name:"Mechanical Keyboard",
price:3500,
category:"Accessories",
image:"https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500"
},
{
id:11,
name:"Bluetooth Speaker",
price:2800,
category:"Electronics",
image:"https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500"
},
{
id:12,
name:"Power Bank",
price:2000,
category:"Electronics",
image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500"
},
{
id:13,
name:"Sunglasses",
price:999,
category:"Fashion",
image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
},
{
id:14,
name:"Denim Jacket",
price:2999,
category:"Fashion",
image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"
},
{
id:15,
name:"Smart TV",
price:45000,
category:"Electronics",
image:"https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500"
},
{
id:16,
name:"Wireless Earbuds",
price:3500,
category:"Accessories",
image:"https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500"
}
];

const productContainer = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");
const themeBtn = document.getElementById("themeBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(productList){

productContainer.innerHTML = "";

productList.forEach(product => {

const card = document.createElement("div");

card.classList.add("product-card");

card.innerHTML = `
<img src="${product.image}" alt="${product.name}" loading="lazy">

<h3>${product.name}</h3>

<p><strong>Category:</strong> ${product.category}</p>

<p><strong>Price:</strong> ₹${product.price}</p>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>
`;

productContainer.appendChild(card);

});

}

function addToCart(id){

const product = products.find(product => product.id === id);

cart.push(product);

localStorage.setItem("cart", JSON.stringify(cart));

updateCart();

}

function removeFromCart(index){

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

updateCart();

}

function updateCart(){

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `
<div class="cart-item">

<div>
<strong>${item.name}</strong><br>
₹${item.price}
</div>

<button onclick="removeFromCart(${index})">
Remove
</button>

</div>
`;

});

cartCount.textContent = cart.length;
cartTotal.textContent = total;

}

function filterProducts(){

let filteredProducts = [...products];

const searchValue = searchInput.value.toLowerCase();
const categoryValue = categoryFilter.value;
const sortValue = sortPrice.value;

filteredProducts = filteredProducts.filter(product =>
product.name.toLowerCase().includes(searchValue)
);

if(categoryValue !== "all"){

filteredProducts = filteredProducts.filter(product =>
product.category === categoryValue
);

}

if(sortValue === "low-high"){
filteredProducts.sort((a,b)=>a.price-b.price);
}
else if(sortValue === "high-low"){
filteredProducts.sort((a,b)=>b.price-a.price);
}

displayProducts(filteredProducts);

}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
sortPrice.addEventListener("change", filterProducts);

themeBtn.addEventListener("click", ()=>{

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){
themeBtn.textContent = "☀️ Light Mode";
}else{
themeBtn.textContent = "🌙 Dark Mode";
}

});

document.getElementById("clearCart").addEventListener("click", ()=>{

cart = [];

localStorage.removeItem("cart");

updateCart();

});

/* ORDER FORM */

const orderForm = document.getElementById("orderForm");
const orderMessage = document.getElementById("orderMessage");

orderForm.addEventListener("submit", function(e){

e.preventDefault();

if(cart.length === 0){
alert("Your cart is empty!");
return;
}

const name = document.getElementById("customerName").value;
const phone = document.getElementById("customerPhone").value;
const address = document.getElementById("customerAddress").value;

let totalAmount = 0;

cart.forEach(item=>{
totalAmount += item.price;
});

orderMessage.innerHTML = `
<h3>✅ Order Placed Successfully</h3>

<p><strong>Name:</strong> ${name}</p>

<p><strong>Phone:</strong> ${phone}</p>

<p><strong>Address:</strong> ${address}</p>

<p><strong>Total Products:</strong> ${cart.length}</p>

<p><strong>Total Amount:</strong> ₹${totalAmount}</p>

<p><strong>Estimated Delivery:</strong> 3-5 Business Days</p>

<p>Thank you for shopping with us!</p>
`;

cart = [];
localStorage.removeItem("cart");
updateCart();
orderForm.reset();

});

displayProducts(products);
updateCart();