
exports.openRoute = (app, path) => {
    app.get('/home', (request, result) => {
        console.log("[SUCCESS][ACCESS] User has accessed /home route");
        result.sendFile(path.join(__dirname, '../../public/pages/', 'index.html'), error => {
            if (error) console.log("[FAILURE][ACCESS][RESOURCE] User has not received 'index.html' on /home route")
        });
        console.log("[SUCCESS][REOURCE] User has received 'index.html'");
    });
}
