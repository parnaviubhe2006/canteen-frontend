function goBack() {
  window.location.href = "dashboard.html";
}

function goToCart() {
  window.location.href = "cart.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Load user data
function loadUser() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) return;

  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
}

// Update profile
async function updateProfile() {
  let user = JSON.parse(localStorage.getItem("user"));

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://127.0.0.1:5000/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: user.id,
        name,
        email,
        password
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Profile Updated ✅");

      // update local storage
      localStorage.setItem("user", JSON.stringify({
        ...user,
        name,
        email
      }));

    } else {
      alert("Update failed ❌");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}

// cart count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById("cartCount").innerText = total;
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


function showSection(section) {
  document.getElementById("profileSection").classList.add("hidden");
  document.getElementById("themeSection").classList.add("hidden");

  if (section === "profile") {
    document.getElementById("profileSection").classList.remove("hidden");
  } else if (section === "theme") {
    document.getElementById("themeSection").classList.remove("hidden");
  }
}



function toggleDarkMode() {
  let currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }

  applyTheme(); // apply instantly
}

function applyTheme() {
  let theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  // ✅ Only update button if it exists
  const btn = document.getElementById("themeBtn");
  if (btn) {
    btn.innerText =
      theme === "dark"
        ? "Change to Light Mode ⛅"
        : "Change to Dark Mode 🌙";
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

function goToSettings() {
  window.location.href = "settings.html";
}

// INIT
loadUser();
updateCartCount();
applyTheme();