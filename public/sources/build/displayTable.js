
"use strict";

const createTableHeading = (dataToDisplay, tableToAppend) => {
    let headingRow = tableToAppend.insertRow(0);
    for (let cell in dataToDisplay[0]) headingRow.insertCell(cell).innerHTML = `<b>${dataToDisplay[0][cell]}</b>`;
}

const createTableBody = (dataToDisplay, tableToAppend, rowID) => {
    let bodyRow = tableToAppend.insertRow(rowID);
    // Enforces strict guidelines to ensure no extra unintended rows appear
    for (let cell in dataToDisplay[0]) bodyRow.insertCell(cell).innerHTML = dataToDisplay[rowID][cell];
}

const loadDisplayTable = dataToDisplay => {
    const tableToAppend = document.getElementById("table");
    for (let rowID in dataToDisplay) createTableBody(dataToDisplay, tableToAppend, rowID);
    createTableHeading(dataToDisplay, tableToAppend);
    tableToAppend.deleteRow(1);
}

export { loadDisplayTable }
