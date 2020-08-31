
"use strict";

const search = require('./../middleware/search.js');
const profile = require('./../middleware/profile.js');

/**
 * Opens route at /home to send 'index.html' file to user and makes search queries.
 * 
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} path - Path middleware needed to access static files in other directories
 * @param {object} url - URL middleware to parse search queries
 */
exports.openRoute = (app, path) => {
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
            let [querySortColumn, querySortOrder] = search.querySort(request, url);
            const userEmail = url.parse(request.url, true).query.email;
            search.emailValidation(userEmail, client, result, querySearch, queryColumn, true, querySortColumn, querySortOrder);
        } else {
            request.session.reload(error => { if (error) console.log("[FAILURE][UPLOAD] Unable to track number of failed uploads") });
            result.send({ message: request.session.uploadStatus });
        }
    });
}

exports.showExams = (app, url, client) => {
    app.get('/exams', (request, result) => {
        let [querySearch, queryColumn] = search.querySearch(request, url);
        let [querySortColumn, querySortOrder] = search.querySort(request, url);
        const userEmail = url.parse(request.url, true).query.email;
        search.emailValidation(userEmail, client, result, querySearch, queryColumn, false, querySortColumn, querySortOrder);
    });
}

exports.showUsers = (app, url, client) => { app.get('/users', (request, result) => { profile.emailValidation(url.parse(request.url, true).query.email, client, result) }) }
