function toggleForms(formType) {
  // הסתרת כל הטפסים
  document.getElementById("login-container").style.display = "none";
  document.getElementById("register-container").style.display = "none";
  document.getElementById("business-register-container").style.display = "none";

  // הצגת הטופס המתאים
  if (formType === "register") {
    document.getElementById("register-container").style.display = "block";
  } else if (formType === "business") {
    document.getElementById("business-register-container").style.display = "block";
  } else {
    document.getElementById("login-container").style.display = "block";
  }
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  localStorage.setItem("username", username);
  window.location.href = "../index/index.html";
});

document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  localStorage.setItem("username", username);
  window.location.href = "../index/index.html";
});

document.getElementById("business-register-form").addEventListener("submit", function (e) {
  e.preventDefault();
});

function goHome() {
  window.location.href = "../index/index.html";
}

document.getElementById("business-register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const businessName = document.getElementById("business-name").value;
  localStorage.setItem("businessName", businessName);
  window.location.href = "../index/index.html"; // הפניית המשתמש לדף הבית לאחר הרשמה
});


let currentImage = 0;
const images = [
  "https://i.imgur.com/KwlU7hC.jpeg",
  "https://images.pexels.com/photos/1645668/pexels-photo-1645668.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600"
];

function changeImage() {
  currentImage = (currentImage + 1) % images.length;
  const imageElement = document.getElementById("business-image");
  imageElement.classList.remove("fade-in");
  imageElement.src = images[currentImage];
  imageElement.classList.add("fade-in");
}

setInterval(changeImage, 7000);