
"use strict";

import { authenticateUser, userLogin } from './modules/login.js';
import { createTable } from './modules/table.js';
import { positionBtn } from './build/recordBtn.js';
import { appendSortBtn } from './modules/sort.js';

window.onload = function() {
    positionBtn();
    //createTable();
}
