
"use strict";

const submit = require('./submit.js');

/**
 * Allows for the processing of CSV records upload into correct format for final confirmation
 * 
 * @param {object} formidable - Parses user input
 * @param {object} request - Current user session
 * @param {object} fs - Module for reading and writing files
 * @param {object} csv - Parses CSV files into table
 * @param {object} rowsOfData - Current object of all data to be uploaded
 * @param {object} bcrypt - Hashes and decrypts plain-text passwords
 * @param {object} result - Object to return to user
 */
exports.parse = (formidable, request, fs, csv, rowsOfData, bcrypt, result) => {
    const uploadUserForm = formidable();
    uploadUserForm.parse(request, (error, fields, files) => {
        if (error) console.log("[FAILURE][UPLOAD] User has not been able to upload CSV file\r\n");
        else {
            new Promise((resolve, reject) => {
                let hashPromises = [];
                fs.createReadStream(files.recordToUpload.path)
                    .pipe(csv({
                        headers: false,
                    }))
                    .on('error', error => {
                        console.log("[FAILURE][UPLOAD] User has not been able to upload CSV file\r\n");
                        reject();
                    })
                    .on('data', rowData => {
                        if (rowsOfData[0][0] === "Student ID") {
                            let filePaths = rowData[4].split(':\\');
                            let listOfFileLocations = "";
                            for (let pathToFile = 1; pathToFile < filePaths.length; pathToFile++) {
                                let filePathToSave = filePaths[pathToFile].split('; ')[0];
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
                        } else {
                            hashPromises.push(new Promise((resolve, reject) => {
                                bcrypt.hash(rowData[3], 10, (err, hash) => {
                                    if (err) {
                                        console.log("[FAILURE][UPLOAD] Server has been unable to hash password\r\n");
                                        reject();
                                    } else {
                                        rowsOfData.push({
                                            0: rowData[0],
                                            1: rowData[1],
                                            2: rowData[2],
                                            3: hash,
                                            4: rowData[5]
                                        });
                                        resolve();
                                    }
                                });
                            }));
                        }
                    })
                    .on('end', async () => {
                        await Promise.all(hashPromises);
                        request.session.uploadSession = rowsOfData;
                        console.log("[SUCCESS][UPLOAD] User has uploaded CSV file\r\n");
                        result.send({ message: "File has uploaded successfully" });
                        resolve();
                    })
            })
        }
    });
}
