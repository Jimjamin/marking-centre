
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
    } else if (password.length < 8) {
        alert("You have not entered in a valid password of suitable length");
        return false;
    }
    localStorage.setItem("userEmail", email);
    // After ten seconds alert the user to a failed login request
    setTimeout(() => alert("You have entered the wrong email address or password"), 10000);
    return true;
}

/**
 * Gives the logoff button functionality required to logoff.
 */
const logoffBtn = () => window.location.href = `${window.location.protocol}//${window.location.host}/login`;

export { validateLogin, logoffBtn };
