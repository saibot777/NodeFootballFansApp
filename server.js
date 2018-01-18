const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const ejs = require('ejs');
const mongoose = require('mongoose');
const flash = require('flash');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const container = require('./modules');


container.resolve(function(users) {

    mongoose.Prmise = global.Promise;
    mongoose.connect('mongodb://admin:admin@ds123146.mlab.com:23146/football-fans');

    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(3000, () => {
            console.log('Listening on port 3000');
        });
        ConfigureExpress(app);

            // Setup Router
        const router = require('express-promise-router')();
        users.SetRouting(router);

        app.use(router);
    }

    function ConfigureExpress(app) {
        require('./passport/passport-local');

        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(validator());
        app.use(session({
            secret: 'secretkey',
            resave: 'true',
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
    }

});