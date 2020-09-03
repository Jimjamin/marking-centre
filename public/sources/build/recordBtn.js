
"use strict"

import { alertMessage } from './alert.js';

const createGradeForm = (offlineGradeToSave, offlineCommentToSave) => {
    let gradesToSave = new FormData();
    if (offlineGradeToSave) {
        gradesToSave.append("grade", offlineGradeToSave);
        gradesToSave.append("comment", offlineCommentToSave);
    } else {
        gradesToSave.append("grade", document.getElementById("gradeInput").value);
        gradesToSave.append("comment", document.getElementById("commentInput").value);
    }
    gradesToSave.append("questionNumber", window.sessionStorage.getItem("questionNumber"));
    gradesToSave.append("studentID", window.sessionStorage.getItem("studentID"));
    gradesToSave.append("examID", window.sessionStorage.getItem("examID"));
    gradesToSave.append("teacherEmail", window.sessionStorage.getItem("teacherEmail"));
    return gradesToSave;
}

const saveGrades = (offlineGradeToSave = "", offlineCommentToSave = "") => {
    const url = `${window.location.protocol}//${window.location.host}/grades`;
    let gradesToSave = createGradeForm(offlineGradeToSave, offlineCommentToSave);
    const method = {
        method: "POST",
        body: gradesToSave
    };
    fetch(url, method)
        .then(response => response.json())
        .then(response => {
            if (response.message) alertMessage(response.message);
            else if (response.offline) {
                alertMessage("You are in offline mode; keep your browser open till you're next at school to ensure grades are saved");
                window.sessionStorage.setItem("grade", `${document.getElementById("gradeInput").value};;;`);
                window.sessionStorage.setItem("comment", `${document.getElementById("commentInput").value};;;`);
            }
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
