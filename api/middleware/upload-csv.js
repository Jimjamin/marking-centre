
"use strict";

const submit = require('./submit.js');

exports.parse = (formidable, request, fs, csv, rowsOfData, result) => {
    const uploadUserForm = formidable();
    uploadUserForm.parse(request, (error, fields, files) => {
        if (error) console.log("[FAILURE][UPLOAD] User has not been able to upload CSV file");
        else {
            fs.createReadStream(files.recordToUpload.path)
                .pipe(csv({
                    headers: false,
                }))
                .on('error', error => console.log("[FAILURE][UPLOAD] User has not been able to upload CSV file"))
                .on('data', rowData => {
                    if (rowsOfData[0][0] === "Student ID") {
                        let filePaths = rowData[4].split(':\\').split('; ');
                        let listOfFileLocations = "";
                        for (let pathToFile = 1; pathToFile < filePaths.length; pathToFile++) {
                            let filePathToSave = filePaths[pathToFile].split('; ')[1];
                            listOfFileLocations += `${filePathToSave}; `;
                        }
                        rowsOfData.push({
                            0: rowData[0], 
                            1: rowData[1], 
                            2: rowData[2], 
                            3: rowData[3],
                            4: listOfFileLocations
                        });
                        submit.uploadToDirectory(rowData[4], fs);
                    } else rowsOfData.push(rowData);
                })
                .on('end', () => {
                    request.session.uploadSession = rowsOfData;
                    console.log("[SUCCESS][UPLOAD] User has uploaded CSV file");
                    result.send({ message: "File has uploaded successfully" });
                })
        }
    });
}
