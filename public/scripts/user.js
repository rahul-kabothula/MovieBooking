// user.js
document.addEventListener("DOMContentLoaded", function() {
    // Registration Form
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const firstName = document.getElementById("RegFirstName").value;
            const lastName = document.getElementById("RegLastName").value;
            const password = document.getElementById("RegPassword").value;
            const email = document.getElementById("RegEmail").value;

            const newUser = {firstName, lastName, password, email};
            console.log("Registration Object:", newUser);
            // Add logic to send newUser to the backend (e.g., using fetch)

            // Clear the form
            registrationForm.reset();
        });
    }

    // Login Form
    const loginForm = document.getElementById("loginForm");
    if(loginForm){
        loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const loginUsername = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;

        const loginInfo = { username: loginUsername, password: loginPassword };
        console.log("Login Object:", loginInfo);
        // Add logic to send loginInfo to the backend (e.g., using fetch)

        // Clear the form
        loginForm.reset();
    });
    }
});
