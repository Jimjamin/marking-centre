
"use strict";

//import { createTable } from './../modules/table.js';
import { positionBtn, checkTable, checkUpload } from './../build/recordBtn.js';
//import { appendSortBtn } from './../modules/sort.js';
import { buildList } from './../build/searchColumn.js';
import { setupProfile } from './../build/profile.js';

const documentSet = () => {
    buildList();
    if (localStorage.getItem("userEmail") !== "admin@eq.edu.au") document.getElementById("upload").style.display = "none";
    else positionBtn();
    //createTable();
    //appendSortBtn();
    setupProfile();
    checkTable();
    checkUpload();
}

export { documentSet }
