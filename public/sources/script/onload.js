
"use strict";

import { buildList } from './../build/searchColumn.js';
import { setupProfile } from './../build/profile.js';
import { makeSearch } from '../modules/search.js';
import { alertMessage } from '../build/alert.js';

const documentSet = () => {
    buildList();
    makeSearch();
    setupProfile();
    const url = `${window.location.protocol}//${window.location.host}/check?upload=true`;
    setTimeout(() => {
        fetch(url)
            .then(response => response.json())
            .then(response => { if (response.message) alertMessage(response.message) })
            .catch(error => alertMessage(error.message))
    }, 1000);
}

export { documentSet }
