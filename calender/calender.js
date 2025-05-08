// scripts.js

let selectedDay = null;

// פותח את חלונית הוספת האירועים
function openPopup(day) {
    selectedDay = day;
    document.getElementById("addEventPopup").style.display = "flex";
}

// סוגר את חלונית הוספת האירועים
function closePopup() {
    document.getElementById("addEventPopup").style.display = "none";
}

// מוסיף את האירוע ליום שנבחר
function addEvent() {
    const eventTitle = document.getElementById("eventTitle").value;
    const eventDescription = document.getElementById("eventDescription").value;
    if (eventTitle.trim() === "") {
        alert("יש להזין כותרת לאירוע.");
        return;
    }

    const dayElement = document.querySelector(`.day[data-day="${selectedDay}"] .day-events`);
    const eventHtml = `<strong>${eventTitle}</strong><br>${eventDescription}`;
    dayElement.innerHTML += `<div>${eventHtml}</div>`;
    closePopup();
}

// הצגת חלונית הוספת אירועים כאשר לוחצים על יום
const days = document.querySelectorAll('.day');
days.forEach(day => {
    day.addEventListener('click', () => {
        const dayNumber = day.getAttribute('data-day');
        openPopup(dayNumber);
    });
});
