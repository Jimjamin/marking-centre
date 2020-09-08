
"use strict";

const csvUpload = require('./../middleware/upload-csv.js');
const submit = require('./../middleware/submit.js');

/**
 * Allows for display of display page display.html
 * 
 * @param {object} result - Returns result to user
 * @param {object} path - Middleware that allows for access of static files
 */
const callDisplay = (result, path) => {
    result.sendFile(path.join(__dirname, '../../public/pages/', 'display.html'), error => {
        if (error) console.log("[FAILURE][RESOURCE] User has not received 'display.html'");
        else console.log("[SUCCESS][RESOURCE] User has received 'display.html'");
    });
}

/**
 * Loads CSV file or form meant for user upload to prepare for final confirmation of said upload
 * 
 * @param {object} app - Express middleware for opening routes
 * @param {object} url - Allows for parsing of route parameters
 * @param {object} formidable - Formidable middleware to allow for parsing of user input
 * @param {object} fs - Module to allow for the reading and writing of files
 * @param {object} csv - Allows for parsing CSV files into a table
 * @param {object} bcrypt - Allows for hashing and decrypting of passwords
 */
exports.loadUserFile = (app, url, formidable, fs, csv, bcrypt) => {
    app.post('/upload/users', (request, result) => {
        const typeOfUpload = url.parse(request.url, true).query.type;
        let userDataRows = [{
            0: "Given name(s)",
            1: "Family name(s)",
            2: "Email address",
            3: "Password",
            4: "Admin status"
        }];
        if (typeOfUpload === "file") csvUpload.parse(formidable, request, fs, csv, userDataRows, bcrypt, result);
        else {
            const uploadUserForm = formidable();
            uploadUserForm.parse(request, (error, fields) => {
                if (error) console.log("[FAILURE][UPLOAD] User has not been able to upload form");
                else {
                    bcrypt.hash(fields.password, 10, (err, hash) => {
                        if (err) console.log("[FAILURE][UPLOAD] Server has been unable to hash password");
                        else {
                            userDataRows.push({
                                0: fields.givenName,
                                1: fields.familyName,
                                2: fields.emailAddress,
                                3: hash,
                                4: fields.isAdmin
                            });
                            request.session.uploadSession = userDataRows;
                            console.log("[SUCCESS][UPLOAD] User has uploaded form");
                            result.send({ message: "File has uploaded successfully" });
                        }
                    });
                }
            });
        }
    });
}

/**
 * Displays upload of user records that has recently been parsed
 * 
 * @param {object} app - Express middleware for opening routes
 * @param {object} path - Allows for the serving of static files
 */
exports.displayUserFile = (app, path) => { app.get('/upload/users', (request, result) => { callDisplay(result, path); }); }

/**
 * Loads CSV file or form meant for exam upload to prepare for final confirmation of said upload
 *
 * @param {object} app - Express middleware for opening routes
 * @param {object} url - Allows for parsing of route parameters
 * @param {object} formidable - Formidable middleware to allow for parsing of user input
 * @param {object} fs - Module to allow for the reading and writing of files
 * @param {object} csv - Allows for parsing CSV files into a table
 * @param {object} bcrypt - Allows for hashing and decrypting of passwords
 */
exports.loadExamFile = (app, url, formidable, fs, csv, bcrypt) => {
    app.post('/upload/exams', (request, result) => {
        const typeOfUpload = url.parse(request.url, true).query.type;
        let examDataRows = [{
            0: "Student ID",
            1: "Exam ID",
            2: "Teacher email address",
            3: "Question number",
            4: "File location(s)"
        }];
        if (typeOfUpload === "file") csvUpload.parse(formidable, request, fs, csv, examDataRows, bcrypt, result);
        else {
            const uploadUserForm = formidable();
            uploadUserForm.parse(request, (error, fields) => {
                if (error) console.log("[FAILURE][UPLOAD] User has not been able to upload form");
                else {
                    let filePaths = fields.fileLocation.split(':\\');
                    let listOfFileLocations = "";
                    for (let pathToFile = 1; pathToFile < filePaths.length; pathToFile++) {
                        let filePathToSave = filePaths[pathToFile].split('; ')[0];
                        listOfFileLocations += `${filePathToSave}; `;
                    }
                    examDataRows.push({
                        0: fields.studentID,
                        1: fields.examID,
                        2: fields.teacherEmailAddress,
                        3: fields.questionNumber,
                        4: listOfFileLocations
                    });
                    request.session.uploadSession = examDataRows;
                    console.log("[SUCCESS][UPLOAD] User has uploaded form");
                    result.send({ message: "File has uploaded successfully" });
                    submit.uploadToDirectory(fields.fileLocation, fs);
                }
            });
        }
    });
}

/**
 * Displays upload of exam records that has recently been parsed
 *
 * @param {object} app - Express middleware for opening routes
 * @param {object} path - Allows for the serving of static files
 */
exports.displayExamFile = (app, path) => { app.get('/upload/exams', (request, result) => { callDisplay(result, path); }); }

/**
 * Displays table of what database input will look like to user
 * 
 * @param {object} app - Middleware for opening routes
 */
exports.loadCurrentSession = app => app.get('/upload/confirm', (request, result) => result.send(request.session.uploadSession));

/**
 * If user confirms upload, submit upload to database
 * 
 * @param {object} app - Middleware for opening routes
 * @param {object} client - Allows for connection to database
 */
exports.confirmUpload = (app, client, child) => {
    app.get('/upload/submit', (request, result) => {
        const dataToUpload = request.session.uploadSession;
        request.session.failedUploads = 0;
        let tableToInsertInto, columnsToInsertInto;
        if (dataToUpload[0][0] === "Given name(s)") {
            tableToInsertInto = "staff";
            columnsToInsertInto = ["first_name", "last_name", "email_address", "user_password", "is_admin"];
        } else {
            tableToInsertInto = "questions";
            columnsToInsertInto = ["student_ID", "exam_ID", "teacher_email", "question_number", "file_locations"];
        }
        dataToUpload.shift();
        for (let rowsToInsert in dataToUpload) submit.uploadToTable(dataToUpload, rowsToInsert, client, tableToInsertInto, columnsToInsertInto, request);
        result.send({ message: "Records have been uploaded to database" });
        let serveFiles = child.spawn('cmd.exe', ['/c', 'C:\\marking-centre\\exec\\serve-files.bat']);
        serveFiles.on('error', e => console.log("[FAILURE][RESOURCE] Unable to upload files to server"));
        serveFiles.stderr.on('data', error => console.log("[FAILURE][RESOURCE] Unable to upload files to server"));
        serveFiles.on('exit', response => console.log("[SUCCESS][RESOURCE] Uploaded files to server"));
    })
}
