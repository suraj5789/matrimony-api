import { FailureResponse } from '../../responses/response.failure';
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[mobilenum]',
  passwordField: 'user[password]',
}, (mobilenum, password, done) => {
  Users.findOne({ mobilenum })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        let failureResponse = FailureResponse.responseObj();
        failureResponse.message = FailureResponse.MESSAGES.REQUIRED_MOBILE_OR_PWD;
        failureResponse.statusCode = 442;
        return done(null, false, failureResponse);
      }

      return done(null, user);
    }).catch(done);
}));