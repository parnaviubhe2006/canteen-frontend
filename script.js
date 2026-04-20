// Run ONLY on index.html
if (
  window.location.pathname.includes("index.html") ||
  window.location.pathname === "/"
) {
  setTimeout(() => {
    window.location.href = "login.html";
  }, 3500);
}

// ================= REGISTER =================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();

    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // store user
        localStorage.setItem("user", JSON.stringify(data.user));

        // 🔥 DIRECT REDIRECT (no alert)
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Registration failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // store user
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Invalid email or password ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });
}