const itemsGrid = document.getElementById("itemsGrid");
console.log("marketplace loaded");
if (itemsGrid) {
  const items = JSON.parse(localStorage.getItem("items")) || [];

  if (items.length > 0) {
    itemsGrid.innerHTML = items.map(item => `
      <div class="item-card">
        <div class="image-box electronics">
          ${item.image ? `<img src="${item.image}" class="item-img">` : "📦"}
        </div>

        <div class="item-info">
          <h3>${item.name}</h3>
          <p>${item.category} • ${item.college}</p>

          <div class="price-row">
            <h2>₹${item.price}</h2>
            <span>${item.condition}</span>
          </div>

          <a href="item-details.html?id=${item.id}" class="view-btn">View Details</a>
        </div>
      </div>
    `).join("");
  }
}
const postItemForm = document.getElementById("postItemForm");

if (postItemForm) {
  postItemForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      alert("Please login first");
      window.location.href = "login.html";
      return;
    }

    const item = {
      id: Date.now(),
      name: postItemForm.itemName.value,
      price: postItemForm.price.value,
      condition: postItemForm.condition.value,
      category: postItemForm.category.value,
      college: postItemForm.college.value,
      pickup: postItemForm.pickup.value,
      image: postItemForm.image.value,
      description: postItemForm.description.value,
      sellerName: user.name,
      sellerEmail: user.email,
      status: "Available"
      
    };

    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(item);

    localStorage.setItem("items", JSON.stringify(items));

    alert("Item posted successfully");
    window.location.href = "index.html";
  });
}
function getDemoItem() {
  return {
    id: 101,
    name: "Arduino Starter Kit",
    price: 850,
    category: "Electronics",
    college: "MVJ College of Engineering",
    condition: "Good"
  };
}

function addToWishlist() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const item = getDemoItem();

  if (!wishlist.find(i => i.id === item.id)) {
    wishlist.push(item);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist");
  } else {
    alert("Already in Wishlist");
  }
}

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = getDemoItem();

  if (!cart.find(i => i.id === item.id)) {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart");
  } else {
    alert("Already in Cart");
  }
}
function buyNow() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const order = {
    id: Date.now(),
    itemName: "Arduino Starter Kit",
    price: 850,
    buyerName: user.name,
    buyerEmail: user.email,
    status: "Requested"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Buy request sent to seller!");
  window.location.href = "orders.html";
}
const ordersList = document.getElementById("ordersList");

if (ordersList) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    ordersList.innerHTML = `
      <div class="empty-box">
        <h2>No orders yet</h2>
        <p>Your purchase requests will appear here.</p>
        <a href="index.html" class="auth-btn">Start Shopping</a>
      </div>
    `;
  } else {
    ordersList.innerHTML = orders.map(order => `
      <div class="request-card">
        <div>
          <h2>${order.itemName}</h2>
          <p>Price: ₹${order.price}</p>
          <p>Buyer: ${order.buyerName}</p>
          <p>Status: ${order.status}</p>
        </div>
      </div>
    `).join("");
  }
}
const sellerOrders = document.getElementById("sellerOrders");

if (sellerOrders) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    sellerOrders.innerHTML = `
      <div class="empty-box">
        <h2>No buy requests yet</h2>
        <p>Buyer requests will appear here.</p>
        <a href="post-item.html" class="auth-btn">Sell an Item</a>
      </div>
    `;
  } else {
    sellerOrders.innerHTML = orders.map(order => `
      <div class="request-card">
        <div>
          <h2>${order.itemName}</h2>
          <p>Price: ₹${order.price}</p>
          <p>Buyer: ${order.buyerName}</p>
          <p>Status: ${order.status}</p>
        </div>

        <div class="request-actions">
          <button class="accept-btn" onclick="updateOrder(${order.id}, 'Accepted')">
  ✅ Accept
</button>

<button class="reject-btn" onclick="updateOrder(${order.id}, 'Rejected')">
  ❌ Reject
</button> 
        </div>
      </div>
    `).join("");
  }
}

function updateOrder(id, status) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(order => {
    if (order.id === id) {
      order.status = status;
    }
    return order;
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order " + status);
  location.reload();
}
const wishlistList = document.getElementById("wishlistList");

if (wishlistList) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    wishlistList.innerHTML = `
      <div class="empty-box">
        <h2>No saved items yet</h2>
        <p>Tap the heart icon on products to save them here.</p>
        <a href="index.html" class="auth-btn">Browse Items</a>
      </div>
    `;
  } else {
    wishlistList.innerHTML = wishlist.map(item => `
      <div class="request-card">
        <div>
          <h2>${item.name}</h2>
          <p>Price: ₹${item.price}</p>
          <p>${item.category} • ${item.college}</p>
          <p>Condition: ${item.condition}</p>
        </div>
      </div>
    `).join("");
  }
}
const cartList = document.getElementById("cartList");

