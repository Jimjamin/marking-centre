
"use strict";

import { validateLogin } from './modules/login.js';
import { documentSet } from './script/onload.js';
import { addClickEventListeners } from './script/onclick.js';

window.onload = function() {
    const path = window.location.pathname;
    if (path !== "/login") {
        documentSet();
        addClickEventListeners();
    } else { 
        localStorage.removeItem("userEmail");
        document.getElementById("logonForm").onsubmit = validateLogin;
    }
}

window.onclick = formToClose => {
    const profileDesc = document.getElementById("profileDesc");
    const uploadForm = document.getElementById("uploadForm");
    if (formToClose.target === profileDesc) profileDesc.style.display = "none";
    if (formToClose.target === uploadForm) { 
        uploadForm.style.display = "none";
        window.location.reload();
    }
}
