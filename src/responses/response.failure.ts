export class FailureResponse { 
    public static MESSAGES = {
        REQUIRED_MOBILE : 'Mobile number is required.',
        REQUIRED_PWD : 'Password is required.',
        INCORRECT_MOBILE_OR_PWD : 'Mob,ile number or Password is not valid.',
        USER_EXITS_ALREADY : 'User with mobile number ${user.mobilenum}, already exist.'
        
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