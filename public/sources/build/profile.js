
"use strict";

/**
 * Sets up profile content peronalised to the user.
 */
const setupProfile = () => {
    const userEmail = localStorage.getItem("userEmail");
    document.getElementById("emailAddressProfile").innerHTML = `Email address: ${userEmail}`;
}

export { setupProfile }
