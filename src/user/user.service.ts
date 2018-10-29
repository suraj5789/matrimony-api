import { FailureResponse } from './../responses/response.failure';
import { UserSchema } from './../models/user.model';
import './config/auth.config';
import './config/passport.config';
import { Response } from 'express';
import { Request } from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { SuccessResponse } from '../responses/response.success';
const User = mongoose.model('User', UserSchema);
export class UserService {
    private failureResponse = FailureResponse.responseObj();
    private successResponse = SuccessResponse.responseObj();
    constructor() {
        console.log('its called from user service')
    };

    register(req: Request, res: Response) {
        const { body: { user } } = req;
        if (!user.mobileNum) {
            this.failureResponse.message = FailureResponse.MESSAGES.REQUIRED_MOBILE;
            this.failureResponse.statusCode = 422;
            return res.status(this.failureResponse.statusCode).json(this.failureResponse);
        }

        if (!user.password) {
            this.failureResponse.message = FailureResponse.MESSAGES.REQUIRED_PWD;
            this.failureResponse.statusCode = 422;
            return res.status(this.failureResponse.statusCode).json(this.failureResponse);
        }
        let self = this;
        User.findOne({ mobileNum: user.mobileNum }, function (err, existedUser) {
            if (err) throw err;
            if (existedUser) {
                self.failureResponse.message = FailureResponse.MESSAGES.USER_EXITS_ALREADY.replace('${user.mobileNum}', existedUser.mobileNum);
                self.failureResponse.statusCode = 420;
                return res.status(self.failureResponse.statusCode)
                 .json(self.failureResponse);

            }
            else {
                const finalUser = new User(user);

                finalUser.setPassword(user.password);

                return finalUser.save()
                    .then(() => {
                        self.successResponse.result = {
                            user: finalUser.toAuthJSON()
                        }
                        res.status(200);
                        return res.json(self.successResponse);                        
                    }
                    );
            }
        });


    }

    authenticate(req: Request, res: Response, next) {
        const { body: { user } } = req;
        let self = this;
        if (!user.mobileNum) {
            this.failureResponse.message = FailureResponse.MESSAGES.REQUIRED_MOBILE;
            this.failureResponse.statusCode = 422;
            return res.status(this.failureResponse.statusCode).json(this.failureResponse);
        }

        if (!user.password) {
            this.failureResponse.message = FailureResponse.MESSAGES.REQUIRED_PWD;
            this.failureResponse.statusCode = 422;
            return res.status(this.failureResponse.statusCode).json(this.failureResponse);
        }

        return passport.authenticate('local', { session: false }, (err, passportUser, failureResponse) => {
            if (err) {
                return next(err);
            }

            if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();
                self.successResponse.result = {
                    user: user.toAuthJSON()
                }
                res.status(200);
                return res.json(self.successResponse);
            }
            else if (failureResponse) {
                res.status(failureResponse.statusCode);
                res.json(failureResponse);
            }


        })(req, res, next);
    }
}