
"use strict";

/**
 * Opens route at /login to send 'login.html' file to user.
 *
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} path - Path middleware needed to access static files in other directories
 */
exports.openRoute = (app, path) => {
    app.get('/login', (request, result) => {
        if (request.session.userLoggedIn) console.log("[SUCCESS][LOGON] User has logged off");
        request.session.destroy(error => { if (error) console.log("[FAILURE][LOGON] User has not been able to log off") });
        result.sendFile(path.join(__dirname, '../../public/pages/', 'login.html'), error => {
            if (error) console.log("[FAILURE][RESOURCE] User has not received 'login.html'");
            else console.log("[SUCCESS][RESOURCE] User has received 'login.html'");
        });
    });
}

const validateLogin = (client, fields, request, result) => {
    client.query(`SELECT * FROM staff WHERE email_address='${fields.email}'`, (error, response) => {
        if (error) console.log("[FAILURE][LOGON] User has been unable to logon due to not already having an account"); 
        else {
            if (fields.password === response.rows[0].user_password) {
                request.session.userLoggedIn = true;
                request.session.userEmail = fields.email;
                result.redirect('/home');
                console.log("[SUCCESS][LOGON] User has logged on");
            } else {
                console.log("[FAILURE][LOGON] User has been unable to logon due to using the wrong password for their account");
                result.redirect('/login');
            }
        }
    });
}

/**
 * Parses user's login to resolve if the user can logon. 
 * 
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} formidable - Formidable middleware that allows for parsing formdata
 */
exports.logonUser = (app, formidable, client) => {
    app.post('/login', (request, result) => {
        const loginForm = formidable();
        loginForm.parse(request, (error, fields) => {
            if (error) console.log("[FAILURE][LOGON] User has been unable to logon due to server error that has not been caught"); 
            else validateLogin(client, fields, request, result);
        });
    });
}
