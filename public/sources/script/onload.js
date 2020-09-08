
"use strict";

import { buildList } from './../build/searchColumn.js';
import { setupProfile } from './../build/profile.js';
import { makeSearch } from '../modules/search.js';
import { alertMessage } from '../build/alert.js';
import { checkForOfflineGrades } from '../build/recordBtn.js';

/**
 * Calls various functions to initiliase home page for user
 */
const documentSet = () => {
    buildList();
    makeSearch();
    setupProfile();

    // Checks for status of possible previous upload after one second to inform the user of the status of this upload
    setTimeout(() => {
        const url = `${window.location.protocol}//${window.location.host}/check?upload=true`;
        fetch(url)
            .then(response => response.json())
            .then(response => { if (response.message) alertMessage(response.message) })
            .catch(error => alertMessage(error.message))
    }, 1000);
    
    checkForOfflineGrades();
}

export { documentSet }
