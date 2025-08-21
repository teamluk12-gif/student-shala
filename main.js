// This script should be included on every page to manage the navbar

document.addEventListener('DOMContentLoaded', () => {
    // --- Authentication State Logic ---
    const profileLinkLi = document.getElementById('profile-link-li');
    const loginLink = document.getElementById('login-link');
    const mobileProfileLink = document.getElementById('mobile-profile-link');
    const mobileLoginLink = document.getElementById('mobile-login-link');

    // This is a simple check. In a real app, you'd verify a token with the backend.
    const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (userIsLoggedIn) {
        // If logged in, show Profile and hide Login
        if (profileLinkLi) profileLinkLi.style.display = 'block';
        if (loginLink) loginLink.style.display = 'none';
        if (mobileProfileLink) mobileProfileLink.style.display = 'block';
        if (mobileLoginLink) mobileLoginLink.style.display = 'none';
    } else {
        // If not logged in, hide Profile and show Login
        if (profileLinkLi) profileLinkLi.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
        if (mobileProfileLink) mobileProfileLink.style.display = 'none';
        if (mobileLoginLink) mobileLoginLink.style.display = 'block';
    }

    // --- Hamburger Menu Toggle Logic ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
});
