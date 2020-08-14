
"use strict";

const noDataFound = () => {
    const noDataMessage = "Upload records to see them here";
    document.getElementById("table").deleteRow(0);
    document.getElementById("message").innerHTML = noDataMessage;
    document.getElementById("search").style.display = "none";
}

const buildTable = res => {
    let nameSpaceLocation = `${path.slice(1, path.length)}`;
    let duplicateFound = false;
    let tableItems = res;
    eval(`${nameSpaceLocation}.createTableHead()`);
    if (tableItems === 0) noDataFound();
    else {
        for (let item in tableItems) {
            if (tableItems[item].exam_id !== null) {
                if (item === 0) eval(`${nameSpaceLocation}.createTableBody(${tableItems, item})`);
                else {
                    duplicateFound = script.checkForDuplicates(tableItems, item);
                    if (duplicateFound) eval(`${nameSpaceLocation}.createTableBody(${tableItems, item})`);
                }
            }
        }
    }
}

const createTable = () => {
    const path = window.location.pathname;
    let url = `${window.location.protocol}//${window.location.host}${path}_desc`;
    fetch(url)
        .then((res) => res.json())
        .then((res) => buildTable(res))
        .catch((err) => alert(err.message))
}

export { createTable }
