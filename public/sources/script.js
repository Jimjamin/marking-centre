
"use strict";

import { validateLogin } from './modules/login.js';
import { documentSet } from './script/onload.js';
import { addClickEventListeners } from './script/onclick.js';

/**
 * Onload of home (or login) page set necessary storage and call functions needed to initialise session
 */
window.onload = function() {
    const path = window.location.pathname;
    window.sessionStorage.setItem("index", "exam_id");
    window.sessionStorage.setItem("order", "ASC");
    if (path !== "/login") {
        documentSet();
        addClickEventListeners();
    } else { 
        localStorage.removeItem("userEmail");
        document.getElementById("logonForm").onsubmit = validateLogin;
    }
}

/**
 * If the userhas opened a form (modal container) they can close said container by clicking outside the form window
 * 
 * @param {object} formToClose - Modal container that is currently open to be closed
 */
window.onclick = formToClose => {
    const profileDesc = document.getElementById("profileDesc");
    const uploadForm = document.getElementById("uploadForm");
    const gradeForm = document.getElementById("gradingForm");
    if (formToClose.target === profileDesc) profileDesc.style.display = "none";
    else if (formToClose.target === gradeForm) gradeForm.style.display = "none";
    else if (formToClose.target === uploadForm) { 
        uploadForm.style.display = "none";
        window.location.reload();
    }
}
