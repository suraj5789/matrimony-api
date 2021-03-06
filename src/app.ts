import { RouteErrors } from './app.error.handlers';
import { UserAuthRoutes, UserProfileRoutes } from './user/';
import { MongoDBConnection } from './persistent/mongo.db.connection';
import { AppRoutes } from './app.routes';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as session from 'express-session';
import * as methodOverride from 'method-override';
const errorHandler = require('errorhandler');

class App {

    public app: express.Application;
    private appRoutes: AppRoutes = new AppRoutes();
    private userAuthRoutes: UserAuthRoutes = new UserAuthRoutes();
    private userProfileRoutes: UserProfileRoutes = new UserProfileRoutes();
    private mongoUrl: string = 'mongodb://localhost/guptasamajdb';
    constructor() {
        this.app = express();
        this.configDB();
        this.config();
        this.setCORS();
        this.setRoutes();
    }

    private configDB(): void {
        MongoDBConnection.setup(this.mongoUrl);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private setCORS(): void {
        var originsWhitelist = [
            'http://localhost:4200',
            'http://localhost:8080'
        ];
        var corsOptions = {
            origin: function (origin, callback) {
                var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
                callback(null, isWhitelisted);
            },
            credentials: true
        }
        //here is the magic
        this.app.use(cors(corsOptions));
    }

    private setRoutes() {
        this.appRoutes.routes(this.app);
        this.userAuthRoutes.routes(this.app);
        this.userProfileRoutes.routes(this.app);
        this.app.use(methodOverride());
        new RouteErrors().handlers(this.app);
        this.app.use(errorHandler);
        this.app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
    }

}

export default new App().app;