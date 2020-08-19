
require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const formidable = require('formidable');
const url = require('url');
const fs = require('fs');
const csv = require('csv-parser');
const { Client } = require('pg')
const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: true,
    sslmode: require
})
client.connect();

const home = require('./api/routes/home.js');
const login = require('./api/routes/login.js');
const upload = require('./api/routes/upload.js');

app.use(express.static(path.join(__dirname, process.env.STATIC || 'public/')));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

login.openRoute(app, path);
login.logonUser(app, formidable);
app.use((request, result, next) => {
    if (!request.session.userLoggedIn) result.redirect('/login');
    else next();
});
home.openRoute(app, path, url);
app.get('/', (request, result) => result.redirect('/home'));
upload.loadUserFile(app, url, formidable, fs, csv);
upload.displayUserFile(app, path);
upload.loadExamFile(app, url, formidable, fs, csv);
upload.displayExamFile(app, path);
upload.loadCurrentSession(app);
upload.confirmUpload(app, client);

app.listen(process.env.PORT || 3000, () => console.log("[SUCCESS][SERVER] Server is listening on port 3000"));
