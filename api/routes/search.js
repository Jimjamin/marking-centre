
"use strict";

/**
 * Parses user's fetch into search query to access database.
 * 
 * @param {object} request - User's request to server
 * @param {object} url - URL middleware to parse search queries
 * @returns {string[]} Search query and what columns to search in database
 */
exports.querySearch = (request, url) => url.parse(request.url, true).search;
