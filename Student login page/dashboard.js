// === Animate Dashboard on Load ===
window.addEventListener("DOMContentLoaded", () => {
  // Animate subject cards
   progressBars.forEach((progressBar) => {
    const circle = progressBar.querySelectorAll("circle")[1];
    const valueText = progressBar.querySelector(".progress-value");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    const targetPercent = +progressBar.dataset.progress;
    let currentPercent = 0;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const animate = () => {
      const progress = currentPercent / 100;
      const offset = circumference * (1 - progress);
      circle.style.strokeDashoffset = offset;
      valueText.textContent = `${currentPercent}%`;

      if (currentPercent < targetPercent) {
        currentPercent++;
        requestAnimationFrame(animate);
      }
    };

    animate();
  });
  // Animate feature blocks
  const features = document.querySelectorAll(".feature");
  features.forEach((feature, index) => {
    setTimeout(() => {
      feature.style.opacity = "1";
      feature.style.transform = "scale(1) translateY(0)";
      feature.style.animation = "cardPopIn 0.5s ease forwards";
    }, 150 * index);
  });

  // Animate circular progress bars
  const circularFills = document.querySelectorAll(".circular-progress circle:last-child");
  circularFills.forEach(circle => {
    const value = circle.getAttribute("data-progress");
    const max = 219.911; // 2πr for r = 35
    if (value) {
      const percentage = parseFloat(value);
      const offset = max - (percentage / 100) * max;
      circle.style.strokeDashoffset = offset;
    }
  });

  // Animate name highlight
  const studentName = document.querySelector(".student-name");
  if (studentName) {
    studentName.style.display = "inline-block";
    studentName.style.animation = "nameHighlight 2s ease-in-out infinite";
  }

  // Bell icon animation
  const bell = document.querySelector(".notification i");
  if (bell) {
    bell.classList.add("fa-beat");
  }

  // Notification toggle and mark as read logic
  const notif = document.querySelector('.notification');
  const box = document.getElementById('notificationBox');
  const notifCount = document.querySelector('.notif-count');
  const notifList = box.querySelector("ul");
  let notifications = Array.from(notifList.querySelectorAll("li"));

  // Set initial unread count
  let unreadCount = notifications.length;
  notifCount.textContent = `(${unreadCount})`;

  if (notif && box) {
    notif.addEventListener("click", () => {
      box.style.display = box.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!notif.contains(e.target) && !box.contains(e.target)) {
        box.style.display = "none";
      }
    });
  }

  // Add "Mark All as Read" functionality
  const markRead = document.createElement("button");
  markRead.textContent = "Mark All as Read";
  markRead.style.marginTop = "10px";
  markRead.style.display = "block";
  markRead.style.width = "100%";
  markRead.style.padding = "5px";
  markRead.style.backgroundColor = "#007BFF";
  markRead.style.color = "white";
  markRead.style.border = "none";
  markRead.style.borderRadius = "4px";
  markRead.style.cursor = "pointer";

  markRead.addEventListener("click", () => {
    if (notifList) {
      notifList.innerHTML = "<li style='text-align: center;'>No new notifications</li>";
    }
    unreadCount = 0;
    notifCount.textContent = "(0)";
  });

  box.appendChild(markRead);
});
const notifUnreadText = box.querySelector(".notif-unread");
notifUnreadText.textContent = `(${unreadCount} unread)`;
notifUnreadText.textContent = `(0 unread)`; // when marked as read

// === Utility click handlers ===
function viewSubject(subjectName) {
  alert(`Navigating to ${subjectName} subject details...`);
}

function playNow() {
  alert("Launching today's puzzle...");
}

function chatNow() {
  alert("Opening AI Study Buddy...");
}

function goToSection(sectionName) {
  alert(`Navigating to ${sectionName} section...`);
}

function viewFullCalendar() {
  alert("Opening full school calendar...");
}