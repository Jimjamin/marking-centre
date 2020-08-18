
"use strict";

const uploadUser = () => {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const url = `${baseURL}/upload/users`;
    let filesToUpload = new FormData();
    filesToUpload.append("userRegisterFile", document.getElementById("userFileUpload").files[0]);
    const method = {
        method: "POST",
        body: filesToUpload
    }
    fetch(url, method)
        .then(response => response.json())
        .then(response => window.location.href = `${baseURL}/upload/users`)
        .catch(error => alert(error.message))
}

export { uploadUser }
