document.addEventListener('DOMContentLoaded', () => {
    // Get all the necessary elements
    const views = document.querySelectorAll('.profile-view');
    const mainProfileView = document.getElementById('main-profile-view');
    const editProfileView = document.getElementById('edit-profile-view');
    const settingsView = document.getElementById('settings-view');

    const editProfileBtn = document.getElementById('edit-profile-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const backBtns = document.querySelectorAll('.back-btn');

    // --- View Switching Logic ---
    const showView = (viewId) => {
        views.forEach(view => {
            view.classList.remove('active');
        });
        const viewToShow = document.getElementById(viewId);
        if (viewToShow) {
            viewToShow.classList.add('active');
        }
    };

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showView('edit-profile-view');
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showView('settings-view');
        });
    }

    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetViewId = btn.getAttribute('data-target');
            showView(targetViewId);
        });
    });

    // --- Notification Toggle Logic ---
    const notificationToggle = document.getElementById('notification-toggle');
    if (notificationToggle) {
        notificationToggle.addEventListener('change', () => {
            if (notificationToggle.checked) {
                console.log('Notifications Enabled');
            } else {
                console.log('Notifications Disabled');
            }
        });
    }

    // --- NEW: Theme Switcher Logic ---
    const themeBtns = document.querySelectorAll('.theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'light';

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        // Update button active state
        themeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
        // Save preference
        localStorage.setItem('theme', theme);
    };

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.dataset.theme;
            applyTheme(selectedTheme);
        });
    });

    // Apply saved theme on page load
    applyTheme(currentTheme);

    // --- Placeholder for Language Logic ---
    const languageSelect = document.getElementById('language-select');
    if(languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            console.log(`Language changed to: ${e.target.value}`);
            // Future logic for changing language would go here
        });
    }
});
