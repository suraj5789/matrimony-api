import { Response } from 'express';
import { ServiceResponse } from './service-response';
export class SuccessResponse {    
    private static responseObj(result:any, message?:string, statusCode?:number)
    {
        let response:ServiceResponse = new ServiceResponse();
        response.statusCode = statusCode || 200,
        response.status = 'Success',
        response.result = result || {},
        response.message = message || 'Success'
        return response;
    }

    public static getResponse(resp:Response, result:any, message?:string) {
        let successResponse = SuccessResponse.responseObj(result, message);
        return resp.status(successResponse.statusCode).json(successResponse);
    }
}