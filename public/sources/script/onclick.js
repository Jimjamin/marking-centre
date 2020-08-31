
"use strict";

import { makeSearch } from './../modules/search.js';
import { logoffBtn } from './../modules/login.js'
import { uploadUser, uploadExam } from './../modules/upload.js';
import { formButtonEventListener } from './../build/uploadForm.js';
import { saveGrades } from './../build/recordBtn.js';

const showTable = (tableToShowHeading, tableToShow) => {
    if (tableToShowHeading.classList[0] === "table-heading") {
        tableToShow.style.display = "block";
        tableToShowHeading.classList.remove("table-heading");
        tableToShowHeading.classList.add("table-heading-2");
    } else {
        tableToShow.style.display = "none";
        tableToShowHeading.classList.remove("table-heading-2");
        tableToShowHeading.classList.add("table-heading");
    }
}

const addClickEventListeners = () => {
    document.getElementById("search").onkeyup = makeSearch;
    document.getElementById("searchBtn").onclick = makeSearch;
    document.getElementById("searchColumn").onchange = makeSearch;
    document.getElementById("logoffBtn").onclick = logoffBtn;
    document.getElementById("uploadUserBtn").onclick = uploadUser;
    document.getElementById("uploadUserFormBtn").onclick = uploadUser;
    document.getElementById("uploadExamBtn").onclick = uploadExam;
    document.getElementById("uploadExamFormBtn").onclick = uploadExam;
    document.getElementById("saveGradeBtn").onclick = saveGrades;
    document.getElementById("backBtn").addEventListener("click", () => { window.location.href = `${window.location.protocol}//${window.location.host}/home` });
    formButtonEventListener();
    const activeJobs = document.getElementById("activeJobs");
    const completedJobs = document.getElementById("completedJobs");
    const userList = document.getElementById("userTableHeading");
    activeJobs.addEventListener("click", () => showTable(activeJobs, document.getElementById("table")));
    completedJobs.addEventListener("click", () => showTable(completedJobs, document.getElementById("tableGrade")));
    userList.addEventListener("click", () => showTable(userList, document.getElementById("userListProfile")));
}

export { addClickEventListeners }
