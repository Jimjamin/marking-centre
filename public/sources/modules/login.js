
"use strict";

import { alertMessage } from '../build/alert.js';

/**
 * Ensures user has met validation requirements before their logon attempt is sent for processing by server.
 * 
 * @returns {boolean} Is the user validated for passing their logon details to the server
 */
const validateLogin = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (password.length < 8) {
        alertMessage("You have not entered in a valid password of suitable length");
        return false;
    }
    localStorage.setItem("userEmail", email);
    return true;
}

/**
 * Gives the logoff button functionality required to logoff.
 */
const logoffBtn = () => window.location.href = `${window.location.protocol}//${window.location.host}/login`;

export { validateLogin, logoffBtn };
