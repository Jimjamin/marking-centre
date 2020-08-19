
"use strict";

import { loadDisplayTable } from './build/displayTable.js';

const confirmUpload = () => {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const url = `${baseURL}/upload/submit`;
    fetch(url)
        .then(result => result.json())
        .then(result => {
            alert(result.message);
            window.location.replace(`${baseURL}/home`);
        })
        .catch(error => alert(error.message))
}

const cancelUpload = () => window.location.replace(`${window.location.protocol}//${window.location.host}/home`);

window.onload = function() {
    document.getElementById("confirmUploadBtn").onclick = confirmUpload;
    document.getElementById("cancelUploadBtn").onclick = cancelUpload;
    const url = `${window.location.protocol}//${window.location.host}/upload/confirm`;
    fetch(url)
        .then(result => result.json())
        .then(result => loadDisplayTable(result))
        .catch(error => alert(error.message))
}
