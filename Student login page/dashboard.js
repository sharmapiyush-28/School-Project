// Function to generate a future date/time for homework deadlines
const generateFutureDate = (daysAhead, hours, minutes) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
    futureDate.setHours(hours, minutes, 0, 0); // Set specific time for due date
    return futureDate.getTime(); // Return as timestamp
};

// Global array to store all homework assignments
const allHomework = [
    {
        id: 'math-alg',
        subject: "Math",
        topic: "Algebra - Solving Equations",
        assignment: "Complete exercises 5-10 from Chapter 3 of the textbook.",
        instructions: "Show all your work clearly. Submit as a PDF via online portal.",
        dueDate: generateFutureDate(0, 23, 59), // Due today at 11:59 PM
        icon: 'fas fa-calculator',
        completed: false
    },
    {
        id: 'science-chem',
        subject: "Science",
        topic: "Chemistry - Periodic Table",
        assignment: "Research and write a short report on the properties of Group 17 elements.",
        instructions: "Minimum 500 words. Include a diagram of the periodic table with highlights. Due by end of day.",
        dueDate: generateFutureDate(0, 18, 0), // Due today at 6:00 PM
        icon: 'fas fa-flask',
        completed: false
    },
    {
        id: 'english-essay',
        subject: "English",
        topic: "Literary Analysis",
        assignment: "Write a 3-paragraph essay analyzing symbolism in 'The Raven'.",
        instructions: "Focus on one specific symbol. Use proper MLA citation. Due end of day.",
        dueDate: generateFutureDate(0, 22, 0), // Due today at 10:00 PM
        icon: 'fas fa-pen-nib',
        completed: false
    },
    {
        id: 'history-ww2',
        subject: "History",
        topic: "World War II",
        assignment: "Prepare a presentation on the impact of WWII on global politics.",
        instructions: "Minimum 5 slides, include sources. Due tomorrow.",
        dueDate: generateFutureDate(1, 10, 0), // Due tomorrow at 10:00 AM
        icon: 'fas fa-landmark',
        completed: false
    },
    {
        id: 'cs-python',
        subject: "Computer Science",
        topic: "Python Basics",
        assignment: "Code a simple calculator program in Python.",
        instructions: "Include addition, subtraction, multiplication, and division. Error handling for division by zero required. Due in 2 days.",
        dueDate: generateFutureDate(2, 17, 0), // Due in 2 days at 5:00 PM
        icon: 'fas fa-laptop-code',
        completed: false
    },
    {
        id: 'art-sketch',
        subject: "Art",
        topic: "Still Life Drawing",
        assignment: "Draw a still life of fruits in your kitchen.",
        instructions: "Use pencil shading. Take a photo of your drawing and upload it. Due in 3 days.",
        dueDate: generateFutureDate(3, 23, 59), // Due in 3 days at 11:59 PM
        icon: 'fas fa-palette',
        completed: false
    }
];

let currentFilteredHomework = []; // Stores homework for the currently selected subject
let homeworkCountdownInterval; // To store the interval for the homework countdown

function initializeHomeworkDisplay() {
  filterHomework(); // Show all homework initially
}

function filterHomework() {
  const now = new Date().getTime();

  currentFilteredHomework = allHomework.filter(hw => hw.dueDate > now)
                                        .sort((a, b) => {
                                            if (a.completed && !b.completed) return 1;
                                            if (!a.completed && b.completed) return -1;
                                            return a.dueDate - b.dueDate;
                                        });

  updateHomeworkFeatureCard();
}

function updateHomeworkFeatureCard() {
  const homeworkFeatureCard = document.getElementById('homeworkFeatureCard');
  const homeworkCountdownElement = document.getElementById('homeworkCountdown');
  const homeworkFeatureCardButton = homeworkFeatureCard.querySelector('button');

  if (currentFilteredHomework.length > 0) {
    const nextHomework = currentFilteredHomework.find(hw => !hw.completed) || currentFilteredHomework[0];
    homeworkFeatureCard.style.display = 'flex';
    homeworkFeatureCardButton.textContent = "View Details";

    homeworkFeatureCard.querySelector('h3').innerHTML = `<i class="${nextHomework.icon}"></i> ${nextHomework.subject} Homework`;

    startHomeworkCountdownForCard(nextHomework);

  } else {
    homeworkFeatureCard.style.display = 'none';
    homeworkCountdownElement.textContent = "No active homework today!";
    if (homeworkCountdownInterval) {
        clearInterval(homeworkCountdownInterval);
    }
  }
}

