
"use strict";

/**
 * Builds list of search options to allow user to choose column to search through.
 */
const buildList = () => {
    let listToAppend = document.getElementById("searchColumn");
    const listOptions = ["Student ID", "Exam ID", "Teacher email", "Question number"];
    const listValues = ["student_id", "exam_id", "teacher_email", "question_number"];
    for (let option in listOptions) {
        let optionCell = document.createElement("option");
        optionCell.text = listOptions[option];
        optionCell.value = listValues[option];
        listToAppend.add(optionCell);
    }
}

export { buildList }
