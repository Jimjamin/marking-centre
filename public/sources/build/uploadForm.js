
"use strict";

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
