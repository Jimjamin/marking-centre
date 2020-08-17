
"use strict";

/**
 * Checks to see if a non-null search has been made and updates the fetch URL respectively.
 */
const updateSearch = () => {
    let url = `${window.location.protocol}//${window.location.host}/home`;
    const searchQuery = document.getElementById("search").value;
    if (!searchQuery) return url;
    const searchColumn = document.getElementById("searchColumn").value;
    url += `?search=${searchQuery}&column=${searchColumn}`;
    return url;
}

/**
 * Makes query to server based on user's search if it is different to previous search.
 */
const makeSearch = () => {
    const url = updateSearch();
    if(url !== window.location.href) {
        fetch(url)
            .then(() => document.getElementById("test").innerHTML = "Success!")
            .catch(error => alert(error.message))
    }
}

export { makeSearch }
