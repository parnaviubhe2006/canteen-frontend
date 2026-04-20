// Apply theme on page load
(function () {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  }
})();

// Toggle theme
function toggleDarkMode() {
  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }

  updateThemeButton();
}

// Update button text (safe)
function updateThemeButton() {
  const btn = document.getElementById("themeBtn");

  if (!btn) return;

  if (document.body.classList.contains("dark-mode")) {
    btn.innerText = "Change to Light Mode ⛅";
  } else {
    btn.innerText = "Change to Dark Mode 🌙";
  }
}