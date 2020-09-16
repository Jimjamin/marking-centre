
"use strict";

/**
 * Parses user's fetch into search query to access database.
 * 
 * @param {object} request - User's request to server
 * @param {object} url - URL middleware to parse search queries
 * @returns {string[]} Search query and what columns to search in database
 */
exports.querySearch = (request, url) => {
    const userSearchQuery = url.parse(request.url, true).query;
    if (userSearchQuery.search) return [userSearchQuery.search, userSearchQuery.column];
    else return ["", "selectAll"];
}

/**
 * Parses user's fetch into sort query to access database.
 *
 * @param {object} request - User's request to server
 * @param {object} url - URL middleware to parse sort queries
 * @returns {string[]} Sort query and what columns to sort in database
 */
exports.querySort = (request, url) => {
    const userSortQuery = url.parse(request.url, true).query;
    if (userSortQuery.sort) return [userSortQuery.sort, userSortQuery.order];
    else return [null, null];
}

/**
 * If user is admin, search and sort through list of exam records
 * 
 * @param {string} userEmail - Email address of the user
 * @param {object} client - Allows for connection to database
 * @param {object} result - Returns result to client
 * @param {string} querySearch - Query to search database by
 * @param {string} queryColumn - Column search will be queried by
 * @param {boolean} skipSearch - If to skip search
 * @param {string} querySortColumn - Column to sort by
 * @param {string} querySortOrder - Order to sort column by
 */
exports.emailValidation = (userEmail, client, result, querySearch, queryColumn, skipSearch, querySortColumn, querySortOrder) => {
    client.query(`SELECT * FROM staff WHERE email_address='${userEmail}' AND is_admin=true`, (error, response) => {
        if (error) console.log("[FAILURE][SEARCH] Checking for user email address has failed\r\n");
        else if (response.rows.length > 0) {
            if (!skipSearch) this.executeSearch(result, "WHERE teacher_email ILIKE '%'", querySearch, queryColumn, client, querySortColumn, querySortOrder);
            else result.send({ admin: true });
        } else { 
            if (!skipSearch) this.executeSearch(result, `WHERE teacher_email='${userEmail}'`, querySearch, queryColumn, client, querySortColumn, querySortOrder);
            else result.send({ admin: false });
        }
    });
}

/**
 * Execute search request to server for exam records
 * 
 * @param {object} result - Returns result to client
 * @param {string} emailCheck Ensures user is admin
 * @param {string} querySearch - User's search query to database
 * @param {string} queryColumn - Column to query search by
 * @param {object} client - Allows for connection to database
 * @param {string} querySortColumn - Column to sort exam records by
 * @param {string} querySortOrder - Order to sort column by
 * @param {object} examData - Object storing all pre-saved exam records
 */
exports.executeSearch = (result, emailCheck, querySearch, queryColumn, client, querySortColumn, querySortOrder, examData) => { 
    let databaseQuery, orderQuery = `ORDER BY ${querySortColumn} ${querySortOrder}`;
    if (!querySortColumn) orderQuery = ``;
    if (queryColumn === "selectAll") {
        databaseQuery = `SELECT * FROM questions ${emailCheck} AND (CAST(student_id AS text) ILIKE '%${querySearch}%' OR CAST(exam_id AS text) ILIKE '%${querySearch}%' OR CAST(question_number AS text) ILIKE '%${querySearch}%' OR teacher_email ILIKE '%${querySearch}%') ${orderQuery}`;
    } else databaseQuery = `SELECT * FROM questions ${emailCheck} AND CAST(${queryColumn} AS text) ILIKE '%${querySearch}%' ${orderQuery}`;
    client.query(databaseQuery, (error, response) => {
        if (error) { 
            if (examData) result.send(examData);
            console.log("[FAILURE][SEARCH] Loading of exam jobs for user has failed\r\n");
        } else {
            examData = response.rows;
            result.send(response.rows);
            console.log("[SUCCESS][SEARCH] Loading of exam jobs has worked\r\n");
        }
    });
}
