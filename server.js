const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');


const container = require('./container');


container.resolve(function(users, _) {

    mongoose.Prmise = global.Promise;
    mongoose.connect('mongodb://admin:admin@ds123146.mlab.com:23146/football-fans', {useMongoClient: true});

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
        require('./passport/passport-facebook');

        // CORS
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', '*');
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET','PUT', 'POST', 'PATCH', 'DELETE')
                return res.status(200).json({});
            }
            next();
        });

        app.use(morgan('dev'));
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