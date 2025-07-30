/* === GENERAL === */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif; /* Keep Segoe UI or change to 'Poppins', sans-serif; if linked */
  background-image: url('arturo-rey-Uk2b7mxBi9E-unsplash.jpg'); /* Your desired background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* Keeps background fixed when scrolling */
  color: #e0e0e0; /* Lighter text for dark backgrounds */
  min-height: 100vh; /* Ensure body takes full height for content */
  display: flex;
  flex-direction: column;
}

/* Optional: Add a subtle overlay to make text more readable on busy backgrounds */
body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  z-index: -1; /* Place behind content but above background image */
}

/* === HEADER === */
.dashboard-header {
  background: linear-gradient(to right, rgba(20, 30, 48, 0.95), rgba(30, 40, 60, 0.95)); /* Darker, sophisticated gradient */
  color: #fff;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); /* Stronger shadow */
  position: sticky;
  top: 0;
  z-index: 1000;
}

.user-info h1 {
  margin: 0;
  font-size: 32px;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  animation: fadeInDown 1s ease;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffbe0b; /* A more vibrant gold border */
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); /* Glowing effect */
}

.stats {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stats span {
  font-weight: bold;
  color: #ffde59; /* Brighter gold for points */
  font-size: 18px;
}

.notification {
    cursor: pointer;
}

.notification i {
    transition: transform 0.3s ease;
}


/* === QUOTE (Marquee) === */
.quote {
  margin: 30px 0 40px;
  overflow: hidden; /* Hide content outside the container */
  white-space: nowrap; /* Keep text on a single line */
  position: relative;
  height: 30px; /* Fixed height for the marquee area */
  background-color: rgba(0, 0, 0, 0.6); /* Slightly darker background for the quote */
  padding: 5px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.quote p {
  display: inline-block; /* Make it an inline block for animation */
  font-style: italic;
  font-size: 1.1em;
  color: #c0c0c0;
  padding-left: 100%; /* Start the text completely off-screen to the right */
  animation: marquee 25s linear infinite; /* Adjusted duration for smoother, longer text */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* === SUBJECTS SECTION === */
.subjects h2 {
  text-align: center;
  color: #fff;
  margin-top: 30px;
  font-size: 36px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  animation: fadeInUp 1s ease;
}

.subject-grid {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  padding: 30px;
}

.card {
  background-color: rgba(43, 43, 77, 0.95); /* Darker, rich blue for cards with slight transparency */
  color: #e0e0e0;
  border-radius: 16px;
  padding: 25px;
  width: 220px;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0; /* Initial state for JavaScript animation */
  transform: scale(0.8) translateY(20px); /* Initial state for JavaScript animation */
}

.card h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #ffde59; /* Gold for subject titles */
}

.card p {
  font-size: 1.1em;
  margin-bottom: 15px;
  color: #c0c0c0;
}

.card:hover {
  transform: translateY(-12px) rotateX(2deg);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.4); /* Stronger shadow with a glow */
}

.card button {
  margin-top: 15px;
  padding: 10px 18px;
  background-color: #3b82f6; /* A brighter, more attractive blue */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.card button:hover {
  background-color: #1e69ed;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.card button:active {
  transform: translateY(0);
}

/* Progress bar styling */
.progress-bar-container {
    width: 100%;
    background-color: #4a4a6b; /* Darker track for progress */
    border-radius: 5px;
    height: 10px;
    margin-top: 10px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(to right, #6EE7B7, #3B82F6); /* Vibrant gradient for fill */
    border-radius: 5px;
    width: 0%; /* Initial state for JS animation */
}


/* === FEATURES === */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  padding: 30px;
  margin-bottom: 40px;
}

.feature {
  background-color: rgba(43, 43, 77, 0.95); /* Same as subject cards with slight transparency */
  color: #e0e0e0;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0; /* Initial state for JavaScript animation */
  transform: scale(0.8) translateY(20px); /* Initial state for JavaScript animation */
}

.feature h3 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #ffde59;
}

.feature p {
  font-size: 1.05em;
  line-height: 1.5;
  color: #c0c0c0;
}

.feature:hover {
  transform: scale(1.03) translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.4);
}

.feature button {
  margin-top: 20px;
  padding: 10px 18px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.feature button:hover {
  background-color: #1e69ed;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.feature button:active {
  transform: translateY(0);
}

/* Footer */
.dashboard-footer {
  text-align: center;
  padding: 20px;
  color: #aaa;
  font-size: 0.9em;
  background-color: rgba(0, 0, 0, 0.6);
  margin-top: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
}

/* === ANIMATIONS === */
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* New Animations */
@keyframes cardPopIn {
  0% { opacity: 0; transform: scale(0.8) translateY(20px); }
  80% { opacity: 1; transform: scale(1.02) translateY(-5px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes progressBarFill {
    from { width: 0%; }
    to { width: var(--progress-width, 100%); }
}

@keyframes nameHighlight {
  0% { transform: translateY(0); filter: brightness(1); }
  25% { transform: translateY(-5px); filter: brightness(1.2); }
  50% { transform: translateY(0); filter: brightness(1); }
  75% { transform: translateY(-2px); filter: brightness(1.1); }
  100% { transform: translateY(0); filter: brightness(1); }
}

/* Font Awesome Bell Shake/Beat (using fa-beat from FA6 if available, else custom) */
@keyframes fa-beat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.2); }
    30% { transform: scale(1); }
    45% { transform: scale(1.2); }
    60% { transform: scale(1); }
}

.notification i.fa-beat {
    animation: fa-beat 1s ease-in-out;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 20px;
  }

  .user-info h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .profile-section {
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
  }

  .subject-grid, .features {
    padding: 20px;
    gap: 15px;
  }

  .card, .feature {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    padding: 10px 15px;
  }

  .user-info h1 {
    font-size: 22px;
  }

  .stats span {
    font-size: 16px;
  }
}