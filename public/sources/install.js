
"use strict";

import { alertMessage } from './build/alert.js'

window.onload = function() {
    //document.getElementById("installBtn").onclick = downloadFile;
    //document.getElementById("installBtn").href = `${window.location.protocol}//${window.location.host}/exec/install.exe`;
}

const downloadFile = () => {
    const url = `${window.location.protocol}//${window.location.host}/install/download`;
    fetch(url)
        .catch(error => alertMessage(error.message));
}
