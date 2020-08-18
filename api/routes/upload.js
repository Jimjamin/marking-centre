
"use strict";

const { request } = require("express");

exports.loadUserFile = (app, formidable, fs, csv) => {
    app.post('/upload/users', (request, result) => {
        let userDataRows = [{ 
            0: "Given Name(s)", 
            1: "Family Name(s)", 
            2: "Email Address",
            3: "Password",
            4: "Password Confirmation",
            5: "Admin Status"
        }];
        const uploadUserForm = formidable({ uploadDir: `${__dirname}/../../public/files/`, keepExtensions: true });
        uploadUserForm.parse(request, (error, fields, files) => {
            if (error) console.log("[FAILURE][UPLOAD] User has not been able to upload user registration CSV file");
            else {
                fs.createReadStream(files.userRegisterFile.path)
                    .pipe(csv({
                        headers: false,
                    }))
                    .on('error', error => console.log("[FAILURE][UPLOAD] User has not been able to upload user registration CSV file"))
                    .on('data', userData => userDataRows.push(userData))
                    .on('end', () => {
                        request.session.uploadSession = userDataRows;
                        console.log("[SUCCESS][UPLOAD] User has uploaded user registration CSV file");
                        result.send({ message: "File has uploaded successfully" });
                    })
            }
        })
    });
}

exports.displayUserFile = (app, path) => {
    app.get('/upload/users', (request, result) => {
        result.sendFile(path.join(__dirname, '../../public/pages/', 'display.html'), error => {
            if (error) console.log("[FAILURE][RESOURCE] User has not received 'display.html'");
            else console.log("[SUCCESS][RESOURCE] User has received 'display.html'");
        });
    });
}

exports.loadCurrentSession = app => app.get('/upload/users/display', (request, result) => result.send(request.session.uploadSession));