function startHomeworkCountdownForCard(homeworkItem) {
  const homeworkCountdownElement = document.getElementById('homeworkCountdown');

  if (homeworkCountdownInterval) {
    clearInterval(homeworkCountdownInterval);
  }

  homeworkCountdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = homeworkItem.dueDate - now;

    if (distance < 0) {
      clearInterval(homeworkCountdownInterval);
      homeworkCountdownElement.textContent = "Homework expired!";
      filterHomework();
      return;
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownText = `Due in: ${hours}h ${minutes}m ${seconds}s`;
    homeworkCountdownElement.textContent = countdownText;

  }, 1000);
}


function showHomeworkDetails() {
  const modal = document.getElementById('homeworkModal');
  const modalHomeworkTitle = document.getElementById('modalHomeworkTitle');
  const homeworkDetailsListDiv = document.getElementById('homeworkDetailsList');
  const modalCountdownElement = document.getElementById('modalCountdown');

  homeworkDetailsListDiv.innerHTML = '';

  if (currentFilteredHomework.length === 0) {
    modalHomeworkTitle.textContent = "No Active Homework";
    homeworkDetailsListDiv.innerHTML = '<p class="no-homework-message">There is no active homework right now.</p>';
    modalCountdownElement.textContent = '';
    if (homeworkCountdownInterval) {
        clearInterval(homeworkCountdownInterval);
    }
  } else {
    modalHomeworkTitle.textContent = "All Active Homework";

    currentFilteredHomework.forEach(hw => {
      const homeworkItemDiv = document.createElement('div');
      homeworkItemDiv.classList.add('homework-item-in-modal');
      if (hw.completed) {
          homeworkItemDiv.classList.add('completed');
      }
      homeworkItemDiv.dataset.homeworkId = hw.id;

      const formattedDueDate = new Date(hw.dueDate).toLocaleString('en-IN', {
          day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true,
          timeZoneName: 'short'
      });

      homeworkItemDiv.innerHTML = `
        <h3><i class="${hw.icon || 'fas fa-book'}"></i> ${hw.subject} - ${hw.topic}</h3>
        <p><strong>Assignment:</strong> ${hw.assignment}</p>
        <p><strong>Due Date:</strong> ${formattedDueDate}</p>
        <div class="instructions-block">
            <strong>Instructions:</strong> ${hw.instructions}
        </div>
        <div class="homework-actions">
            ${hw.completed ?
                '<span class="completed-message"><i class="fas fa-check-circle"></i> Completed!</span>' :
                `
                <button class="mark-complete" onclick="markHomeworkComplete('${hw.id}')"><i class="fas fa-check"></i> Mark Complete</button>
                <button class="add-reminder" onclick="addReminder('${hw.id}')"><i class="fas fa-bell"></i> Add Reminder</button>
                <button class="download-assignment" onclick="downloadAssignment('${hw.id}')"><i class="fas fa-download"></i> Download</button>
                `
            }
        </div>
      `;
      homeworkDetailsListDiv.appendChild(homeworkItemDiv);
    });

    const soonestIncomplete = currentFilteredHomework.find(hw => !hw.completed);
    if (soonestIncomplete) {
        startHomeworkCountdownForModal(soonestIncomplete);
    } else {
        modalCountdownElement.textContent = "All active homework completed!";
        if (homeworkCountdownInterval) {
            clearInterval(homeworkCountdownInterval);
        }
    }
  }

  modal.style.display = 'block';
}

function startHomeworkCountdownForModal(homeworkItem) {
  const modalCountdownElement = document.getElementById('modalCountdown');

  if (homeworkCountdownInterval) {
    clearInterval(homeworkCountdownInterval);
  }

  homeworkCountdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = homeworkItem.dueDate - now;

    if (distance < 0) {
      clearInterval(homeworkCountdownInterval);
      modalCountdownElement.textContent = "Homework expired!";
      const expiredHw = allHomework.find(hw => hw.id === homeworkItem.id);
      if (expiredHw) {
          expiredHw.completed = true;
      }
      filterHomework();
      if (document.getElementById('homeworkModal').style.display === 'block') {
        showHomeworkDetails();
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let countdownText = "Due in: ";
    if (days > 0) countdownText += `${days}d `;
    countdownText += `${hours}h ${minutes}m ${seconds}s`;

    modalCountdownElement.textContent = countdownText;

  }, 1000);
}


function closeHomeworkModal() {
  const modal = document.getElementById('homeworkModal');
  modal.style.display = 'none';
  if (homeworkCountdownInterval) {
      clearInterval(homeworkCountdownInterval);
  }
  filterHomework();
}

