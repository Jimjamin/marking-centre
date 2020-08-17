
"use strict";

/**
 * If no data is found to display in table, reflect this in state of app.
 */
const noDataFound = () => {
    const noDataMessage = "Upload exam questions to see them here";
    document.getElementById("table").deleteRow(0);
    document.getElementById("message").innerHTML = noDataMessage;
    document.getElementById("search").style.display = "none";
}

/**
 * Creates heading row for table.
 */
const createTableHead = () => {
    const tableToAppend = document.getElementById("table");
    let headingRow = tableToAppend.insertRow(0);
    let headingCells = ["Student ID", "Student Name", "Exam Name", "Teacher ID", "Teacher Name",
        "Question ID"];
    for (let cell in headingCells) {
        headingRow.insertCell(cell).innerHTML = headingCells[cell];
        script.appendSortBtn(headingRow, cell);
    }
    headingRow.classList.add("w3-theme-l4");
}

/**
 * Creates body rows for table.
 * 
 * @param {object[]} tableItems - Collection of data to be printed to table
 * @param {number} item - Current row in table to be printed in this iteration
 */
const createTableBody = (tableItems, item) => {
    const tableToAppend = document.getElementById("table");
    let bodyRow = tableToAppend.insertRow(item + 1);
    let bodyCells = [tableItems[item].student_id, tableItems[item].student_name,
    tableItems[item].exam_name, tableItems[item].teacher_id, tableItems[item].teacher_name,
    tableItems[item].question_id];
    for (let cell in bodyCells) bodyRow.insertCell(cell).innerHTML = bodyCells[cell];
}

/**
 * Checks for duplicates in data before allowing said data to be printed to table row.
 * 
 * @param {object} tableItems - Array of data to be checked through
 * @param {number} item - Current item in array to compare against for duplicates
 * @returns {boolean} If any duplicates were found
 */
const checkForDuplicates = (tableItems, item) => {
    if (item !== 0) {
        for (let itemCheck = 0; itemCheck < item; itemCheck++) {
            let test = tableItems[itemCheck];
            let currentItem = tableItems[item];
            const studentID = test.student_id === currentItem.student_id;
            const examID = test.exam_id === currentItem.exam_id;
            const subjectID = test.subject_id === currentItem.subject_id;
            const questionID = test.question_id === currentItem.question_id;
            const teacherID = test.teacher_id === currentItem.teacher_id;
            if (studentID && examID && subjectID && questionID && teacherID) return true;
        }
    }
    return false;
}

/**
 * Will build table from nothing with data provided by server.
 * 
 * @param {object[]} res - Collection of data to be printed to table
 */
const buildTable = res => {
    let duplicateFound = false;
    let tableItems = res;
    createTableHead();
    if (tableItems === 0) noDataFound();
    else {
        for (let item in tableItems) {
            if (tableItems[item].exam_id !== null && item === 0) createTableBody(tableItems, item);
            else if (tableItems[item].exam_id !== null) {
                duplicateFound = checkForDuplicates(tableItems, item);
                if (duplicateFound) createTableBody(tableItems, item);
            }
        }
    }
}

/**
 * Makes call to server for table data, and upon successful fetch will build table from said data.
 */
const createTable = () => {
    let url = "http://localhost:3000/exams"
    fetch(url)
        .then((res) => res.json())
        .then((res) => buildTable(res))
        .catch((err) => alert(err.message))
}

export { createTable }
