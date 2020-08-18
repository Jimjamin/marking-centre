
require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const formidable = require('formidable');
const url = require('url');

const home = require('./api/routes/home.js');
const login = require('./api/routes/login.js');

app.use(express.static(path.join(__dirname, process.env.STATIC || 'public/')));
app.use(session({
    secret: process.env.SECRET || 'equity in education',
    resave: false,
    saveUninitialized: false,
    // Session is saved for up to two hours before user is logged out
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));

login.openRoute(app, path);
login.logonUser(app, formidable);
app.use((request, result, next) => {
    if (!request.session.userLoggedIn) result.redirect('/login');
    else next();
});
home.openRoute(app, path, url);
app.get('/', (request, result) => result.redirect('/home'));

app.listen(process.env.PORT || 3000, () => console.log("[SUCCESS][SERVER] Server is listening on port 3000"));
