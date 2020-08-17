
require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const formidable = require('formidable');

const home = require('./api/routes/home.js');
const login = require('./api/routes/login.js');

app.use(express.static(path.join(__dirname, process.env.STATIC || 'public/')));
app.use(session({
    secret: process.env.SECRET || 'equity in education',
    resave: false,
    saveUninitialized: false
}));

login.openRoute(app, path);
login.logonUser(app, formidable);
app.use((request, result, next) => {
    if (!request.session.userLoggedIn) result.redirect('/login');
    else next();
});
home.openRoute(app, path);
app.get('/', (request, result) => result.redirect('/home'));

app.listen(process.env.PORT || 3000, () => console.log("[SUCCESS][SERVER] Server is listening on port 3000"));
