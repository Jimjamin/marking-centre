
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

exports.executeSearch = (result, querySearch, queryColumn) => { 
    console.log("[SUCCESS][SEARCH] User has made a search");
    const queryToExecute = `Search: ${querySearch}, Column: ${queryColumn}`;
    result.send({ searchData: queryToExecute });
}