if (cartList) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="empty-box">
        <h2>Your cart is empty</h2>
        <p>Explore UniMart and add items you like.</p>
        <a href="index.html" class="auth-btn">Explore Items</a>
      </div>
    `;
  } else {
    let total = 0;

    cartList.innerHTML = cart.map(item => {
      total += Number(item.price);

      return `
        <div class="request-card">
          <div>
            <h2>${item.name}</h2>
            <p>Price: ₹${item.price}</p>
            <p>${item.category} • ${item.college}</p>
            <p>Condition: ${item.condition}</p>
          </div>
        </div>
      `;
    }).join("") + `
      <div class="empty-box">
        <h2>Total: ₹${total}</h2>
        <a href="orders.html" class="auth-btn">Proceed</a>
      </div>
    `;
  }
}



function renderHomeItems(list) {
  if (!itemsGrid) return;

  itemsGrid.innerHTML = list.map(item => `
    <div class="item-card">
      <div class="image-box electronics">
        ${item.image ? `<img src="${item.image}" class="item-img">` : "📦"}
      </div>

      <div class="item-info">
        <h3>${item.name}</h3>
        <p>${item.category} • ${item.college}</p>

        <div class="price-row">
          <h2>₹${item.price}</h2>
          <span>${item.condition}</span>
        </div>

        <a href="item-details.html?id=${item.id}" class="view-btn">View Details</a>
      </div>
    </div>
  `).join("");
}

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function applyFilters() {
  const items = JSON.parse(localStorage.getItem("items")) || [];

  const searchText = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedCategory = categoryFilter ? categoryFilter.value : "All";

  const filtered = items.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText) ||
      item.college.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderHomeItems(filtered);
}

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", applyFilters);
}

const detailsPage = document.querySelector(".details-page");

if (detailsPage) {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const items = JSON.parse(localStorage.getItem("items")) || [];
  const item = items.find(i => i.id === id);

  if (item) {
    document.querySelector(".details-image").innerHTML = `
      ${item.image ? `<img src="${item.image}" class="item-img">` : "📦"}
      <span class="status-badge">🟢 ${item.status || "Available"}</span>
    `;

    document.querySelector(".details-info h1").innerText = item.name;
    document.querySelector(".details-price").innerText = "₹" + item.price;
    document.querySelector(".muted").innerText = item.category + " • " + item.college;
    document.querySelector(".description").innerText = item.description;
  }
  else {
  const name = params.get("name");
  const price = params.get("price");
  const category = params.get("category");
  const college = params.get("college");
  const condition = params.get("condition");
  const desc = params.get("desc");

  if (name) {
    document.querySelector(".details-info h1").innerText = name;
    document.querySelector(".details-price").innerText = "₹" + price;
    document.querySelector(".muted").innerText = category + " • " + college;
    document.querySelector(".description").innerText = desc;
  }
}
}
function updateItemStatus(id, status) {
  let items = JSON.parse(localStorage.getItem("items")) || [];

  items = items.map(item => {
    if (item.id === id) {
      item.status = status;
    }
    return item;
  });

  localStorage.setItem("items", JSON.stringify(items));

  alert("Item marked as " + status);
  location.reload();
}
const sellerListings = document.getElementById("sellerListings");

if (sellerListings) {

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

  const items =
    JSON.parse(localStorage.getItem("items")) || [];

  const myItems = items.filter(
    item => item.sellerEmail === currentUser.email
  );

  if (myItems.length === 0) {

    sellerListings.innerHTML = `
      <div class="empty-box">
        <h2>No Listings Yet</h2>
      </div>
    `;

  } else {

    sellerListings.innerHTML = myItems.map(item => `
      <div class="request-card">

        <div>
          <h2>${item.name}</h2>
          <p>₹${item.price}</p>
          <p>${item.category}</p>
          <p>Status: ${item.status || "Available"}</p>

          <button class="accept-btn"
          onclick="updateItemStatus(${item.id}, 'Sold')">
          🔴 Mark Sold
          </button>

          <button class="reject-btn"
          onclick="updateItemStatus(${item.id}, 'Reserved')">
          🟡 Mark Reserved
          </button>

        </div>

      </div>
    `).join("");

  }
}