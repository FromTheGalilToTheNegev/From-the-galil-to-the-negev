document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  })
  .catch(err => console.error("Error loading navbar:", err));
});