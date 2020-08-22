
"use strict";

import { createTable } from './table.js';

/**
 * Checks to see if a non-null search has been made and updates the fetch URL respectively.
 */
const updateSearch = () => {
    let url = `${window.location.protocol}//${window.location.host}/exams?email=${localStorage.getItem("userEmail")}`;
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
    if (window.location.href !== url) {
        fetch(url)
            .then(response => response.json())
            .then(response => createTable(response))
            .catch(error => alert(error.message))
    }
    else window.location.reload();
}

export { makeSearch }
