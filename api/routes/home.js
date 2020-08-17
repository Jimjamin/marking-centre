
"use strict";

const search = require('./search.js');

/**
 * Opens route at /home to send 'index.html' file to user and makes search queries.
 * 
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} path - Path middleware needed to access static files in other directories
 * @param {object} url - URL middleware to parse search queries
 */
exports.openRoute = (app, path, url) => {
    app.get('/home', (request, result, next) => {
        let querySearch = "";
        if (request.url.includes('?')) {
            querySearch = search.querySearch(request, url);
            console.log("[SUCCESS][SEARCH] User has made a search");
        }
        result.sendFile(path.join(__dirname, '../../public/pages/', 'index.html'), error => {
            if (error) console.log("[FAILURE][RESOURCE] User has not received 'index.html'");
            else console.log("[SUCCESS][RESOURCE] User has received 'index.html'");
        });
    });
}