// Close any modal if the user clicks anywhere outside of it
window.onclick = function(event) {
  const homeworkModal = document.getElementById('homeworkModal');
  const calendarModal = document.getElementById('calendarModal');

  if (event.target == homeworkModal) {
    closeHomeworkModal();
  }
  if (event.target == calendarModal) {
    closeCalendarModal();
  }
}


// --- Homework Action Functions ---
function markHomeworkComplete(homeworkId) {
    const homework = allHomework.find(hw => hw.id === homeworkId);
    if (homework) {
        homework.completed = true;
        alert(`Homework "${homework.topic}" marked as complete!`);
        filterHomework();
        if (document.getElementById('homeworkModal').style.display === 'block') {
            showHomeworkDetails();
        }
    }
}

function addReminder(homeworkId) {
    const homework = allHomework.find(hw => hw.id === homeworkId);
    if (homework) {
        const dueDate = new Date(homework.dueDate);
        alert(`Reminder set for "${homework.topic}" (Due: ${dueDate.toLocaleString()}). \n(Note: This is a simulation. A real reminder requires browser permissions or a server.)`);
    }
}

function downloadAssignment(homeworkId) {
    const homework = allHomework.find(hw => hw.id === homeworkId);
    if (homework) {
        alert(`Downloading assignment for "${homework.topic}"... \n(Note: This is a simulation. You'd replace this with actual file download logic.)`);
    }
}


// --- Calendar Specific Global Variables ---
let currentCalendarDate = new Date(); // Tracks the currently displayed month/year
let selectedCalendarDate = null; // Tracks the user-selected date in the calendar
let activeCalendarFilter = 'all'; // Default filter for calendar events

// --- School Events Data (Fake Data) ---
const schoolEvents = [
    { date: '2025-07-31', type: 'event', title: 'Parent-Teacher Meeting', time: '10:00 AM' },
    { date: '2025-08-01', type: 'quiz', title: 'Math Quiz - Algebra', time: '09:00 AM' },
    { date: '2025-08-05', type: 'holiday', title: 'National Holiday', time: 'All Day' },
    { date: '2025-08-08', type: 'event', title: 'Sports Day Practice', time: '03:00 PM' },
    { date: '2025-08-15', type: 'exam', title: 'English Midterm Exam', time: '09:30 AM' },
    { date: '2025-08-20', type: 'event', title: 'Science Fair Project Due', time: '05:00 PM' },
    { date: '2025-08-25', type: 'quiz', title: 'History Pop Quiz', time: '11:00 AM' },
    { date: '2025-09-01', type: 'holiday', title: 'Autumn Break Starts', time: 'All Day' },
    { date: '2025-09-05', type: 'event', title: 'Teachers\' Day Celebration', time: '02:00 PM' },
    { date: '2025-09-10', type: 'exam', title: 'Math Final Exam', time: '09:00 AM' },
    { date: '2025-09-12', type: 'quiz', title: 'Computer Science Quiz', time: '01:00 PM' },
    { date: '2025-09-20', type: 'event', title: 'Annual Function Rehearsal', time: '04:00 PM' },
    { date: '2025-10-02', type: 'holiday', title: 'Gandhi Jayanti', time: 'All Day' },
    { date: '2025-10-10', type: 'exam', title: 'Science Final Exam', time: '10:00 AM' },
    { date: '2025-10-25', type: 'event', title: 'School Carnival', time: '11:00 AM' },
    { date: '2025-11-14', type: 'holiday', title: 'Children\'s Day', time: 'All Day' },
    { date: '2025-12-25', type: 'holiday', title: 'Christmas Day', time: 'All Day' },
    // Add more events for different months and types
];

function initializeCalendar() {
    // Attach event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            activeCalendarFilter = this.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderCalendar(); // Re-render calendar with new filter
            displayEventsForSelectedDate(); // Update event list based on new filter
        });
    });

    renderCalendar(); // Initial rendering of the calendar for current month
}

function openCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'block';
    currentCalendarDate = new Date(); // Reset to current month when opening
    selectedCalendarDate = null; // Clear selected date
    renderCalendar(); // Render fresh calendar
    displayEventsForSelectedDate(); // Clear or display initial message
}

function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'none';
}

