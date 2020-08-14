
"use strict";

const activeJob = {

    createTableHead: () => {
        const tableToAppend = document.getElementById("table");
        let headingRow = tableToAppend.insertRow(0);
        let headingCells = ["Student ID", "Student Name", "Exam Name", "Teacher ID", "Teacher Name", 
            "Question ID"];
        for (let cell in headingCells) {
            headingRow.insertCell(cell).innerHTML = headingCells[cell];
            script.appendSortBtn(headingRow, cell);
        }
        headingRow.classList.add("w3-theme-l4");
    },

    createTableBody: (tableItems, item) => {
        const tableToAppend = document.getElementById("table");
        let bodyRow = tableToAppend.insertRow(item + 1);
        let bodyCells = [tableItems[item].student_id, tableItems[item].student_name, 
            tableItems[item].exam_name, tableItems[item].teacher_id, tableItems[item].teacher_name, 
            tableItems[item].question_id];
        for (let cell in bodyCells) bodyRow.insertCell(cell).innerHTML = bodyCells[cell];
    }

}

