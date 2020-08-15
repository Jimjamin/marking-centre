
"use strict";

/**
 * Creates the custom URL required to access to sort specified table.
 * 
 * @returns {[string, string]} URL to access data to be sorted at and current path user is on
 */
const sortURL = () => {
    const sortID = this.id;
    const sortBy = sortID.substring(0, sortID.length - 4);
    const currentAddress = `${window.location.protocol}//${window.location.host}`;
    const path = window.location.pathname;
    let url = `${currentAddress}${path}_desc?${sortBy}`;
    if (path === `/marking_centre`) url = `${currentAddress}/active_job_desc?${sortBy}`;
    return [url, path];
}

const sortTable = () => {
    const tableToSort = document.getElementById("table");
    let column = [];
    let index = this.id;
    for (let row in tableToSort.rows) column.push(tableToSort.rows[row].cells[index].innerHTML);
}

const createSortBtn = item => {
    let btn = document.createElement("button");
    btn.innerHTML = '&#9660;';
    btn.id = item;
    btn.classList.add("w3-theme-l4");
    btn.addEventListener("click", sortTable);
    return btn;
}

const appendSortBtn = (row, cell) => row.cells[cell].append(createSortBtn(item));

export { appendSortBtn }
