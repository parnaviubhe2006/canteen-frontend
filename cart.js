function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;
  let itemCount = 0;

  const summaryBox = document.getElementById("summaryItems");

  summaryBox.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    // summary only (clean separation)
    summaryBox.innerHTML += `
      <div class="flex justify-between">
        <span>${item.name}</span>
        <span>x ${item.quantity}</span>
      </div>
    `;
  });

  document.getElementById("totalPrice").innerText = total;
  document.getElementById("totalItems").innerText = itemCount;

  renderCartItems(cart);
}


function renderCartItems(cart) {
  const container = document.getElementById("cartContainer");
  container.innerHTML = "";

  cart.forEach(item => {
    container.innerHTML += `
      <div class="bg-white w-72 h-48 rounded-2xl shadow-md p-4 flex flex-col justify-between">

        <div>
          <h3 class="text-lg font-bold">${item.name}</h3>
          <p class="text-gray-500">₹${item.price}</p>
        </div>

        <div class="flex items-center justify-between">

          <div class="flex items-center gap-2">
            <button onclick="decreaseQty(${item.id})"
              class="px-2 bg-gray-200 rounded">-</button>

            <span>${item.quantity}</span>

            <button onclick="increaseQty(${item.id})"
              class="px-2 bg-gray-200 rounded">+</button>
          </div>

          <button onclick="removeItem(${item.id})"
            class="text-red-500 text-sm">
            Cancel
          </button>

        </div>
      </div>
    `;
  });
}


function increaseQty(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find(i => i.id === id);
  item.quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
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
  loadCart();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(i => i.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function goBack() {
  window.location.href = "dashboard.html";
}



function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (!sidebar || !overlay) return; // safety check

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

function goToCart() {
  window.location.href = "cart.html";
}

function goFavorites() {
  window.location.href = "favorites.html";
}

function placeOrder() {
  window.location.href = "payment.html";
}

loadCart();