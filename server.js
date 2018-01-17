const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const ejs = require('ejs');
const container = require('./modules');

container.resolve((users) => {

    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(300, () => {
            console.log('Listening on port 3000');
        });
        ConfigureExpress(app);

            // Setup Router
        const router = require('express-promise-router')();
        users.SetRouting(router);

        app.use(router);
    }

    function ConfigureExpress(app) {
        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
    }

});