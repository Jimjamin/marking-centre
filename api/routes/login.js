
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

/**
 * Validates if user is authentic, allowing them to login if so
 * 
 * @param {object} client - pSQL middleware to allow for database connection
 * @param {object} fields - List of parsed user input
 * @param {object} request - The current user session cookie
 * @param {object} bcrypt - Allows for password hashing and decrypting
 * @param {object} result - Returns a result to user
 */
const validateLogin = (client, fields, request, bcrypt, result, child) => {
    client.query(`SELECT * FROM staff WHERE email_address='${fields.email}'`, (error, response) => {
        if (error) console.log("[FAILURE][LOGON] User has been unable to logon due to not already having an account"); 
        else if (response.rows.length > 0) {
            bcrypt.compare(fields.password, response.rows[0].user_password, (err, res) => {
                if (err) { 
                    console.log("[FAILURE][LOGON] Login service is unavailable");
                    result.redirect('/login');
                } 
                if (res) {
                    request.session.userLoggedIn = true;
                    request.session.userEmail = fields.email;
                    result.redirect('/home');
                    console.log("[SUCCESS][LOGON] User has logged on");
                    let loadFiles = child.spawn('cmd.exe', ['/c', 'C:\\marking-centre\\exec\\load-files.bat']);
                    loadFiles.on('error', e => console.log("[FAILURE][RESOURCE] Unable to download files from server"));
                    loadFiles.stderr.on('data', e => console.log("[FAILURE][RESOURCE] Unable to download files from server"));
                    loadFiles.on('exit', response => console.log("[SUCCESS][RESOURCE] Downloaded files from server"));
                } else {
                    console.log("[FAILURE][LOGON] User does not have correct credentials");
                    result.redirect('/login');
                }
            });
        } else { 
            console.log("[FAILURE][LOGON] User does not have correct credentials");
            result.redirect('/login');
        }
    });
}

/**
 * Parses user's login to resolve if the user can logon. 
 * 
 * @param {object} app - Express middleware needed to open routes for user to access
 * @param {object} formidable - Formidable middleware that allows for parsing formdata
 * @param {object} client - pSQL middleware for connecting to database
 * @param {object} bcrypt - Allows for password hashing and decrypting
 */
exports.logonUser = (app, formidable, client, bcrypt, child) => {
    app.post('/login', (request, result) => {
        const loginForm = formidable();
        loginForm.parse(request, (error, fields) => {
            if (error) console.log("[FAILURE][LOGON] User has been unable to logon due to server error that has not been caught"); 
            else validateLogin(client, fields, request, bcrypt, result, child);
        });
    });
}
