
"use strict";

import { buildList } from './../build/searchColumn.js';
import { setupProfile } from './../build/profile.js';
import { makeSearch } from '../modules/search.js';

const documentSet = () => {
    buildList();
    setupProfile();
    makeSearch();
    const url = `${window.location.protocol}//${window.location.host}/check?upload=true`;
    setTimeout(() => {
        fetch(url)
            .then(response => response.json())
            .then(response => { if (response.message) alert(response.message) })
            .catch(error => alert(error.message))
    }, 3000);
}

export { documentSet }
