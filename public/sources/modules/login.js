
"use strict";

/**
 * Ensures user has met validation requirements before their logon attempt is sent for processing by server.
 * 
 * @returns {boolean} Is the user validated for passing their logon details to the server
 */
const validateLogin = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!email.includes("@eq.edu.au")) { 
        alert("You have not entered in a valid EQ email address");
        return false;
    } else if (password.length < 4) {
        alert("You have not entered in a valid password of suitable length");
        return false;
    }
    setInterval(() => alert("Your login request has timed out from possible server error"), 5000)
    return true;
}

export { validateLogin };
