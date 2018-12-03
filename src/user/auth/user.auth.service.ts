import { FailureResponse, SuccessResponse } from './../../responses';
import { User } from './../../models/user.model';
import '../config/auth.config';
import '../config/passport.config';
import { Response, Request } from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
export class UserAuthService {
    constructor() {
        console.log('its called from user service')
    };

    register(req: Request, res: Response) {
        const { body: { user } } = req;
        if (!user.mobileNum) {   
            return FailureResponse.getResponse(res, FailureResponse.MESSAGES.REQUIRED_MOBILE,
                {}, 422);
        }

        if (!user.password) {
            return FailureResponse.getResponse(res, FailureResponse.MESSAGES.REQUIRED_PWD,
                {}, 422);
        }
        let self = this;
        User.findOne({ mobileNum: user.mobileNum }, function (err, existedUser) {
            if (err) throw err;
            if (existedUser) {
                let message = FailureResponse.MESSAGES.USER_EXITS_ALREADY.replace('${user.mobileNum}', existedUser.mobileNum);
                return FailureResponse.getResponse(res, message,
                {}, 420);
            }
            else {
                const finalUser = new User(user);

                finalUser.setPassword(user.password);

                return finalUser.save()
                    .then(() => {
                        return SuccessResponse.getResponse(res, {
                            user: finalUser.toAuthJSON()
                        });                        
                    });
            }
        });


    }

    authenticate(req: Request, res: Response, next) {
        const { body: { user } } = req;
        let self = this;
        if (!user.mobileNum) {
            return FailureResponse.getResponse(res, FailureResponse.MESSAGES.REQUIRED_MOBILE,
                {}, 422);
        }

        if (!user.password) {
            return FailureResponse.getResponse(res, FailureResponse.MESSAGES.REQUIRED_PWD,
                {}, 422);
        }

        return passport.authenticate('local', { session: false }, (err, passportUser, failureResponse) => {
            if (err) {
                return next(err);
            }

            if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();
                return SuccessResponse.getResponse(res, {
                    user: user.toAuthJSON()
                });
            }
            else if (failureResponse) {
                res.status(failureResponse.statusCode);
                res.json(failureResponse);
            }


        })(req, res, next);
    }
}