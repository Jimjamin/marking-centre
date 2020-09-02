
"use strict";

import { makeSearch } from './search.js';

const sortTable = index => {
    let order;
    if (document.getElementById(index).innerHTML === '▼') {
        order = "DESC";
        document.getElementById(index).innerHTML = '&#9650;';
    } else {
        order = "ASC";
        document.getElementById(index).innerHTML = '&#9660;';
    }
    window.sessionStorage.setItem("order", order);
    window.sessionStorage.setItem("index", index);
    if (index === "email_address" || index === "first_name" || index === "last_name" || index === "is_admin") window.sessionStorage.setItem("isRootUsers", true)
    makeSearch();
}

const createSortBtn = item => {
    let btn = document.createElement("button");
    btn.innerHTML = '&#9660;';
    btn.id = item;
    btn.addEventListener("click", () => sortTable(item));
    btn.classList.add("w3-button")
    return btn;
}

const appendSortBtn = (row, cell, item) => row.cells[cell].append(createSortBtn(item));

export { appendSortBtn }
