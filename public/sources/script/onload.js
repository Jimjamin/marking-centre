
"use strict";

import { buildList } from './../build/searchColumn.js';
import { setupProfile } from './../build/profile.js';
import { makeSearch } from '../modules/search.js';

const documentSet = () => {
    buildList();
    setupProfile();
    makeSearch();
}

export { documentSet }
