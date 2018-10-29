import { FailureResponse } from '../../responses/response.failure';
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[mobileNum]',
  passwordField: 'user[password]',
}, (mobileNum, password, done) => {
  Users.findOne({ mobileNum })
    .then((user) => {
      let failureResponse = null;
      if(!user) {
        failureResponse = FailureResponse.responseObj();
        failureResponse.message = FailureResponse.MESSAGES.INCORRECT_MOBILE;
        failureResponse.statusCode = 442;
      }else if(!user.validatePassword(password)) {
        failureResponse = FailureResponse.responseObj();
        failureResponse.message = FailureResponse.MESSAGES.INCORRECT_PWD;
        failureResponse.statusCode = 442;
        return done(null, null, failureResponse);        
      }
      return done(null, user, failureResponse);
    }).catch(done);
}));