
"use strict"

import { alertMessage } from './alert.js';

const saveGrades = () => {
    const url = `${window.location.protocol}//${window.location.host}/grades`;
    let gradesToSave = new FormData();
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
            if (response.message) alertMessage(response.message);
            else alertMessage("You are in offline mode; keep your browser open till you're next at school to ensure grades are saved");
            document.getElementById("gradingForm").style.display = "none";
        })
        .catch(error => alertMessage(error.message))
}

const checkForOfflineGrades = () => {
    if (window.sessionStorage.getItem("grade")) {
        let gradesToSave = window.sessionStorage.getItem("grade").split(';;;');
        let commentsToSave = window.sessionStorage.getItem("comment").split(';;;');
        for (let grade in gradesToSave) saveGrades(gradesToSave[grade], commentsToSave[grade]);
    }
}

export { saveGrades, checkForOfflineGrades }
