
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
    var uploadStatus;
    client.query(`INSERT INTO ${tableToInsertInto} (${columnsToInsertInto}) VALUES (${valuesToInsert})`, error => {
        if (error) {
            console.log("[FAILURE][UPLOAD] Upload to database has failed");
            request.session.failedUploads++
            uploadStatus = `${request.session.failedUploads} upload(s) failed, check your file for possible errors or contact support`;
            console.log(uploadStatus);
        } else console.log("[SUCCESS][UPLOAD] User has submitted upload to database");
    })
    return uploadStatus;
}

exports.uploadToDirectory = (fields, fs) => {
    let arrayOfFolders = fields.fileLocation.split('\\');
    let foldersToCreate = "";
    for (let folder = 1; folder < arrayOfFolders.length - 1; folder++) foldersToCreate += `\\${arrayOfFolders[folder]}`;
    fs.mkdir(`C:\\marking-centre\\public\\files${foldersToCreate}`, { recursive: true }, error => {
        if (error) console.log("[FAILURE][UPLOAD] Copying uploaded file has failed");
        else {
            fs.readFile(fields.fileLocation, (err, data) => {
                if (err) console.log("[FAILURE][UPLOAD] Copying uploaded file has failed");
                else {
                    let fileData = data;
                    fs.writeFile(`C:\\marking-centre\\public\\files\\${fields.fileLocation.split(':\\')[1]}`, fileData, e => {
                        if (e) console.log("[FAILURE][UPLOAD] Copying uploaded file has failed");
                        else console.log("[SUCCESS][UPLOAD] File has been copied to correct location");
                    });
                }
            });
        }
    });
}
