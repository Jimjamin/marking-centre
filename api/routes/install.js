
"use strict"

exports.displayInstall = (app, path) => {
    app.get('/install', (request, result) => {
        result.sendFile(path.join(__dirname, '../../public/pages/', 'install.html'), error => {
            if (error) console.log("[FAILURE][RESOURCE] User has not received 'install.html'\r\n");
            else console.log("[SUCCESS][RESOURCE] User has received 'install.html'\r\n");
        });
    })
}

exports.downloadFile = app => {
    app.get('/install/download', (request, result) => {
        result.download(`${__dirname}../../exec/install.exe`, 'install.exe', error => {
            if (error) console.log("[FAILURE][RESOURCE] Could not download installation file\r\n");
            else console.log("[SUCCESS][RESOURCE] Installation file has been downloaded\r\n");
        });
    });
}
