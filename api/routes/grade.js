
"use strict";

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
