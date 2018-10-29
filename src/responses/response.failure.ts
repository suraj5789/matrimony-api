export class FailureResponse { 
    public static MESSAGES = {
        REQUIRED_MOBILE : 'Mobile number is required.',
        REQUIRED_PWD : 'Password is required.',
        INCORRECT_MOBILE : 'Mobbile number is not valid. Please try again.',
        INCORRECT_PWD : 'Password is not valid. Please try again.',
        USER_EXITS_ALREADY : 'User with mobile number ${user.mobileNum}, already exist.'
        
    }   
    public static responseObj()
    {
        return {
            statusCode : 500,
            status : 'Failed',
            error : {},
            message : 'Something goes wrong on Server!'
        };
    }
}