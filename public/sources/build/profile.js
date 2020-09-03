
"use strict";

import { alertMessage, promptMessage } from './alert.js';

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

const profileCreateTableHead = tableToAppend => {
    let headingRow = tableToAppend.insertRow(0);
    const headingCell = ["Email address", "Given name(s)", "Family name(s)", "Admin status"];
    for (let cell in headingCell) headingRow.insertCell(cell).innerHTML = `<b>${headingCell[cell]}</b>`;
}

const profileCreateTableBody = (tableToAppend, dataToDisplay, rowID) => {
    let bodyRow = tableToAppend.insertRow(1)
    bodyRow.insertCell(0).innerHTML = dataToDisplay[rowID].email_address;
    bodyRow.insertCell(1).innerHTML = dataToDisplay[rowID].first_name;
    bodyRow.insertCell(2).innerHTML = dataToDisplay[rowID].last_name;
    bodyRow.insertCell(3).innerHTML = dataToDisplay[rowID].is_admin;
    bodyRow.insertCell(4).innerHTML = "&times;";
    bodyRow.cells[4].addEventListener("click", () => promptMessage("Are you sure you want to delete this user?", () => deleteUser(bodyRow)));
}

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
