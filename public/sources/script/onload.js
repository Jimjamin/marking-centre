
"use strict";

import { checkTable } from './../build/recordBtn.js';
//import { appendSortBtn } from './../modules/sort.js';
import { buildList } from './../build/searchColumn.js';
import { setupProfile } from './../build/profile.js';

const documentSet = () => {
    buildList();
    //appendSortBtn();
    setupProfile();
    checkTable();
}

export { documentSet }
