
"use strict";

const search = require('./../middleware/search.js');

/**
 * Opens route at /home to send 'index.html' file to user and makes search queries.
 * 
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} path - Path middleware needed to access static files in other directories
 * @param {object} url - URL middleware to parse search queries
 */
exports.openRoute = (app, path, url, client) => {
    app.get('/home', (request, result) => {
        if (request.session.uploadSession) request.session.uploadSession = "";
        result.sendFile(path.join(__dirname, '../../public/pages/', 'index.html'), error => {
            if (error) console.log("[FAILURE][RESOURCE] User has not received 'index.html'");
            else console.log("[SUCCESS][RESOURCE] User has received 'index.html'");
        });
    });
}

exports.validateCriteria = (app, url, client) => {
    app.get('/check', (request, result) => {
        if (url.parse(request.url, true).query.admin) {
            let [querySearch, queryColumn] = search.querySearch(request, url);
            const userEmail = url.parse(request.url, true).query.email;
            if (search.emailValidation(userEmail, client, result, querySearch, queryColumn, true)) result.send({ admin: true });
            else result.send({ admin: false })
        }
    });
}

exports.showExams = (app, url, client) => {
    app.get('/exams', (request, result) => {
        let [querySearch, queryColumn] = search.querySearch(request, url);
        const userEmail = url.parse(request.url, true).query.email;
        search.emailValidation(userEmail, client, result, querySearch, queryColumn, false);
    });
}
