
"use strict";

import { validateLogin, logoffBtn } from './modules/login.js';
//import { createTable } from './modules/table.js';
import { positionBtn } from './build/recordBtn.js';
//import { appendSortBtn } from './modules/sort.js';
import { buildList } from './build/searchColumn.js';
import { setupProfile } from './build/profile.js';
import { makeSearch } from './modules/search.js';

window.onload = function() {
    const path = window.location.pathname;
    if (path !== "/login") {
        buildList();
        document.getElementById("search").onkeyup = makeSearch;
        positionBtn();
        //createTable();
        setupProfile();
        document.getElementById("logoffBtn").onclick = logoffBtn;
    } else document.getElementById("logonForm").onsubmit = validateLogin;
}

window.onclick = formToClose => {
    const profileDesc = document.getElementById("profileDesc");
    const uploadForm = document.getElementById("uploadForm");
    if (formToClose.target === profileDesc) profileDesc.style.display = "none";
    if (formToClose.target === uploadForm) uploadForm.style.display = "none";
}
