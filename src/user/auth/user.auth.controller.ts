import { UserAuthService } from './user.auth.service';
import { Request, Response } from 'express';

export class UserAuthController {
    private userAuthService:UserAuthService;
    constructor() {
        this.userAuthService = new UserAuthService()
    }

    register(req:Request, res:Response) {
        return this.userAuthService.register(req, res)
    }

    authenticate(req:Request, res:Response, next) {
        return this.userAuthService.authenticate(req, res, next)
    }
}