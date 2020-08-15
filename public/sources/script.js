
"use strict";

import { authenticateUser, userLogin } from './modules/login.js';
import { createTable } from './modules/table.js';
import { positionBtn } from './build/recordBtn.js';
import { appendSortBtn } from './modules/sort.js';
import { buildList } from './build/searchColumn.js';

window.onload = function() {
    buildList();
    //positionBtn();
    //createTable();
}
