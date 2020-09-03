
"use strict";

const submit = require('./submit.js');

/**
 * Async functions to hash password to be stored in database
 * 
 * @param {object} bcrypt - Hashing and decrypting for plain-text passwords
 * @param {string} passwordToHash - Plain-text password to hash
 */
const passwordHashingAsync = async (bcrypt, passwordToHash) => {
    let hashedPassword = await bcrypt.hash(passwordToHash, 10);
    console.log(hashedPassword);
    return hashedPassword;
}

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
        if (error) console.log("[FAILURE][UPLOAD] User has not been able to upload CSV file");
        else {
            fs.createReadStream(files.recordToUpload.path)
                .pipe(csv({
                    headers: false,
                }))
                .on('error', error => console.log("[FAILURE][UPLOAD] User has not been able to upload CSV file"))
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
                        let hashedPassword = passwordHashingAsync(bcrypt, rowData[3]);
                        rowsOfData.push({
                            0: rowData[0],
                            1: rowData[1],
                            2: rowData[2],
                            3: hashedPassword,
                            4: rowData[5]
                        });
                    }
                })
                .on('end', () => {
                    request.session.uploadSession = rowsOfData;
                    console.log("[SUCCESS][UPLOAD] User has uploaded CSV file");
                    result.send({ message: "File has uploaded successfully" });
                })
        }
    });
}
