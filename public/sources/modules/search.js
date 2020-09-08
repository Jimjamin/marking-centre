
"use strict";

import { createTable } from './table.js';
import { alertMessage } from '../build/alert.js';

/**
 * Checks to see if a non-null search has been made and updates the fetch URL respectively.
 * 
 * @returns {string} Server API to call for requested search from client
 */
const updateSearch = () => {
    let url = `${window.location.protocol}//${window.location.host}/exams?email=${localStorage.getItem("userEmail")}`;
    const sortColumn = window.sessionStorage.getItem("index");
    const sortOrder = window.sessionStorage.getItem("order");
    url += `&sort=${sortColumn}&order=${sortOrder}`;
    const searchQuery = document.getElementById("search").value;
    if (!searchQuery) return url;
    const searchColumn = document.getElementById("searchColumn").value;
    url += `&search=${searchQuery}&column=${searchColumn}`;
    return url;
}

/**
 * Makes query to server based on user's search if it is different to previous search.
 */
const makeSearch = () => {
    const url = updateSearch();
    fetch(url)
        .then(response => response.json())
        .then(response => createTable(response))
        .catch(error => alertMessage(error.message))
}

export { makeSearch }
