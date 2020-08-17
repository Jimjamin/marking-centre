
"use strict";

/**
 * Sets up profile content peronalised to the user.
 */
const setupProfile = () => {
    const userEmail = sessionStorage.getItem("userEmail");
    document.getElementById("emailAddressProfile").innerHTML = `Email address: ${userEmail}`;
}

export { setupProfile }
