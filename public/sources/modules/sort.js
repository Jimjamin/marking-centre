
"use strict";

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
