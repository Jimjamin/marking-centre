
"use strict"

import { createTable } from './../modules/table.js';

const checkTable = () => {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const url = `${baseURL}/exams?email=${localStorage.getItem("userEmail")}`;
    fetch(url)
        .then(result => result.json())
        .then(result => createTable(result))
        .catch(error => alert(error.message))
}

const saveGrades = () => {
    const url = `${window.location.protocol}//${window.location.host}/grades`;
    const gradesToSave = new FormData();
    gradesToSave.append("grade", document.getElementById("gradeInput").value);
    gradesToSave.append("comment", document.getElementById("commentInput").value);
    gradesToSave.append("questionNumber", window.sessionStorage.getItem("questionNumber"));
    gradesToSave.append("studentID", window.sessionStorage.getItem("studentID"));
    gradesToSave.append("examID", window.sessionStorage.getItem("examID"));
    gradesToSave.append("teacherEmail", window.sessionStorage.getItem("teacherEmail"));
    const method = {
        method: "POST",
        body: gradesToSave
    };
    fetch(url, method)
        .then(response => response.json())
        .then(response => {
            alert(response.message);
            document.getElementById("gradingForm").style.display = "none";
        })
        .catch(error => alert(error.message))
}

export { checkTable, saveGrades }
