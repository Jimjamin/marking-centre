
"use strict";

const createTableHeading = tableToAppend => {
    let headingRow = tableToAppend.insertRow(0);
    const headingCell = ["Exam ID", "Student ID", "Question number", "Teacher email"];
    for (let cell in headingCell) headingRow.insertCell(cell).innerHTML = `<b>${headingCell[cell]}</b>`;
}

const createTableBody = (dataToDisplay, tableToAppend, rowID) => {
    let bodyRow = tableToAppend.insertRow(rowID)
    bodyRow.insertCell(0).innerHTML = dataToDisplay[rowID].exam_id;
    bodyRow.insertCell(1).innerHTML = dataToDisplay[rowID].student_id;
    bodyRow.insertCell(2).innerHTML = dataToDisplay[rowID].question_number;
    bodyRow.insertCell(3).innerHTML = dataToDisplay[rowID].teacher_email;
    bodyRow.addEventListener("click", () => { 
        document.getElementById("markingCentre").data = `../files/${dataToDisplay[rowID].file_locations}`;
        document.getElementById("markingCentre").style.display = "block";
        document.getElementById("backBtn").style.display = "block";
        tableToAppend.style.display = "none";
    });
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
