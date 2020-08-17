
"use strict";

const { request } = require("express");

/**
 * Opens route at /login to send 'login.html' file to user.
 *
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} path - Path middleware needed to access static files in other directories
 */
exports.openRoute = (app, path) => {
    app.get('/login', (request, result) => {
        request.session.destroy(error => { if (error) console.log("[SUCCESS][LOGON] User has logged off") });
        result.sendFile(path.join(__dirname, '../../public/pages/', 'login.html'), error => {
            if (error) console.log("[FAILURE][RESOURCE] User has not received 'login.html'");
            else console.log("[SUCCESS][RESOURCE] User has received 'login.html'");
        });
    });
}

/**
 * Parses user's login to resolve if the user can logon. 
 * 
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} formidable - Formidable middleware that allows for parsing formdata
 */
exports.logonUser = (app, formidable) => {
    app.post('/login', (request, result) => {
        const loginForm = formidable();
        loginForm.parse(request, (error, fields) => {
            if (error) console.log("[FAILURE][LOGON] User has been unable to logon due to server error that has not been caught"); 
            else {
                request.session.userLoggedIn = true;
                request.session.email = fields.email;
                result.redirect('/home');
                console.log("[SUCCESS][LOGON] User has logged on");
            }
        });
    });
}
