
"use strict";

/**
 * Allows for teacher to upload marks for exam question to database
 * 
 * @param {object} app - Express middleware for opening routes
 * @param {object} formidable - Formidable middleware for processing user input
 * @param {object} client - pSQL middleware for connecting to database
 */
exports.uploadTeacherGrade = (app, formidable, client) => {
    app.post('/grades', (request, result) => {
        const gradesToSave = formidable();
        gradesToSave.parse(request, (error, fields) => {
            if (error) console.log("[FAILURE][UPLOAD] Grades were not saved");
            else {
                const query = `UPDATE questions SET grade='${fields.grade}', comments='${fields.comment}' WHERE question_number='${fields.questionNumber}' AND student_id='${fields.studentID}' AND exam_id='${fields.examID}' AND teacher_email='${fields.teacherEmail}'`;
                client.query(query, err => {
                    if (err) console.log("[FAILURE][UPLOAD] Grades were not saved");
                    else result.send({ message: "Grading has been saved" });
                })
            }
        });
    })
}
