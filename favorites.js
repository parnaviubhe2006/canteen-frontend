// ================= GET FAVORITES =================
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// ================= RENDER =================
function loadFavorites() {
  const fav = getFavorites();
  renderFavorites(fav);
}

function renderFavorites(items) {
  const container = document.getElementById("favContainer");
  container.innerHTML = "";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (items.length === 0) {
    container.innerHTML = "<p>No favorites yet ❤️</p>";
    return;
  }

  items.forEach(item => {
    const cartItem = cart.find(i => i.id === item.id);

    container.innerHTML += `
      <div class="bg-white w-72 h-48 rounded-2xl shadow-md p-4 relative flex flex-col justify-between">

        <!-- ❤️ HEART -->
        <div onclick="toggleFavorite(${item.id})"
          class="absolute top-3 right-3 text-xl cursor-pointer text-red-500">
          ♥
        </div>

        <h3 class="text-lg font-bold">${item.name}</h3>
        <p class="font-semibold">₹${item.price}</p>

        <div id="cart-${item.id}">
          ${
            cartItem
              ? `
              <div class="flex items-center justify-between">
                <div class="flex gap-2">
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

// ================= FAVORITE TOGGLE =================
function toggleFavorite(id) {
  let fav = getFavorites();

  fav = fav.filter(item => item.id !== id);

  localStorage.setItem("favorites", JSON.stringify(fav));

  loadFavorites(); // refresh
}

// ================= SEARCH =================
function filterFavorites() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  const filtered = getFavorites().filter(item =>
    item.name.toLowerCase().includes(search)
  );

  renderFavorites(filtered);
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
  loadFavorites();
  updateCartCount();
}

function increaseQty(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find(i => i.id === id);

  item.quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));

  loadFavorites();
  updateCartCount();
}

function decreaseQty(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find(i => i.id === id);

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter(i => i.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadFavorites();
  updateCartCount();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(i => i.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadFavorites();
  updateCartCount();
}


// ================= SIDEBAR =================
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

// ================= CART COUNT =================
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const badge = document.getElementById("cartCount");
  if (badge) badge.innerText = total;
}


// ================= NAV =================
function goToCart() {
  window.location.href = "cart.html";
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

function goToSettings() {
  window.location.href = "settings.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}




// ================= INIT =================
loadFavorites();
updateCartCount();