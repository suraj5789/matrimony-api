import { FailureResponse } from './../responses/response.failure';
import { UserSchema } from './../models/user.model';
import './config/auth.config';
import './config/passport.config';
import { Response } from 'express';
import { Request } from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
const User = mongoose.model('User', UserSchema);
export class UserService {
    private failureResponse = FailureResponse.responseObj();
    constructor() {
        console.log('its called from user service')
    };

    register(req: Request, res: Response) {
        const { body: { user } } = req;
        if (!user.mobilenum) {
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
        User.findOne({ mobilenum: user.mobilenum }, function (err, existedUser) {
            if (err) throw err;
            if (existedUser) {
                self.failureResponse.message = FailureResponse.MESSAGES.USER_EXITS_ALREADY.replace('${user.mobilenum}', existedUser.mobilenum);
                self.failureResponse.statusCode = 420;
                return res.json(self.failureResponse);

            }
            else {
                const finalUser = new User(user);

                finalUser.setPassword(user.password);

                return finalUser.save()
                    .then(() => res.json({ user: finalUser.toAuthJSON() }));
            }
        });


    }

    authenticate(req: Request, res: Response, next) {
        const { body: { user } } = req;

        if (!user.mobilenum) {
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

                return res.json({ user: user.toAuthJSON() });
            }
            else if (failureResponse) {
                res.status(failureResponse.statusCode);
                res.json(failureResponse);
            }


        })(req, res, next);
    }
}