function renderCalendar() {
    const monthYearDisplay = document.getElementById('calendarMonthYear');
    const calendarDaysGrid = document.getElementById('calendarDays');
    calendarDaysGrid.innerHTML = ''; // Clear previous days

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth(); // 0-indexed

    // Set month and year display
    monthYearDisplay.textContent = new Date(year, month).toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Get first day of the month and number of days in the month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get days in previous month for padding
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // Fill in leading empty days from previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day', 'prev-month');
        dayDiv.innerHTML = `<span class="day-number">${daysInPrevMonth - firstDayOfMonth + 1 + i}</span>`;
        calendarDaysGrid.appendChild(dayDiv);
    }

    // Fill in days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.innerHTML = `<span class="day-number">${day}</span>`;
        dayDiv.dataset.date = `${year}-${month + 1}-${day}`; // Store date for lookup

        // Mark today's date
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
            if (selectedCalendarDate === null) { // Auto-select today if nothing else is selected
                selectedCalendarDate = dayDiv.dataset.date;
            }
        }

        // Add events indicators
        const eventsForThisDay = getEventsForDate(dayDiv.dataset.date, true); // Get count for indicators
        eventsForThisDay.forEach(event => {
            const indicator = document.createElement('span');
            indicator.classList.add('event-indicator', `event-${event.type}`);
            indicator.title = event.title; // Tooltip for event
            dayDiv.appendChild(indicator);
        });

        dayDiv.addEventListener('click', () => selectCalendarDate(dayDiv.dataset.date));
        calendarDaysGrid.appendChild(dayDiv);
    }

    // Fill in trailing empty days for the next month
    const totalDaysDisplayed = firstDayOfMonth + daysInMonth;
    const remainingCells = 42 - totalDaysDisplayed; // Max 6 rows * 7 days = 42 cells

    for (let i = 1; i <= remainingCells; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day', 'next-month');
        dayDiv.innerHTML = `<span class="day-number">${i}</span>`;
        calendarDaysGrid.appendChild(dayDiv);
    }

    // Ensure selected date is highlighted and events are displayed
    if (selectedCalendarDate) {
        const selectedDayElement = calendarDaysGrid.querySelector(`.calendar-day[data-date="${selectedCalendarDate}"]`);
        if (selectedDayElement) {
            document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
            selectedDayElement.classList.add('selected');
        }
    }
    displayEventsForSelectedDate(); // Always refresh event list when calendar re-renders
}


function getEventsForDate(dateString, forIndicator = false) {
    return schoolEvents.filter(event => {
        const eventDate = new Date(event.date);
        const targetDate = new Date(dateString);
        
        // Compare year, month, and day for exact match
        const isSameDay = eventDate.getFullYear() === targetDate.getFullYear() &&
                          eventDate.getMonth() === targetDate.getMonth() &&
                          eventDate.getDate() === targetDate.getDate();

        if (!isSameDay) return false;

        // Apply filter if not just for indicators
        if (!forIndicator && activeCalendarFilter !== 'all') {
            return event.type === activeCalendarFilter;
        }
        return true;
    });
}

function selectCalendarDate(dateString) {
    // Remove 'selected' class from previously selected date
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Add 'selected' class to the newly clicked date
    const selectedDayElement = document.querySelector(`.calendar-day[data-date="${dateString}"]`);
    if (selectedDayElement) {
        selectedDayElement.classList.add('selected');
    }
    selectedCalendarDate = dateString; // Store the selected date
    displayEventsForSelectedDate();
}

function displayEventsForSelectedDate() {
    const eventListUl = document.getElementById('eventList');
    const selectedDateText = document.getElementById('selectedDateText');
    eventListUl.innerHTML = ''; // Clear previous events

    if (!selectedCalendarDate) {
        selectedDateText.textContent = "None";
        eventListUl.innerHTML = '<li>Click on a date to see events.</li>';
        return;
    }

    const events = getEventsForDate(selectedCalendarDate, false); // Get filtered events

    selectedDateText.textContent = new Date(selectedCalendarDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (events.length === 0) {
        eventListUl.innerHTML = '<li>No events for this date with current filters.</li>';
    } else {
        events.forEach(event => {
            const listItem = document.createElement('li');
            listItem.classList.add(`event-${event.type}`); // Add type class for styling
            listItem.innerHTML = `<strong>${event.title}</strong> <span class="event-time">${event.time}</span>`;
            eventListUl.appendChild(listItem);
        });
    }
}


function changeMonth(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    selectedCalendarDate = null; // Clear selection when month changes
    renderCalendar();
}


// Close any modal if the user clicks anywhere outside of it
window.onclick = function(event) {
  const homeworkModal = document.getElementById('homeworkModal');
  const calendarModal = document.getElementById('calendarModal');

  if (event.target === homeworkModal) { // Use strict equality
    closeHomeworkModal();
  }
  if (event.target === calendarModal) { // Use strict equality
    closeCalendarModal();
  }
}

// Initial call for homework on DOMContentLoaded is in index.html
// Initial call for calendar on DOMContentLoaded is in index.html