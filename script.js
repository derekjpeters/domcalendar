// Selecting DOM elements
const calendarDaysContainer = document.getElementById("calendar-days");
const monthYearDisplay = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const changeColorsBtn = document.getElementById("change-colors-btn");

// Initialize the current date
let currentDate = new Date();

// Function to render the calendar with animation direction
function renderCalendar(direction = "fade-in") {
    // Clear previous calendar days with animation
    calendarDaysContainer.className = `animate-${direction}`; // Apply animation based on direction
    calendarDaysContainer.innerHTML = ""; // Clear all previous days

    // Set month and year display
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    monthYearDisplay.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

    // Calculate the first day of the month and the number of days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty slots before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("calendar-day");
        calendarDaysContainer.appendChild(emptyDiv);
    }

    // Add the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day");
        dayDiv.textContent = day;
        calendarDaysContainer.appendChild(dayDiv);
    }
}

// Function to generate a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to apply random colors to each day
function changeColors() {
    const days = document.querySelectorAll(".calendar-day");
    days.forEach(day => {
        if (day.textContent) { // Apply color only to days with a date
            const randomColor = getRandomColor();
            day.style.backgroundColor = randomColor;
            day.style.color = "#fff";
            console.log(`Day ${day.textContent}: ${randomColor}`); // Log the random color for debugging
        }
    });
}

// Event listeners for navigating months
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar("slide-left");
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar("slide-right");
});

// Event listener for changing colors
changeColorsBtn.addEventListener("click", changeColors);

// Initial render
renderCalendar();

