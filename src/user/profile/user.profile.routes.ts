import { Auth } from '../config/auth.config';
import { UserProfileController } from './user.profile.controller';
import {Request, Response} from "express";
import { SuccessResponse } from '../../responses/response.success';

export class UserProfileRoutes {   
    
    private userProfileController:UserProfileController;
    
    constructor() {
        this.userProfileController = new UserProfileController();
    }
    
    public routes(app): void {          
        
        app.route('/user/profile') 
        // POST endpoint
        .post(Auth.required, (req, res) => this.userProfileController.create(req, res))
        .put(Auth.required, (req, res, next) => this.userProfileController.update(req, res, next));
    }
}