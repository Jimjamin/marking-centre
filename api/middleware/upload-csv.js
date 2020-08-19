
"use strict";

exports.parse = (formidable, request, fs, csv, rowsOfData, result) => {
    const uploadUserForm = formidable({ uploadDir: `${__dirname}/../../public/files/`, keepExtensions: true });
    uploadUserForm.parse(request, (error, fields, files) => {
        if (error) console.log("[FAILURE][UPLOAD] User has not been able to upload CSV file");
        else {
            fs.createReadStream(files.recordToUpload.path)
                .pipe(csv({
                    headers: false,
                }))
                .on('error', error => console.log("[FAILURE][UPLOAD] User has not been able to upload CSV file"))
                .on('data', rowData => rowsOfData.push(rowData))
                .on('end', () => {
                    request.session.uploadSession = rowsOfData;
                    console.log("[SUCCESS][UPLOAD] User has uploaded CSV file");
                    result.send({ message: "File has uploaded successfully" });
                })
        }
    })
}
