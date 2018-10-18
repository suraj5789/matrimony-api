import { RouteErrors } from './app.error.handlers';
import { UserRoutes } from './user/user.routes';
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
    private appRoutes:AppRoutes = new AppRoutes();
    private userRoutes:UserRoutes = new UserRoutes();
    private mongoUrl: string = 'mongodb://localhost/guptasamajdb'; 
    constructor() {
        this.app = express();
        this.configDB();
        this.config();   
        this.appRoutes.routes(this.app);  
        this.userRoutes.routes(this.app);
        this.app.use(methodOverride());
        new RouteErrors().handlers(this.app);
        this.app.use(errorHandler); 
        this.app.use(cors());
        this.app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
    }

    private configDB(): void {
        MongoDBConnection.setup(this.mongoUrl);
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        
    }

}

export default new App().app;