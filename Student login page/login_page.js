// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const loginForm = document.querySelector("form");
    const passwordInput = document.getElementById("password");

    // 1. Welcome Message Animation Loop
    const messages = [
        "Welcome Back, Learners!",
        "Ready to Learn?",
        "Let's Power Up Your Knowledge 💡",
        "Explore. Learn. Succeed. 🚀"
    ];

    let currentMessage = 0;
    setInterval(() => {
        welcomeMessage.classList.add("opacity-0");
        setTimeout(() => {
            currentMessage = (currentMessage + 1) % messages.length;
            welcomeMessage.textContent = messages[currentMessage];
            welcomeMessage.classList.remove("opacity-0");
        }, 500);
    }, 4000);

    // 2. Smooth glow on input focus
    document.querySelectorAll("input").forEach((input) => {
        input.addEventListener("focus", () => {
            input.classList.add("ring-2", "ring-emerald-400");
        });

        input.addEventListener("blur", () => {
            input.classList.remove("ring-2", "ring-emerald-400");
        });
    });

    // 3. Toggle password visibility on double-click (optional bonus)
    passwordInput.addEventListener("dblclick", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    // 4. Handle fake form submission animation
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent actual submission
        const button = loginForm.querySelector("button[type='submit']");
        button.innerHTML = `<span>Logging in...</span>
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>`;
        button.disabled = true;

        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = `<span>Login</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v3a1 1 0 11-2 
                    0V3a1 1 0 011-1zm4.356 2.644a1 1 0 01.372 
                    1.352l-1.5 3.5a1 1 0 01-1.824-.78l1.5-3.5a1 1 0 
                    011.452-.572zm-8.712 0a1 1 0 011.452.572l1.5 
                    3.5a1 1 0 11-1.824.78l-1.5-3.5a1 1 0 
                    01.372-1.352zM18 10a1 1 0 01-1 
                    1h-3a1 1 0 110-2h3a1 1 0 011 1zm-4.356 
                    4.356a1 1 0 01-1.452.572l-1.5-3.5a1 1 0 
                    111.824-.78l1.5 3.5a1 1 0 01-.372 
                    1.352zm-8.712 0a1 1 0 
                    01-.372-1.352l1.5-3.5a1 1 0 
                    111.824.78l-1.5 3.5a1 1 0 
                    01-1.452-.572zM2 10a1 1 0 
                    011-1h3a1 1 0 110 2H3a1 1 0 
                    01-1-1zm4.356-4.356a1 1 0 
                    01.572-1.452l3.5-1.5a1 1 0 
                    11.78 1.824l-3.5 1.5a1 1 0 
                    01-.572-1.452z" clip-rule="evenodd"></path>
                </svg>`;
            alert("Login Successful!"); // Replace with actual redirect logic
        }, 2000);
    });
});
