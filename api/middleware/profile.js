
"use strict";

/**
 * Validates if user is an admin, and if so returns list of staff to client
 * 
 * @param {object} url - Module to allow for the parsing of paramaters in the route
 * @param {object} request - Current user session
 * @param {object} client - Allows for connecting to the database
 * @param {object} result - Returns result to client
 */
exports.emailValidation = (url, request, client, result) => {
    const userEmail = url.parse(request.url, true).query.email;
    client.query(`SELECT * FROM staff WHERE email_address='${userEmail}' AND is_admin=true`, (error, response) => {
        if (error) console.log("[FAILURE][SEARCH] Checking for user email address has failed\r\n");
        else if (response.rows.length > 0) {
            client.query('SELECT * FROM staff', (err, response) => {
                if (err) console.log("[FAILURE][SEARCH] Loading of user profiles has failed\r\n");
                else {
                    result.send(response.rows);
                    console.log("[SUCCESS][SEARCH] User profiles have been loaded without error\r\n");
                }
            });
        }
    });
}

/**
 * Allows for the removal of the selected user by an admin user
 * 
 * @param {object} client - Allows for connection to the database
 * @param {object} formidable - Middleware that parses user input
 * @param {object} request - Current user session
 * @param {object} result - Returns result to client
 */
exports.removeUser = (client, formidable, request, result) => {
    const userToDelete = formidable();
    userToDelete.parse(request, (error, fields) => {
        if (error) console.log("[FAILURE][RESOURCE] Unable to delete user from system\r\n");
        else {
            client.query(`DELETE FROM staff WHERE email_address='${fields.email_address}'`, err => {
                if (err) console.log("[FAILURE][RESOURCE] Unable to delete user from system\r\n");
                else result.send({ message: `User ${fields.email_address} has been removed from the system` });
            });
        }
    });
}
