
"use strict"

exports.uploadToTable = (dataToUpload, rowsToInsert, client, tableToInsertInto, columnsToInsertInto) => {
    let valuesToInsert, statusOfUpload;
    let insertQuery = `INSERT INTO ${tableToInsertInto} (${columnsToInsertInto}) VALUES ($1, $2, $3, $4, $5)`;
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
    client.query(insertQuery, valuesToInsert, (error, response) => {
        if (error) {
            console.log("[FAILURE][UPLOAD] Upload to database has failed");
            statusOfUpload = false;
        } else {
            console.log("[SUCCESS][UPLOAD] User has submitted upload to database");
            statusOfUpload = true;
        }
    })
    return statusOfUpload
}
