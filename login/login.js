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
