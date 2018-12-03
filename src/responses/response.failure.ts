import { ServiceResponse } from './service-response';
import { Response } from 'express';
export class FailureResponse { 
    public static MESSAGES = {
        REQUIRED_USER_ID : 'UserId is missing from the request.',
        REQUIRED_MOBILE : 'Mobile number is required.',
        REQUIRED_PWD : 'Password is required.',
        INCORRECT_MOBILE : 'Mobbile number is not valid. Please try again.',
        INCORRECT_PWD : 'Password is not valid. Please try again.',
        USER_EXITS_ALREADY : 'User with mobile number ${user.mobileNum}, already exist.'
        
    }   
    private static responseObj(message:string, error?:any, statusCode?:number, )
    {
        let response:ServiceResponse = new ServiceResponse();
        response.statusCode = statusCode || 500,
        response.status = 'Failed',
        response.error = error || {},
        response.message = message || 'Something goes wrong on Server!'
        return response;
    }

    public static getResponse(resp:Response, message:string, errorObj?:any, statusCode?:number ):any {
        let failureResponse = FailureResponse.responseObj(message, errorObj, statusCode);
        return resp.status(failureResponse.statusCode).json(failureResponse);
    }
}