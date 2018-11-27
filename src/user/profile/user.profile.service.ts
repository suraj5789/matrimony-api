import { SuccessResponse } from './../../responses/response.success';
import { Request, Response } from 'express';


export class UserProfileService {
    create(req:Request, res:Response) {
        let sucessResponse = SuccessResponse.responseObj();
        sucessResponse.result = { message : 'Profile Created Successfully.'}
        res.send(sucessResponse);
    }

     update(req:Request, res:Response, next) {
         let sucessResponse = SuccessResponse.responseObj();
        sucessResponse.result = { message : 'Profile Updated Successfully.'}
        res.send(sucessResponse);
    }
}