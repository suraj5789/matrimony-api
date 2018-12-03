import { SuccessResponse, FailureResponse } from './../../responses';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { UserProfile } from '../../models';

export class UserProfileService {
    
    create(req:Request, res:Response) {

        const { body: { userProfile } } = req;
        if (!userProfile.userId) {
            return FailureResponse.getResponse(res, FailureResponse.MESSAGES.REQUIRED_USER_ID,
                {}, 422); 
        }
        let self = this;
        let newUserProfile = new UserProfile(userProfile);
        newUserProfile.save((err, result) => {
            if(err) {
                return FailureResponse.getResponse(res, err.message, err, 422);
            }
        });
        return SuccessResponse.getResponse(res, { message : 'Profile Created Successfully.'}); 
    }

    update(req:Request, res:Response, next) {
         return SuccessResponse.getResponse(res, { message : 'Profile Updated Successfully.'}); 
    }
}