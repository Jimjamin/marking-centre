
"use strict";

const createTableHeading = tableToAppend => {
    let headingRow = tableToAppend.insertRow(0);
    const headingCell = ["Exam ID", "Student ID", "Question number", "Teacher email"];
    for (let cell in headingCell) headingRow.insertCell(cell).innerHTML = `<b>${headingCell[cell]}</b>`;
}

const onRecordClick = (dataToDisplay, tableToAppend, rowID) => {
    let filePaths = dataToDisplay[rowID].file_locations.split(';');
    for (let file in filePaths) {
        if (filePaths[file] !== " ") {
            let objectToDisplay = document.createElement("object");
            objectToDisplay.data = `../files/${filePaths[file].trim()}`;
            objectToDisplay.width = "60%";
            objectToDisplay.border = "3";
            objectToDisplay.style.display = "block";
            document.getElementById("backBtn").style.display = "block";
            document.getElementById("commentBtn").style.display = "block";
            tableToAppend.style.display = "none";
            document.getElementById("markingCentreDisplay").append(objectToDisplay);
            window.sessionStorage.setItem("questionNumber", dataToDisplay[rowID].question_number);
            window.sessionStorage.setItem("studentID", dataToDisplay[rowID].student_id);
            window.sessionStorage.setItem("examID", dataToDisplay[rowID].exam_id);
            window.sessionStorage.setItem("teacherEmail", dataToDisplay[rowID].teacher_email);
            document.getElementById("gradeInput").value = dataToDisplay[rowID].grade;
            document.getElementById("commentInput").value = dataToDisplay[rowID].comments;
        }
    }
}

const createTableBody = (dataToDisplay, tableToAppend, rowID) => {
    let bodyRow = tableToAppend.insertRow(rowID)
    bodyRow.insertCell(0).innerHTML = dataToDisplay[rowID].exam_id;
    bodyRow.insertCell(1).innerHTML = dataToDisplay[rowID].student_id;
    bodyRow.insertCell(2).innerHTML = dataToDisplay[rowID].question_number;
    bodyRow.insertCell(3).innerHTML = dataToDisplay[rowID].teacher_email;
    bodyRow.addEventListener("click", () => onRecordClick(dataToDisplay, tableToAppend, rowID));
}

/**
 * Makes call to server for table data, and upon successful fetch will build table from said data.
 */
const createTable = dataToDisplay => {
    if (dataToDisplay.length > 0) {
        const tableToAppend = document.getElementById("table");
        tableToAppend.innerHTML = "";
        for (let rowID in dataToDisplay) createTableBody(dataToDisplay, tableToAppend, rowID);
        createTableHeading(tableToAppend);
    }
}

export { createTable }
