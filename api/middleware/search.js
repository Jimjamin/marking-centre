
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

exports.emailValidation = (userEmail, client) => {
    client.query(`SELECT * FROM staff WHERE email_address='${userEmail}' AND is_admin=true`, (error, response) => {
        if (error) console.log("[FAILURE][SEARCH] Checking for user email address has failed");
        else if (response.rows.length > 0) userEmail = "admin@eq.edu.au";
    });
    let emailCheck = `WHERE teacher_email='${userEmail}'`;
    if (userEmail === "admin@eq.edu.au") emailCheck = "WHERE teacher_email ILIKE '%'";
    return emailCheck;
}

exports.executeSearch = (result, userEmail, querySearch, queryColumn, client) => { 
    let databaseQuery;
    let emailCheck = this.emailValidation(userEmail, client);
    if (queryColumn === "selectAll") {
        databaseQuery = `SELECT * FROM questions ${emailCheck} AND (CAST(student_id AS text) ILIKE '%${querySearch}%' OR CAST(exam_id AS text) ILIKE '%${querySearch}%' OR CAST(question_number AS text) ILIKE '%${querySearch}%' OR teacher_email ILIKE '%${querySearch}%')`;
    } else {
        databaseQuery = `SELECT * FROM questions ${emailCheck} AND CAST(${queryColumn} AS text) ILIKE '%${querySearch}%'`;
    }
    client.query(databaseQuery, (error, response) => {
        if (error) console.log("[FAILURE][SEARCH] Loading of exam jobs for user has failed");
        else {
            result.send(response.rows);
            console.log("[SUCCESS][SEARCH] User has made a search");
        }
    })
}
