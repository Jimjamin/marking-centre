
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
    else return [null, null];
}

exports.executeSearch = (result, querySearch, queryColumn, userEmail, client) => { 
    let databaseQuery;
    if (queryColumn === "selectAll") {
        databaseQuery = `SELECT * FROM questions WHERE (CAST(student_id AS text) ILIKE '%${querySearch}%' OR CAST(exam_id AS text) ILIKE '%${querySearch}%' OR CAST(question_number AS text) ILIKE '%${querySearch}%' OR teacher_email ILIKE '%${querySearch}%') AND teacher_email='${userEmail}'`;
    } else {
        databaseQuery = `SELECT * FROM questions WHERE CAST(${queryColumn} AS text) ILIKE '%${querySearch}%' AND teacher_email='${userEmail}'`;
    }
    client.query(databaseQuery, (error, response) => {
        if (error) console.log("[FAILURE][SEARCH] Loading of exam jobs for user has failed");
        else {
            result.send(response.rows);
            console.log("[SUCCESS][SEARCH] User has made a search");
        }
    })
}
