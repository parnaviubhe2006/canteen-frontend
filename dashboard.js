// ================= GLOBAL =================
let allMenuItems = [];

// ================= LOAD MENU =================
async function loadMenu() {
  try {
    const res = await fetch("http://127.0.0.1:5000/menu");
    const data = await res.json();

    if (data.success) {
      allMenuItems = data.data;
      renderMenu(allMenuItems);
    } else {
      document.getElementById("menuContainer").innerHTML =
        "Failed to load menu";
    }
  } catch (err) {
    console.error(err);
  }
}

// ================= RENDER MENU =================
function renderMenu(items) {
  const container = document.getElementById("menuContainer");
  container.innerHTML = "";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const grouped = {};

  items.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });

  for (let category in grouped) {
    container.innerHTML += `
      <h2 class="col-span-full text-xl font-bold mt-6 underline gradient-text text-center tracking-widest uppercase">
        ${category}
      </h2>
    `;

    grouped[category].forEach(item => {
      const cartItem = cart.find(i => i.id === item.id);

container.innerHTML += `
  <div class="bg-white w-72 h-48 rounded-2xl shadow-md p-4 hover:shadow-xl transition flex flex-col justify-between relative">
    
    <!-- ❤️ HEART BUTTON -->
<div onclick="toggleFavorite(${item.id}, '${item.name}', ${item.price})"
  class="absolute top-3 right-3 text-xl cursor-pointer
         ${isFavorite(item.id) ? 'text-red-500' : 'text-gray-400'}">
  ${isFavorite(item.id) ? "♥" : "♡"}
</div>

    <h3 class="text-lg font-bold mb-2">${item.name}</h3>
    <p class="text-gray-600 mb-2">${item.description || ""}</p>
    <p class="font-semibold mb-3">₹${item.price}</p>

    <div id="cart-${item.id}">
      ${
        cartItem
          ? `
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button onclick="decreaseQty(${item.id})" class="px-2 bg-gray-200 rounded">-</button>
              <span>${cartItem.quantity}</span>
              <button onclick="increaseQty(${item.id})" class="px-2 bg-gray-200 rounded">+</button>
            </div>

            <button onclick="removeItem(${item.id})" class="text-red-500 text-sm">
              Cancel
            </button>
          </div>
          `
          : `
          <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})"
            class="w-full py-2 rounded-lg text-white font-semibold
                   bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
            Add to Cart 🛒
          </button>
          `
      }
    </div>

  </div>
`;
    });
  }
}

// ================= SEARCH =================
function filterMenu() {
  const search = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filtered = allMenuItems.filter(item =>
    item.name.toLowerCase().includes(search)
  );

  renderMenu(filtered);
}

// ================= CART =================
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCartControls(id);
  updateCartCount();
}

function renderCartControls(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find(i => i.id === id);

  const container = document.getElementById(`cart-${id}`);
  if (!item || !container) return;

  container.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <button onclick="decreaseQty(${id})" class="px-2 bg-gray-200 rounded">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQty(${id})" class="px-2 bg-gray-200 rounded">+</button>
      </div>

      <button onclick="removeItem(${id})" class="text-red-500 text-sm">
        Cancel
      </button>
    </div>
  `;
}

function increaseQty(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find(i => i.id === id);

  if (!item) return;

  item.quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartControls(id);
  updateCartCount();
}

function decreaseQty(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find(i => i.id === id);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeItem(id);
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartControls(id);
  updateCartCount();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  const container = document.getElementById(`cart-${id}`);

  if (container) {
    const item = allMenuItems.find(i => i.id === id);

    container.innerHTML = `
      <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})"
        class="w-full py-2 rounded-lg text-white font-semibold
               bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
        Add to Cart 🛒
      </button>
    `;
  }
}

// ================= CART COUNT =================
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const badge = document.getElementById("cartCount");

  if (badge) {
    badge.innerText = total;
  }
}

// ================= NAVIGATION =================
function goToCart() {
  window.location.href = "cart.html";
}

function logout() {
  localStorage.removeItem("user"); // ✅ FIXED
  window.location.href = "login.html";
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (sidebar.style.width === "300px") {
    sidebar.style.width = "0";
    overlay.classList.add("hidden");
  } else {
    sidebar.style.width = "300px";
    overlay.classList.remove("hidden");
  }
}

// ================= FAVORITES =================

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function isFavorite(id) {
  let fav = getFavorites();
  return fav.some(item => item.id === id);
}

function toggleFavorite(id, name, price) {
  let fav = getFavorites();

  const index = fav.findIndex(item => item.id === id);

  if (index > -1) {
    // remove
    fav.splice(index, 1);
  } else {
    // add
    fav.push({ id, name, price });
  }

  localStorage.setItem("favorites", JSON.stringify(fav));

  renderMenu(allMenuItems); // 🔥 refresh UI
}

function goDashboard() {
  window.location.href = "dashboard.html";
}

function goOrders() {
  window.location.href = "orders.html";
}

function goProfile() {
  window.location.href = "profile.html";
}

function goFavorites() {
  window.location.href = "favorites.html";
}

function goSettings() {
  window.location.href = "settings.html";
}

// ================= INIT =================
loadMenu();
updateCartCount();