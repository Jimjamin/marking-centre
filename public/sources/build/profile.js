
"use strict";

import { alertMessage, promptMessage } from './alert.js';

/**
 * Deletes specified user from the database
 * 
 * @param {object} userRowToDelete - Current row of the user to be deleted from records
 */
const deleteUser = userRowToDelete => {
    const url = `${window.location.protocol}//${window.location.host}/users`;
    let userToDelete = new FormData();
    userToDelete.append("email_address", userRowToDelete.cells[0].innerHTML);
    const method = {
        body: userToDelete,
        method: "POST"
    };
    fetch(url, method)
        .then(response => response.json())
        .then(response => {
            window.location.reload();
            alertMessage(response.message);
        })
        .catch(error => alertMessage(error.message));
}

/**
 * Creates heading for user profile table
 * 
 * @param {object} tableToAppend - Table to display data in
 */
const profileCreateTableHead = tableToAppend => {
    let headingRow = tableToAppend.insertRow(0);
    const headingCell = ["Email address", "Given name(s)", "Family name(s)", "Admin status"];
    for (let cell in headingCell) headingRow.insertCell(cell).innerHTML = `<b>${headingCell[cell]}</b>`;
}

/**
 * Creates a new row of data to append to user profile table
 * 
 * @param {object} tableToAppend - Table to display data in
 * @param {object} dataToDisplay - List of data to display in said table
 * @param {number} rowID - Current row to be inserted into table
 */
const profileCreateTableBody = (tableToAppend, dataToDisplay, rowID) => {
    let bodyRow = tableToAppend.insertRow(1)
    bodyRow.insertCell(0).innerHTML = dataToDisplay[rowID].email_address;
    bodyRow.insertCell(1).innerHTML = dataToDisplay[rowID].first_name;
    bodyRow.insertCell(2).innerHTML = dataToDisplay[rowID].last_name;
    bodyRow.insertCell(3).innerHTML = dataToDisplay[rowID].is_admin;
    bodyRow.insertCell(4).innerHTML = "&times;";

    // Adds the ability to delete a user
    bodyRow.cells[4].addEventListener("click", () => promptMessage("Are you sure you want to delete this user?", () => deleteUser(bodyRow)));
}

/**
 * Creates profile table to display all current users for an admin user to see
 * 
 * @param {object} dataToDisplay - List of data to display in table 
 */
const profileCreateTable = dataToDisplay => {
    const tableToAppend = document.getElementById("userListProfile");
    if (dataToDisplay.length > 0) {
        profileCreateTableHead(tableToAppend);
        for (let rowID in dataToDisplay) profileCreateTableBody(tableToAppend, dataToDisplay, rowID);
    } else document.getElementById("userTableHeading").remove();
}

/**
 * Sets up profile content peronalised to the user.
 */
const setupProfile = () => {
    const userEmail = localStorage.getItem("userEmail");
    document.getElementById("emailAddressProfile").innerHTML = `Email address: ${userEmail}`;
    const url = `${window.location.protocol}//${window.location.host}/users?email=${userEmail}`;
    fetch(url)
        .then(response => response.json())
        .then(response => profileCreateTable(response))
        .catch(error => alertMessage(error.message))
}

export { setupProfile }
