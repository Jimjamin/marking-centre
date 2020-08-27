
"use strict";

import { validateLogin } from './modules/login.js';
import { documentSet } from './script/onload.js';
import { addClickEventListeners } from './script/onclick.js';

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
