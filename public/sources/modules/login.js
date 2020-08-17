
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
    sessionStorage.setItem("userEmail", email);
    setTimeout(() => alert("Your login request has timed out from possible server error"), 5000)
    return true;
}

/**
 * Gives the logoff button functionality required to logoff.
 */
const logoffBtn = () => window.location.href = `${window.location.protocol}//${window.location.host}/login`;

export { validateLogin, logoffBtn };
