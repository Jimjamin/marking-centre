
"use strict";

import { appendSortBtn } from './sort.js'

const createTableHeading = tableToAppend => {
    let headingRow = tableToAppend.insertRow(0);
    const headingCell = ["Exam ID", "Student ID", "Question number", "Teacher email"];
    const headingBtn = ["exam_id", "student_id", "question_number", "teacher_email"];
    for (let cell in headingCell) { 
        headingRow.insertCell(cell).innerHTML = `<b>${headingCell[cell]}</b>`;
        appendSortBtn(headingRow, cell, headingBtn[cell]);
    }
}

const onRecordClick = (dataToDisplay, rowID) => {
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
            document.getElementById("table").style.display = "none";
            document.getElementById("activeJobsTable").style.border = "none";
            document.getElementById("activeJobsTable").style.boxShadow = "none";
            document.getElementById("tableGrade").style.display = "none";
            document.getElementById("completedJobsTable").style.border = "none";
            document.getElementById("completedJobsTable").style.boxShadow = "none";
            for (let element of document.getElementsByClassName("table-heading")) element.style.display = "none";
            for (let element of document.getElementsByClassName("table-heading-2")) element.style.display = "none";
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
    let bodyRow = tableToAppend.insertRow(1)
    bodyRow.insertCell(0).innerHTML = dataToDisplay[rowID].exam_id;
    bodyRow.insertCell(1).innerHTML = dataToDisplay[rowID].student_id;
    bodyRow.insertCell(2).innerHTML = dataToDisplay[rowID].question_number;
    bodyRow.insertCell(3).innerHTML = dataToDisplay[rowID].teacher_email;
    bodyRow.addEventListener("click", () => onRecordClick(dataToDisplay, rowID));
}

const addingTable = (tableToAppend, dataToDisplay) => {
    for (let row in tableToAppend.rows) if (tableToAppend.rows.length > 1) tableToAppend.deleteRow(1);
    if (tableToAppend.rows.length === 0) createTableHeading(tableToAppend);
    for (let rowID in dataToDisplay) createTableBody(dataToDisplay, tableToAppend, rowID);
}

/**
 * Makes call to server for table data, and upon successful fetch will build table from said data.
 */
const createTable = dataToDisplay => {
    const tableToAppend = document.getElementById("table");
    const otherTableToAppend = document.getElementById("tableGrade");
    let noGradeData = [];
    let gradeData = [];
    for (let row in dataToDisplay) {
        if (!dataToDisplay[row].grade) noGradeData.push(dataToDisplay[row]);
        else gradeData.push(dataToDisplay[row]);
    }
    if (dataToDisplay.length > 0) {
        addingTable(tableToAppend, noGradeData);
        document.getElementById("activeJobsTable").style.border = "2px #003C07 solid";
        addingTable(otherTableToAppend, gradeData);
        document.getElementById("completedJobsTable").style.border = "2px #003C07 solid";
    } else {
        tableToAppend.innerHTML = "";
        document.getElementById("activeJobsTable").style.border = "none";
        otherTableToAppend.innerHTML = "";
        document.getElementById("completedJobsTable").style.border = "none";
    }
}

export { createTable }
