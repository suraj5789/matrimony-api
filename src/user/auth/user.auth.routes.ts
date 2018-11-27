import { Auth } from '../config/auth.config';
import { UserAuthController } from './user.auth.controller';
import {Request, Response} from "express";
import { SuccessResponse } from '../../responses/response.success';

export class UserAuthRoutes {   
    
    private userAuthController:UserAuthController;
    
    constructor() {
        this.userAuthController = new UserAuthController();
    }
    
    public routes(app): void {          
        
        app.route('/user/register') 
        // POST endpoint
        .post(Auth.optional, (req, res) => this.userAuthController.register(req, res))

        // Contact detail
        app.route('/user/authenticate')
        // get specific contact
        .get(Auth.optional, (req, res, next) => {
           res.json({statusCode : 'Success'})
        })
        .post(Auth.optional, (req, res, next) => {
            this.userAuthController.authenticate(req, res, next)
        });        
    }
}