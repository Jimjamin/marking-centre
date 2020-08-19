
"use strict";

const csvUpload = require('./../middleware/upload-csv.js');

const callDisplay = (result, path) => {
    result.sendFile(path.join(__dirname, '../../public/pages/', 'display.html'), error => {
        if (error) console.log("[FAILURE][RESOURCE] User has not received 'display.html'");
        else console.log("[SUCCESS][RESOURCE] User has received 'display.html'");
    });
}

exports.loadUserFile = (app, url, formidable, fs, csv) => {
    app.post('/upload/users', (request, result) => {
        const typeOfUpload = url.parse(request.url, true).query.type;
        let userDataRows = [{
            0: "Given Name(s)",
            1: "Family Name(s)",
            2: "Email Address",
            3: "Password",
            4: "Password Confirmation",
            5: "Admin Status"
        }];
        if (typeOfUpload === "file") csvUpload.parse(formidable, request, fs, csv, userDataRows, result);
        else {
            const uploadUserForm = formidable();
            uploadUserForm.parse(request, (error, fields) => {
                if (error) console.log("[FAILURE][UPLOAD] User has not been able to upload form");
                userDataRows.push({
                    0: fields.givenName,
                    1: fields.familyName,
                    2: fields.emailAddress,
                    3: fields.password,
                    4: fields.passwordConfirm,
                    5: fields.isAdmin
                });
                request.session.uploadSession = userDataRows;
                console.log("[SUCCESS][UPLOAD] User has uploaded form");
                result.send({ message: "File has uploaded successfully" });
            });
        }
    });
}

exports.displayUserFile = (app, path) => {
    app.get('/upload/users', (request, result) => {
        callDisplay(result, path);
    });
}

exports.loadExamFile = (app, url, formidable, fs, csv) => {
    app.post('/upload/exams', (request, result) => {
        const typeOfUpload = url.parse(request.url, true).query.type;
        let examDataRows = [{
            0: "Student ID",
            1: "Exam ID",
            2: "Teacher email address",
            3: "Question number",
            4: "File location(s)"
        }];
        if (typeOfUpload === "file") csvUpload.parse(formidable, request, fs, csv, examDataRows, result);
        else {
            const uploadUserForm = formidable();
            uploadUserForm.parse(request, (error, fields) => {
                if (error) console.log("[FAILURE][UPLOAD] User has not been able to upload form");
                examDataRows.push({
                    0: fields.studentID,
                    1: fields.examID,
                    2: fields.teacherEmailAddress,
                    3: fields.questionNumber,
                    4: fields.fileLocation
                });
                request.session.uploadSession = examDataRows;
                console.log("[SUCCESS][UPLOAD] User has uploaded form");
                result.send({ message: "File has uploaded successfully" });
            });
        }
    });
}

exports.displayExamFile = (app, path) => {
    app.get('/upload/exams', (request, result) => {
        callDisplay(result, path);
    });
}

exports.loadCurrentSession = app => app.get('/upload/confirm', (request, result) => result.send(request.session.uploadSession));

exports.confirmUpload = app => {
    app.get('/upload/submit', (request, result) => {
        console.log("[SUCCESS][UPLOAD] User has submitted upload to database");
        result.send({ message: "File has uploaded successfully" });
    })
}
