
"use strict";

/**
 * Creates heading for display table
 * 
 * @param {object} dataToDisplay - List of data to display in table
 * @param {object} tableToAppend - DOM table to show all said data in
 */
const createTableHeading = (dataToDisplay, tableToAppend) => {
    let headingRow = tableToAppend.insertRow(0);
    for (let cell in dataToDisplay[0]) headingRow.insertCell(cell).innerHTML = `<b>${dataToDisplay[0][cell]}</b>`;
}

/**
 * Appends additional row of data to display table
 * 
 * @param {object} dataToDisplay - List of data to display to table
 * @param {object} tableToAppend - DOM table to show all said data in
 * @param {number} rowID - Current row to be inserted into table
 */
const createTableBody = (dataToDisplay, tableToAppend, rowID) => {
    let bodyRow = tableToAppend.insertRow(rowID);

    // Enforces strict guidelines to ensure no extra unintended rows appear
    for (let cell in dataToDisplay[0]) bodyRow.insertCell(cell).innerHTML = dataToDisplay[rowID][cell];
}

/**
 * Creates table with data to be confirmed to be uploaded to the database
 * 
 * @param {object} dataToDisplay - List of data to display in table
 */
const loadDisplayTable = dataToDisplay => {
    const tableToAppend = document.getElementById("table");
    for (let rowID in dataToDisplay) createTableBody(dataToDisplay, tableToAppend, rowID);
    createTableHeading(dataToDisplay, tableToAppend);
    tableToAppend.deleteRow(1);
}

export { loadDisplayTable }
