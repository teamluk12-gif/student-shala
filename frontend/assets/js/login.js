document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.login-register-container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const registerForm = document.getElementById('registerForm');

    // --- Animation Logic (No change here) ---
    if (registerBtn) {
        registerBtn.addEventListener('click', () => container.classList.add('active'));
    }
    if (loginBtn) {
        loginBtn.addEventListener('click', () => container.classList.remove('active'));
    }

    // --- NEW: Backend Connection Logic ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Form ko submit hone se roka

            // Form se saara data collect kiya
            const username = registerForm.querySelector('input[placeholder="USERNAME"]').value;
            const email = registerForm.querySelector('input[placeholder="EMAIL"]').value;
            const password = registerForm.querySelector('input[placeholder="PASSWORD"]').value;
            const role = registerForm.querySelector('select[name="role"]').value;

            // Data ko ek object me daala
            const formData = { username, email, password, role };

            try {
                // 'fetch' API se data ko backend URL '/register' par bheja
                const response = await fetch('/register', {
                    method: 'POST', // Method POST hai kyunki hum data bhej rahe hain
                    headers: {
                        'Content-Type': 'application/json', // Bataya ki hum JSON data bhej rahe hain
                    },
                    body: JSON.stringify(formData), // Object ko JSON string me convert kiya
                });

                const result = await response.json(); // Backend se JSON response receive kiya

                if (response.ok) { // Agar response successful hai (status 200-299)
                    console.log('Registration successful:', result);
                    
                    // Ab backend response ke basis par redirect karo
                    if (result.role === 'owner') {
                        window.location.href = 'dashboard.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                } else {
                    // Agar koi error aaya backend se
                    console.error('Registration failed:', result.message);
                    alert(`Registration failed: ${result.message}`); // User ko error dikhaya
                }
            } catch (error) {
                // Agar network ya koi aur error aaya
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});
