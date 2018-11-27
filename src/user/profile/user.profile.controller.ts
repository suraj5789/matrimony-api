import { UserProfileService } from './user.profile.service';
import { Request, Response } from 'express';

export class UserProfileController {
    private userProfileService:UserProfileService;
    constructor() {
        this.userProfileService = new UserProfileService()
    }

    create(req:Request, res:Response) {
        return this.userProfileService.create(req, res)
    }

    update(req:Request, res:Response, next) {
        return this.userProfileService.update(req, res, next)
    }
}