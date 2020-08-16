
"use strict";

/**
 * Opens route at /login to send 'login.html' file to user.
 *
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} path - Path middleware needed to access static files in other directories
 */
exports.openRoute = (app, path) => {
    app.get('/login', (request, result) => {
        console.log("[SUCCESS][ACCESS][GET] User has accessed /login route");
        result.sendFile(path.join(__dirname, '../../public/pages/', 'login.html'), error => {
            if (error) console.log("[FAILURE][ACCESS][RESOURCE] User has not received 'login.html' on /login route")
        });
        console.log("[SUCCESS][REOURCE] User has received 'login.html'");
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
        console.log("[SUCCESS][ACCESS][POST] User has accessed /login route");
        const loginForm = formidable();
        loginForm.parse(request, (error, fields, files) => {
            if (error) console.log("[FAILURE][LOGON] User has been unable to logon due to server error that has not been caught"); 
            else {
                result.redirect('/home');
                console.log("[SUCCESS][LOGON] User has logged on and has been redirected to /home");
            }
        });
    });
}
