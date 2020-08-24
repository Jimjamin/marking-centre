
"use strict"

import { createTable } from './../modules/table.js';

const checkTable = () => {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const url = `${baseURL}/exams?email=${localStorage.getItem("userEmail")}`;
    fetch(url)
        .then(result => result.json())
        .then(result => createTable(result))
        .catch(error => alert(error.message))
}

export { checkTable }
