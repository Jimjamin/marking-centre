
"use strict";

/**
 * Adds onclick functionality to the Exam/User form creation buttons in the upload tab for the user
 */
const formButtonEventListener = () => {
    document.getElementById("userUploadTab").addEventListener("click", () => {
        document.getElementById("userUploadTab").style.display = "none";
        document.getElementById("examUploadTab").style.display = "none";
        document.getElementById("userUploadBody").style.display = "block";
        document.getElementById("examUploadBody").style.display = "none";
    });
    document.getElementById("examUploadTab").addEventListener("click", () => {
        document.getElementById("userUploadTab").style.display = "none";
        document.getElementById("examUploadTab").style.display = "none";
        document.getElementById("userUploadBody").style.display = "none";
        document.getElementById("examUploadBody").style.display = "block";
    });
}

export { formButtonEventListener }
