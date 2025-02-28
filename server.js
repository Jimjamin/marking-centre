
require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const formidable = require('formidable');
const url = require('url');
const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcrypt');
const child = require('child_process');
const { Client } = require('pg')
const client = new Client({
    connectionString: process.env.CONNECTION_STRING || process.env.DATABASE_URL,
    ssl: true,
    sslmode: require
})
client.connect();

const home = require('./api/routes/home.js');
const login = require('./api/routes/login.js');
const upload = require('./api/routes/upload.js');
const grade = require('./api/routes/grade.js');
const install = require('./api/routes/install.js');

app.use(express.static(path.join(__dirname, process.env.STATIC || 'public/')));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

login.openRoute(app, path);
login.logonUser(app, formidable, client, bcrypt, child);

// Redirects user to login page if they are not logged in or their session has expired
app.use((request, result, next) => {
    if (!request.session.userLoggedIn) result.redirect('/login');
    else next();
});

install.displayInstall(app, path);
install.downloadFile(app);

home.openRoute(app, path);
home.validateCriteria(app, url, client);
home.showExams(app, url, client);
home.showUsers(app, url, client);
home.deleteUsers(app, formidable, client);

// Redirects user to home page automatically
app.get('/', (request, result) => result.redirect('/home'));

upload.loadUserFile(app, url, formidable, fs, csv, bcrypt);
upload.displayUserFile(app, path);
upload.loadExamFile(app, url, formidable, fs, csv, bcrypt);
upload.displayExamFile(app, path);
upload.loadCurrentSession(app);
upload.confirmUpload(app, client, child);
grade.uploadTeacherGrade(app, formidable, client);

app.listen(process.env.PORT || 3000, () => console.log("[SUCCESS][SERVER] Server is listening on port 3000\r\n"));
