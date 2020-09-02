
"use strict";

import { loadDisplayTable } from './build/displayTable.js';
import { alertMessage } from './build/alert.js';

const confirmUpload = () => {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const url = `${baseURL}/upload/submit`;
    fetch(url)
        .then(result => result.json())
        .then(result => {
            alertMessage(result.message);
            window.location.replace(`${baseURL}/home`);
        })
        .catch(error => alertMessage(error.message))
}

const cancelUpload = () => window.location.replace(`${window.location.protocol}//${window.location.host}/home`);

window.onload = function() {
    document.getElementById("confirmUploadBtn").onclick = confirmUpload;
    document.getElementById("cancelUploadBtn").onclick = cancelUpload;
    const url = `${window.location.protocol}//${window.location.host}/upload/confirm`;
    fetch(url)
        .then(result => result.json())
        .then(result => loadDisplayTable(result))
        .catch(error => alertMessage(error.message))
}
