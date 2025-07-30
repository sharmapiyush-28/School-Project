document.addEventListener("DOMContentLoaded", () => {
      const welcomeMessage = document.getElementById("welcomeMessage");
      const passwordInput = document.getElementById("password");
      const usernameInput = document.getElementById("student-id");
      const togglePasswordBtn = document.getElementById("togglePassword");
      const loginForm = document.getElementById("loginForm");

      const messages = [
        "Welcome Back, Learners!",
        "Ready to Learn?",
        "Let's Power Up Your Knowledge 💡",
        "Explore. Learn. Succeed. 🚀"
      ];

      let currentIndex = 0;
      setInterval(() => {
        welcomeMessage.classList.add("fade-slide-out");
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % messages.length;
          welcomeMessage.textContent = messages[currentIndex];
          void welcomeMessage.offsetWidth;
          welcomeMessage.classList.remove("fade-slide-out");
          welcomeMessage.classList.add("fade-slide-in");
          setTimeout(() => welcomeMessage.classList.remove("fade-slide-in"), 500);
        }, 400);
      }, 4000);

      togglePasswordBtn.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        togglePasswordBtn.textContent = type === "password" ? "👁️" : "🙈";
      });

      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const button = loginForm.querySelector("button[type='submit']");
        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        const validUsername = "student123";
        const validPassword = "pass123";

        button.innerHTML = `<span>Logging in...</span><svg class='w-5 h-5 animate-spin' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle class='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4'></circle><path class='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z'></path></svg>`;
        button.disabled = true;

        setTimeout(() => {
          if (enteredUsername === validUsername && enteredPassword === validPassword) {
            window.location.href = "dashboard.html";
          } else {
            alert("Invalid ID or password.");
            button.disabled = false;
            button.innerHTML = `<span>Login</span>`;
          }
        }, 1500);
      });
    });