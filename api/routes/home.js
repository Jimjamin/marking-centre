
"use strict";

const search = require('./../middleware/search.js');
const profile = require('./../middleware/profile.js');

/**
 * Opens route at /home to send 'index.html' file to user and makes search queries.
 * 
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} path - Path middleware needed to access static files in other directories
 */
exports.openRoute = (app, path) => {
    app.get('/home', (request, result) => {
        if (request.session.uploadSession) request.session.uploadSession = "";
        request.session.examData = "";
        result.sendFile(path.join(__dirname, '../../public/pages/', 'index.html'), error => {
            if (error) console.log("[FAILURE][RESOURCE] User has not received 'index.html'\r\n");
            else console.log("[SUCCESS][RESOURCE] User has received 'index.html'\r\n");
        });
    });
}

/**
 * Validates if user is admin or not when client makes request to check
 * 
 * @param {object} app - Express middleware for opening routes
 * @param {object} url - URL module for allowing the parsing of parameters to route
 * @param {object} client - pSQL middleware for connecting to database
 */
exports.validateCriteria = (app, url, client) => {
    app.get('/check', (request, result) => {
        if (url.parse(request.url, true).query.admin) {
            let [querySearch, queryColumn] = search.querySearch(request, url);
            let [querySortColumn, querySortOrder] = search.querySort(request, url);
            const userEmail = url.parse(request.url, true).query.email;
            search.emailValidation(userEmail, client, result, querySearch, queryColumn, true, querySortColumn, querySortOrder, request.session.examData);
        } else {
            result.send({ message: request.session.uploadStatus });
            request.session.uploadStatus = "";
            request.session.save(error => { if (error) console.log("[FAILURE][UPLOAD] Unable to track number of failed uploads\r\n") });
        }
    });
}

/**
 * Sends list of exams to user in appropriately sorted order
 * 
 * @param {object} app - Express middleware for opening routes
 * @param {object} url - URL module for allowing the parsing of parameters to route
 * @param {object} client - pSQL middleware for connecting to database
 */
exports.showExams = (app, url, client) => {
    app.get('/exams', (request, result) => {
        let [querySearch, queryColumn] = search.querySearch(request, url);
        let [querySortColumn, querySortOrder] = search.querySort(request, url);
        const userEmail = url.parse(request.url, true).query.email;
        search.emailValidation(userEmail, client, result, querySearch, queryColumn, false, querySortColumn, querySortOrder, request.session.examData);
    });
}

/**
 * Sends list of users to user
 * 
 * @param {object} app - Express middleware for opening routes
 * @param {object} url - URL module for allowing the parsing of parameters to route
 * @param {object} client - pSQL middleware for connecting to database
 */
exports.showUsers = (app, url, client) => { app.get('/users', (request, result) => { profile.emailValidation(url, request, client, result) }) }

/**
 * Allows for the deletion of users by an admin
 * 
 * @param {object} app - Express middleware for opening routes
 * @param {object} formidable - Formidable middleware for parsing user input
 * @param {object} client - pSQL middleware for connecting to database
 */
exports.deleteUsers = (app, formidable, client) => { app.post('/users', (request, result) => { profile.removeUser(client, formidable, request, result) }) }
