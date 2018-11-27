import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);
export const UserSchema = new Schema({
    userId : {
        type : Number,
        require : false,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNum: {
        type: Number,
        required : true         
    },
    password: {
        type: String,
        required : true          
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    hash : {
        type : String
    },
    salt : {
        type : String
    }
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000 + '', 10),
  }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
  return {
    userId: this.userId,
    mobileNum: this.mobileNum,
    firstName : this.firstName,
    lastName : this.lastName,
    token: this.generateJWT(),
  };
};
autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId', startAt: 1 });
mongoose.model('User', UserSchema);