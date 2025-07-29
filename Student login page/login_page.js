document.addEventListener('DOMContentLoaded', () => {
            const loginContainer = document.getElementById('loginContainer');
            const inputFields = document.querySelectorAll('.input-field');
            const loginButton = document.querySelector('form .login-button');
            const forgotPasswordLink = document.querySelector('.link-text');
            const parentLoginButton = document.querySelector('div .login-button');
            const logoIllustration = document.querySelectorAll('.logo-illustration');
            const welcomeMessage = document.getElementById('welcomeMessage');

            // Animate input fields
            inputFields.forEach((input, index) => {
                input.style.animation = `slide-in-left 0.6s ease-out forwards ${0.6 + index * 0.1}s`;
            });

            // Animate buttons and links
            loginButton.style.animation = `fade-in-up 0.6s ease-out forwards 1s`;
            forgotPasswordLink.style.animation = `fade-in-up 0.6s ease-out forwards 1.1s`;
            parentLoginButton.style.animation = `fade-in-up 0.6s ease-out forwards 1.2s`;

            // Text reveal animation for the welcome message
            const text = welcomeMessage.textContent;
            welcomeMessage.innerHTML = ''; // Clear original content
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animation = `text-reveal 0.5s ease-out forwards ${0.8 + index * 0.03}s`;
                welcomeMessage.appendChild(span);
            });
        });