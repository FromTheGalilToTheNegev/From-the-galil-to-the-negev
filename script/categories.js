const businesses = [
  {
    name: "מכולת הגליל",
    location: "נהריה",
    phone: "050-1234567",
    summary: "מכולת שכונתית עם שירות מהיר ואישי",
    category: "food"
  },
  {
    name: "מאפיית השמש",
    location: "עכו",
    phone: "04-7654321",
    summary: "מאפייה מקומית עם מאפים טריים יום יום",
    category: "food"
  },
  {
    name: "אירועי הצפון",
    location: "כרמיאל",
    phone: "050-9998888",
    summary: "הפקת אירועים מקומיים",
    category: "events"
  },
  {
    name: "אופנת יעל",
    location: "עכו",
    phone: "052-3334444",
    summary: "חנות בגדים בעיצוב אישי",
    category: "fashion"
  },
  {
    name: "אטרקציות פלוס",
    location: "נהריה",
    phone: "050-0000000",
    summary: "טיולים וסיורים בצפון",
    category: "attractions"
  },
  {
    name: "CSS עיצובים",
    location: "תל אביב",
    phone: "050-9876543",
    summary: "שירותי עיצוב אתרים עם CSS מודרני ורספונסיבי",
    category: "css"
  }
];

const פקודות = [
  "הזמנה / עסקה",
  "שעות פתיחה / מתי פתוח",
  "כתובת",
  "איפוס צ'אט / איפוס"
];

function displayCommands() {
  const oldBox = document.querySelector(".commands-box");
  if (oldBox) oldBox.remove();
  const commandBox = document.createElement("div");
  commandBox.className = "commands-box";
  commandBox.innerHTML = `<h4>אפשר לשאול אותי:</h4><ul>${פקודות.map(cmd => `<li>${cmd}</li>`).join('')}</ul>`;
  document.getElementById("chatBox").appendChild(commandBox);
}

const businessList = document.getElementById("businessList");

function renderBusinesses(category = "all") {
  businessList.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  businesses.forEach(b => {
    const isFavorite = favorites.includes(b.name);
    if ((category === "favorites" && !isFavorite) ||
        (category !== "all" && category !== "favorites" && b.category !== category)) {
      return;
    }
    const div = document.createElement("div");
    div.className = "business animate";
    div.innerHTML = `
      <h3>${b.name}</h3>
      <p><strong>מיקום:</strong> ${b.location}</p>
      <p><strong>טלפון:</strong> ${b.phone}</p>
      <p>${b.summary}</p>
      <button class="favorite-btn" onclick="toggleFavorite('${b.name}', this)">
        ${isFavorite ? "הסר ממועדפים" : "הוסף למועדפים"}
      </button>
      <button class="chat-btn" onclick="openChat('${b.name}')">צ'אט בוט 🤖</button>
    `;
    businessList.appendChild(div);
  });
}

function toggleFavorite(name, button) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.includes(name)) {
    favorites = favorites.filter(f => f !== name);
    button.textContent = "הוסף למועדפים";
  } else {
    favorites.push(name);
    button.textContent = "הסר ממועדפים";
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

renderBusinesses();

document.getElementById("openCategories").addEventListener("click", () => {
  const sidebar = document.getElementById("categorySidebar");
  const openBtn = document.getElementById("openCategories");
  sidebar.classList.remove("hidden");
  sidebar.classList.add("show");
  openBtn.style.visibility = "hidden";
});

document.getElementById("closeSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("categorySidebar");
  const openBtn = document.getElementById("openCategories");
  sidebar.classList.remove("show");
  sidebar.classList.add("hidden");
  openBtn.style.visibility = "visible";
});

document.querySelectorAll("#categorySidebar li").forEach(item => {
  item.addEventListener("click", () => {
    const selectedCategory = item.getAttribute("data-category");
    renderBusinesses(selectedCategory);
    const sidebar = document.getElementById("categorySidebar");
    sidebar.classList.remove("show");
    sidebar.classList.add("hidden");
    document.getElementById("openCategories").style.visibility = "visible";
  });
});

document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("categorySidebar");
  const openBtn = document.getElementById("openCategories");
  if (sidebar.classList.contains("show") &&
      !sidebar.contains(event.target) &&
      !openBtn.contains(event.target)) {
    sidebar.classList.remove("show");
    sidebar.classList.add("hidden");
    openBtn.style.visibility = "visible";
  }
});

let awaitingTransactionChoice = false;
let currentBusinessName = "";

function openChat(businessName) {
  currentBusinessName = businessName;
  document.getElementById("chatBox").classList.remove("hidden");
  document.querySelector(".chat-header span").textContent = "עוזר אישי דיגיטלי 🤖";
  addChatMessage(`שלום! אני העוזר האישי שלך. איך אפשר לעזור?`, false);
  displayCommands();
}

document.getElementById("chatSendBtn").addEventListener("click", sendChat);

document.getElementById("chatInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendChat();
});

document.getElementById("closeChat").addEventListener("click", function() {
  document.getElementById("chatBox").classList.add("hidden");
});

function sendChat() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  addChatMessage(text, true);
  input.value = "";
  setTimeout(() => handleBotResponse(text), 500);
}

function addChatMessage(text, isUser) {
  const msg = document.createElement("div");
  msg.className = "msg" + (isUser ? " user" : "");
  msg.innerText = text;
  document.getElementById("chatMessages").appendChild(msg);
  document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
}

function handleBotResponse(text) {
  const lower = text.toLowerCase();

  if (lower.includes("איפוס צ'אט") || lower.includes("איפוס")) {
    document.getElementById("chatMessages").innerHTML = "";
    addChatMessage("הצ'אט אופס. אפשר להתחיל מחדש 😊", false);
    awaitingTransactionChoice = false;
    displayCommands();
    return;
  }

  if (awaitingTransactionChoice) {
    awaitingTransactionChoice = false;
    if (text === "1") {
      addChatMessage("ההזמנה שלך מוכנה לאיסוף 🌟", false);
    } else if (text === "2") {
      addChatMessage("ההזמנה בוטלה בהצלחה. נתראה בפעם הבאה!", false);
    } else if (text === "3") {
      addChatMessage("אנא כתוב את הפרטים שברצונך לשנות.", false);
    } else {
      addChatMessage("אנא בחר 1, 2 או 3 בלבד.", false);
      awaitingTransactionChoice = true;
    }
    return;
  }

  if (lower.includes("הזמנה") || lower.includes("עסקה")) {
    awaitingTransactionChoice = true;
    addChatMessage("מה תרצה לעשות?\n1. לבדוק סטטוס הזמנה\n2. לבטל הזמנה\n3. לשנות פרטים", false);
  } else if (lower.includes("שעות") || lower.includes("פתוח")) {
    addChatMessage("פתוחים כל יום מ-6:00 עד 21:00 כולל שישי!", false);
  } else if (lower.includes("כתובת")) {
    addChatMessage("אנחנו נמצאים ברחוב העצמאות 12, עכו 🌞", false);
  } else {
    addChatMessage("מצטער, לא הבנתי. תוכל לשאול על הזמנה, שעות פתיחה או כתובת.", false);
    displayCommands();
  }
}
