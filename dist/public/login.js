 
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the default form submission
         
            const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Error messages container
    const errorMessages1 = document.getElementById('msg1');
    errorMessages1.innerHTML = ''; // Clear previous errors

    const errorMessages2 = document.getElementById('msg2');
    errorMessages2.innerHTML = '';

    const errorMessages3 = document.getElementById('msg3');
    errorMessages3.innerHTML = '';
    // Validate inputs
    let hasError = false;

    if (!username) {
        errorMessages1.innerHTML += '<p>! Username cannot be empty.</p>';
        hasError = true;
    }

    if (!email) {
        errorMessages2.innerHTML += '<p>! Email cannot be empty.</p>';
        hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessages2.innerHTML += '<p>!Invalid email format.</p>';
        hasError = true;
    }

    if (!password) {
        errorMessages3.innerHTML += '<p>! Password cannot be empty.</p>';
        hasError = true;
    }

    // Stop if there are errors
    if (hasError) {
        return;
    }

              
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
    
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
    
                if (response.ok) {
                    const result = await response.json();
                    alert('Login successful');
                    console.log(result)
                    window.location.href = '/user'; // Redirect to dashboard
                } else {
                    const error = await response.text();
                    alert(error); // Show error message
                }
            } catch (err) {
                console.error('Error:', err);
                alert('An error occurred. Please try again later.');
            }
       
        });