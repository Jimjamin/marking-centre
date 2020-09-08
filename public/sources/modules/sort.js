
"use strict";

import { makeSearch } from './search.js';

/**
 * Sorts table by column and order
 * 
 * @param {string} index - Name of the column to be sorted
 */
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
    makeSearch();
}

/**
 * Creates sort button that can be used for future sorting
 * 
 * @param {string} item - Name of the column to be sorted
 */
const createSortBtn = item => {
    let btn = document.createElement("button");
    btn.innerHTML = '&#9660;';
    btn.id = item;
    btn.addEventListener("click", () => sortTable(item));
    btn.classList.add("w3-button")
    return btn;
}

/**
 * Creates and appends a sort button to a heading cell in some table
 * 
 * @param {object} row Row element to add sort buttons to
 * @param {number} cell - ID of cell to add sort button to
 * @param {string} item - Name of column to be sorted by this button
 */
const appendSortBtn = (row, cell, item) => row.cells[cell].append(createSortBtn(item));

export { appendSortBtn }
