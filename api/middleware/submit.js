
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
