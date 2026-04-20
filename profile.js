function loadProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userName").innerText = user.name;
  document.getElementById("userEmail").innerText = user.email;
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

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const badge = document.getElementById("cartCount");

  if (badge) {
    badge.innerText = total;
  }
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

function goBack() {
  window.location.href = "dashboard.html";
}

function goFavorites() {
  window.location.href = "favorites.html";
}

function goToCart() {
  window.location.href = "cart.html";
}

function goToSettings() {
  window.location.href = "settings.html";
}

// INIT
loadProfile();
updateCartCount();