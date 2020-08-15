
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const home = require('./api/routes/home.js');

app.get('/', (request, result) => {
    result.redirect('/home');
});
home.openRoute(app, path);

app.use(express.static(path.join(__dirname, process.env.STATIC || 'public/')));
app.listen(process.env.PORT || 3000, () => console.log("[SUCCESS][SERVER] Server is listening on port 3000"));
