
"use strict";

//import { createTable } from './../modules/table.js';
import { positionBtn } from './../build/recordBtn.js';
//import { appendSortBtn } from './../modules/sort.js';
import { buildList } from './../build/searchColumn.js';
import { setupProfile } from './../build/profile.js';

const documentSet = () => {
    buildList();
    positionBtn();
    //createTable();
    //appendSortBtn();
    setupProfile();
}

export { documentSet }
