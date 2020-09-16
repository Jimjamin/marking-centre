
"use strict"

/**
 * Makes final uploads to database of parsed user input
 * 
 * @param {object} dataToUpload - Current store of data to upload
 * @param {number} rowsToInsert - Current row of store of data to insert
 * @param {object} client - Allows for connection to database
 * @param {string} tableToInsertInto - Name of table data will be inserted into
 * @param {string[]} columnsToInsertInto - List of columns to insert data into 
 * @param {object} request - Current user session
 */
exports.uploadToTable = (dataToUpload, rowsToInsert, client, tableToInsertInto, columnsToInsertInto, request) => {
    let valuesToInsert;
    if (dataToUpload[rowsToInsert][4] === "admin") dataToUpload[rowsToInsert][4] = true;
    else if (!dataToUpload[rowsToInsert][4]) dataToUpload[rowsToInsert][4] = false;
    valuesToInsert = [
        `'${dataToUpload[rowsToInsert][0]}'`,
        `'${dataToUpload[rowsToInsert][1]}'`,
        `'${dataToUpload[rowsToInsert][2]}'`,
        `'${dataToUpload[rowsToInsert][3]}'`,
        `'${dataToUpload[rowsToInsert][4]}'`
    ];
    client.query(`INSERT INTO ${tableToInsertInto} (${columnsToInsertInto}) VALUES (${valuesToInsert})`, error => {
        if (error) {
            console.log("[FAILURE][UPLOAD] Upload to database has failed");
            request.session.failedUploads++;
            request.session.uploadStatus = `${request.session.failedUploads} upload(s) failed, check your input for possible errors or contact support`;
            request.session.save(err => { if (err) console.log("[FAILURE][RESOURCE] User data for recent upload has not saved correctly\r\n") });
        } else console.log("[SUCCESS][UPLOAD] User has submitted upload to database\r\n");
    })
}

/**
 * Uploads any files that require uploading to relevant user directory
 * 
 * @param {string} fileLocation - Stores information on where to save files to
 * @param {object} fs - Module to read and write files with
 */
exports.uploadToDirectory = (fileLocation, fs) => {
    let readFileLocation = fileLocation.split('; ')
    let filePaths = fileLocation.split(':\\');
    for (let pathOfFile = 1; pathOfFile < filePaths.length; pathOfFile++) {
        let filePathToSave = filePaths[pathOfFile].split('; ');
        let arrayOfFolders = [];
        arrayOfFolders[pathOfFile] = filePathToSave[0].split('\\');
        let foldersToCreate = "";
        for (let folder = 0; folder < arrayOfFolders[pathOfFile].length - 1; folder++) foldersToCreate += `\\${arrayOfFolders[pathOfFile][folder]}`;
        fs.mkdir(`C:\\marking-centre\\public\\files${foldersToCreate}`, { recursive: true }, error => {
            if (error) console.log("[FAILURE][UPLOAD] Copying uploaded file has failed\r\n");
            else {
                fs.readFile(readFileLocation[pathOfFile - 1], (err, data) => {
                    if (err) console.log("[FAILURE][UPLOAD] Copying uploaded file has failed\r\n");
                    else {
                        fs.writeFile(`C:\\marking-centre\\public\\files\\${filePathToSave[0]}`, data, e => {
                            if (e) console.log("[FAILURE][UPLOAD] Copying uploaded file has failed\r\n");
                            else console.log("[SUCCESS][UPLOAD] File has been copied to correct location\r\n");
                        });
                    }
                });
            }
        });
    }
}
