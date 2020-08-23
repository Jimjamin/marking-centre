
"use strict";

import { makeSearch } from './../modules/search.js';
import { logoffBtn } from './../modules/login.js'
import { uploadUser, uploadExam } from './../modules/upload.js';
import { formButtonEventListener } from './../build/uploadForm.js';

const addClickEventListeners = () => {
    document.getElementById("search").onkeyup = makeSearch;
    document.getElementById("logoffBtn").onclick = logoffBtn;
    document.getElementById("uploadUserBtn").onclick = uploadUser;
    document.getElementById("uploadUserFormBtn").onclick = uploadUser;
    document.getElementById("uploadExamBtn").onclick = uploadExam;
    document.getElementById("uploadExamFormBtn").onclick = uploadExam;
    document.getElementById("backBtn").addEventListener("click", () => { window.location.href = `${window.location.protocol}//${window.location.host}/home` });
    formButtonEventListener();
}

export { addClickEventListeners }
