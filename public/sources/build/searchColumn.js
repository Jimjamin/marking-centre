
"use strict";

const buildList = () => {
    let listToAppend = document.getElementById("searchColumn");
    const listOptions = ["Student ID", "Student Name", "Exam Name", "Teacher ID", "Teacher Name",
        "Question ID"];
    const listValues = ["studentID", "studentName", "examName", "teacherID", "teacherName", 
        "questionID"];
    for (let option in listOptions) {
        let optionCell = document.createElement("option");
        optionCell.text = listOptions[option];
        optionCell.value = listValues[option];
        listToAppend.add(optionCell);
    }
}

export { buildList }
