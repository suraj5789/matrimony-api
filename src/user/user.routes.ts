import { Auth } from './config/auth.config';
import { UserController } from './user.controller';
import {Request, Response} from "express";
import { SuccessResponse } from '../responses/response.success';

export class UserRoutes {   
    
    private userController:UserController;
    
    constructor() {
        this.userController = new UserController();
    }
    
    public routes(app): void {          
        
        app.route('/user/register') 
        // POST endpoint
        .post(Auth.optional, (req, res) => this.userController.register(req, res))

        // Contact detail
        app.route('/user/authenticate')
        // get specific contact
        .get(Auth.optional, (req, res, next) => {
           res.json({statusCode : 'Success'})
        })
        .post(Auth.optional, (req, res, next) => {
            this.userController.authenticate(req, res, next)
        })
        
        app.route('/user/current')
        // get specific contact
        .post(Auth.required, (req: Request, res: Response) => {
        // Get a single contact detail 
        console.log('got current user.');
        let successResponse = SuccessResponse.responseObj();
        successResponse.result = {
                message: 'GET request successfulll!!!!'
            };          
            res.status(200).send(successResponse)
        })
    }
}