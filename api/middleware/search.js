
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

exports.querySort = (request, url) => {
    const userSortQuery = url.parse(request.url, true).query;
    if (userSortQuery.sort) return [userSortQuery.sort, userSortQuery.order];
    else return [null, null];
}

exports.emailValidation = (userEmail, client, result, querySearch, queryColumn, skipSearch, querySortColumn, querySortOrder) => {
    client.query(`SELECT * FROM staff WHERE email_address='${userEmail}' AND is_admin=true`, (error, response) => {
        if (error) console.log("[FAILURE][SEARCH] Checking for user email address has failed");
        else if (response.rows.length > 0) {
            if (!skipSearch) this.executeSearch(result, "WHERE teacher_email ILIKE '%'", querySearch, queryColumn, client, querySortColumn, querySortOrder);
            else result.send({ admin: true });
        } else { 
            if (!skipSearch) this.executeSearch(result, `WHERE teacher_email='${userEmail}'`, querySearch, queryColumn, client, querySortColumn, querySortOrder);
            else result.send({ admin: false });
        }
    });
}

exports.executeSearch = (result, emailCheck, querySearch, queryColumn, client, querySortColumn, querySortOrder, examData) => { 
    let databaseQuery, orderQuery = `ORDER BY ${querySortColumn} ${querySortOrder}`;
    if (!querySortColumn) orderQuery = ``;
    if (queryColumn === "selectAll") {
        databaseQuery = `SELECT * FROM questions ${emailCheck} AND (CAST(student_id AS text) ILIKE '%${querySearch}%' OR CAST(exam_id AS text) ILIKE '%${querySearch}%' OR CAST(question_number AS text) ILIKE '%${querySearch}%' OR teacher_email ILIKE '%${querySearch}%') ${orderQuery}`;
    } else databaseQuery = `SELECT * FROM questions ${emailCheck} AND CAST(${queryColumn} AS text) ILIKE '%${querySearch}%' ${orderQuery}`;
    client.query(databaseQuery, (error, response) => {
        if (error) { 
            if (examData) result.send(examData);
            console.log("[FAILURE][SEARCH] Loading of exam jobs for user has failed");
        } else {
            examData = response.rows;
            result.send(response.rows);
            console.log("[SUCCESS][SEARCH] Loading of exam jobs has worked");
        }
    });
}
