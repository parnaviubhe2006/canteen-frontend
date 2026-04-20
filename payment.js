function loadAmount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = cart.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  );

  document.getElementById("finalAmount").innerText = total;
}

function confirmPayment() {
  // Save order flag
  localStorage.setItem("orderPlaced", "true");

  // Clear cart
  localStorage.removeItem("cart");

  // Redirect
  window.location.href = "order-success.html";
}

loadAmount();