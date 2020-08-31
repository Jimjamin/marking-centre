
"use strict";

exports.emailValidation = (userEmail, client, result) => {
    client.query(`SELECT * FROM staff WHERE email_address='${userEmail}' AND is_admin=true`, (error, response) => {
        if (error) console.log("[FAILURE][SEARCH] Checking for user email address has failed");
        else if (response.rows.length > 0) {
            client.query('SELECT * FROM staff', (error, response) => {
                if (error) console.log("[FAILURE][SEARCH] Loading of user profiles has failed");
                else {
                    result.send(response.rows);
                    console.log("[SUCCESS][SEARCH] User profiles have been loaded without error");
                }
            });
        }
    });
}
