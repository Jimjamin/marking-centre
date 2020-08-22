
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

exports.showExams = (app, url, client) => {
    app.get('/exams', (request, result) => {
        let [querySearch, queryColumn] = search.querySearch(request, url);
        let userEmail = url.parse(request.url, true).query.email;
        if (querySearch) search.executeSearch(result, querySearch, queryColumn, userEmail, client);
        else {
            client.query(`SELECT * FROM questions WHERE teacher_email='${userEmail}'`, (error, response) => {
                if (error) console.log("[FAILURE][SEARCH] Loading of exam jobs for user has failed");
                else {
                    result.send(response.rows);
                    console.log("[SUCCESS][SEARCH] Loading of exam jobs has worked");
                }
            });
        }
    });
}
