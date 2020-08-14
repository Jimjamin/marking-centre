
"use strict";

import { authenticateUser, userLogin } from './modules/login';
import { createTable } from './modules/table';
import { placeRecordBtn } from './build/recordBtn';

/**
 * Collection of collective functions for use by all pages in the one module.
 */
const script = {

    placeUploadBtn: () => placeRecordBtn(),

    /**
     * Checks for duplicates in data before allowing said data to be printed to table row.
     * 
     * @param {object} res - Array of data to be checked through
     * @param {number} item - Current item in array to compare against for duplicates
     * @returns {boolean} If any duplicates were found
     */
    checkForDuplicates: (res, item) => {
        let match = false;
        if (item !== 0) {
            for (let itemCheck = 0; itemCheck < item; itemCheck++) {
                let test = res[itemCheck];
                let currentItem = res[item];
                const studentID = test.student_id === currentItem.student_id;
                const examID = test.exam_id === currentItem.exam_id;
                const subjectID = test.subject_id === currentItem.subject_id;
                const questionID = test.question_id === currentItem.question_id;
                const teacherID = test.teacher_id === currentItem.teacher_id;
                if (studentID && examID && subjectID && questionID && teacherID) match = true;
                if (match) return match;
            }
        }
        return match;
    },

    populateTable: () => createTable(),

    /**
     * Checks if current item in data can be printed to table row in an Active Jobs table.
     * 
     * @param {object} res - Array of data to be checked through
     * @param {number} item - Current item in array to compare against for duplicates
     * @returns {boolean} If data can be printed to row
     */
    activeJobSort: (res, item) => res[item].exam_id !== null && (item === 0 || !script.checkForDuplicates(res, item)),

    /**
     * This function sort() activates upon order() calling it which depends on the user pressing 
     * the sort button, and will make a call to the server (and by extension the database) for 
     * data ordered by the user's wishes.
     * 
     * @param {string} url - Location on server of where to access necessary data
     * @param {string} prefix - Origin of the sort() request
     * @param {number} lock - Maximum number of records allowed to appear in a single page of the table
     * @param {function} header - Creates table header row and adds the sort buttons
     * @param {function} table - Creates each row of the table except for the header and fills with data
     * @param {string} message_text - What message should be displayed if there is no data to populate the table
     * @param {object} tabled - The pre-existing table itself, prior to being sorted
     */
    sort: function sort(url, headerFunc, tableFunc, messageText, table) {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (typeof res[0] !== "undefined") {
                    let maxItems = script.findMaxTableItems;
                    const path = window.location.pathname;
                    headerFunc();
                    table.deleteRow(1);
                    for (let item = 0; item < maxItems; item++) {
                        if (path === "/active_job" || path === "/marking_centre" || path === "/exam_info" || path === "/job_history") {
                            if (script.activeJobSort()) active_job.table(res, item);
                        } else {
                            tableFunc(res, item);
                        }
                    }
                } else document.getElementById("message").innerHTML = messageText;
            })
            .catch(err => alert(err.message))
    },

    /**
     * Function order() is called upon the user pressing the sort button on any column in any
     * table, and will aim to order the table in either ASC or DESC order depending on what
     * the user has chosen.
     */
    order: function order() {
        const [url, path] = script.sortURL();
        const table = document.getElementById("table");
        const rowCount = table.rows.length;
        for (var i = 1; i < rowCount; i++) {
            table.deleteRow(1);
        }
        const currentOrder = document.getElementById(sortID).innerHTML;
        var header, table, message_text;
        if (path === "/active_job" || path === "/marking_centre") {
            header = active_job.header;
            table = active_job.table;
            message_text = "You currently have no active jobs. Upload a question to mark to create an active job.";
        }
        else if (path === "/job_history") {
            header = job_history.header;
            table = job_history.table;
            message_text = "You currently have no job history. Finish marking a question to see your history.";
        }
        else if (path === "/teacher_info") {
            header = teacher_info.header;
            table = teacher_info.table;
            message_text = "There is currently no teacher info. Add new teacher records to the database to see them here.";
        }
        else if (path === "/student_info") {
            header = student_info.header;
            table = student_info.table;
            message_text = "There is currently no student info. Add new student records to the database to see them here.";
        }
        else if (path === "/subject_info") {
            header = subject_info.header;
            table = subject_info.table;
            message_text = "There is currently no subject info. Add new subject records to the database to see them here.";
        }
        else if (path === "/exam_info") {
            header = exam_info.header;
            table = exam_info.table;
            message_text = "There is currently no exam info. Add new exam records to the database to see them here.";
        }
        if (currentOrder.charCodeAt(0) === 9660) {
            document.getElementById(assn).innerHTML = "&#9650;";
            url += "_dec";
            script.sort(url, headerFunc, tableFunc, messageText, table);
        } else {
            document.getElementById(assn).innerHTML = "&#9660;";
            url += "_asc";
            script.sort(url, prefix, lock, header, table, message_text, tabled);
        }
    },

    /**
     * This function desc_header() is to called to create the heading row of a table, including
     * sort buttons.
     * 
     * @param {object} row - Row to which data is being appended to
     * @param {object} text - Text-node of heading to be placed into cell
     * @param {number} lock - Maximum number of records that can appear on a single table page
     * @param {string} assn - ID to give sorting button upon creation
     */

    desc_header: function desc_header(row, text, lock, assn) {
        var desc = document.createElement("th");
        if (lock !== 5) {
            var desc_order = document.createElement("BUTTON");
            desc_order = script.icon(desc_order, assn);
            desc.appendChild(text);
            desc.appendChild(desc_order);
        }
        else {
            desc.appendChild(text);
        }
        row.appendChild(desc);
    },

    /**
     * Function icon() appends sorting button to table heading cell to allow the user to
     * sort table data in future instances.
     * 
     * @param {object} desc_order - Button element to be appended to cell
     * @param {string} assn - ID to be given to sorting button
     */

    icon: function icon(desc_order, assn) {
        desc_order.addEventListener("click", script.order);
        desc_order.classList.add("order-btn");
        desc_order.classList.add("w3-theme-l4");
        desc_order.id = assn;
        desc_order.innerHTML = "&#9660;";
        return desc_order;
    },

    /**
     * The fucntion desc() will create a table cell with pre-populated data to append
     * to row within current table.
     * 
     * @param {object} row - Row which cell will be appended to
     * @param {object} text - Text-node that will populate cell
     */

    desc: function desc(row, text) {
        var desc = document.createElement("td");
        desc.appendChild(text);
        row.appendChild(desc);
    }

};
