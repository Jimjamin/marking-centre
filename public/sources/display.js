
"use strict";

import { loadDisplayTable } from './build/displayTable.js';

window.onload = function() {
    const url = `${window.location.protocol}//${window.location.host}/upload/users/display`;
    fetch(url)
        .then(result => result.json())
        .then(result => loadDisplayTable(result))
        .catch(error => alert(error.message))
}
