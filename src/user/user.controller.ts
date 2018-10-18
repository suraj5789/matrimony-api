import { UserService } from './user.service';
import { Request, Response } from 'express';

export class UserController {
    private userService:UserService;
    constructor() {
        this.userService = new UserService()
    }

    register(req:Request, res:Response) {
        return this.userService.register(req, res)
    }

    authenticate(req:Request, res:Response, next) {
        return this.userService.authenticate(req, res, next)
    }
}