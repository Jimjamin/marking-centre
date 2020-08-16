
"use strict";

/**
 * Opens route at /home to send 'index.html' file to user.
 * 
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} path - Path middleware needed to access static files in other directories
 */
exports.openRoute = (app, path) => {
    app.get('/home', (request, result) => {
        console.log("[SUCCESS][ACCESS][GET] User has accessed /home route");
        result.sendFile(path.join(__dirname, '../../public/pages/', 'index.html'), error => {
            if (error) console.log("[FAILURE][ACCESS][RESOURCE] User has not received 'index.html' on /home route")
        });
        console.log("[SUCCESS][REOURCE] User has received 'index.html'");
    });
}
