
"use strict"

exports.uploadToTable = (dataToUpload, rowsToInsert, client, tableToInsertInto, columnsToInsertInto, request) => {
    let valuesToInsert;
    if (tableToInsertInto === "staff") {
        if (dataToUpload[rowsToInsert][5] === "admin") dataToUpload[rowsToInsert][5] = true;
        else dataToUpload[rowsToInsert][5] = false;
        valuesToInsert = [
            `'${dataToUpload[rowsToInsert][0]}'`,
            `'${dataToUpload[rowsToInsert][1]}'`,
            `'${dataToUpload[rowsToInsert][2]}'`,
            `'${dataToUpload[rowsToInsert][3]}'`,
            `'${dataToUpload[rowsToInsert][5]}'`
        ];
    } else {
        valuesToInsert = [
            `'${dataToUpload[rowsToInsert][0]}'`,
            `'${dataToUpload[rowsToInsert][1]}'`,
            `'${dataToUpload[rowsToInsert][2]}'`,
            `'${dataToUpload[rowsToInsert][3]}'`,
            `'${dataToUpload[rowsToInsert][4]}'`
        ];
    }
    client.query(`INSERT INTO ${tableToInsertInto} (${columnsToInsertInto}) VALUES (${valuesToInsert})`, error => {
        if (error) {
            console.log("[FAILURE][UPLOAD] Upload to database has failed");
            request.session.failedUploads++;
            request.session.uploadStatus = `${request.session.failedUploads} upload(s) failed, check your input for possible errors or contact support`;
            request.session.save(err => { if (err) console.log("[FAILURE][RESOURCE] User data for recent upload has not saved correctly") });
        } else console.log("[SUCCESS][UPLOAD] User has submitted upload to database");
    })
}

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
            if (error) console.log("[FAILURE][UPLOAD] Copying uploaded file has failed");
            else {
                fs.readFile(readFileLocation[pathOfFile - 1], (err, data) => {
                    if (err) console.log("[FAILURE][UPLOAD] Copying uploaded file has failed");
                    else {
                        fs.writeFile(`C:\\marking-centre\\public\\files\\${filePathToSave[0]}`, data, e => {
                            if (e) console.log("[FAILURE][UPLOAD] Copying uploaded file has failed");
                            else console.log("[SUCCESS][UPLOAD] File has been copied to correct location");
                        });
                    }
                });
            }
        });
    }
}
