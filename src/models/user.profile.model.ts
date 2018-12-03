import * as mongoose from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    userId : {
        type : Number,
        require : false,
        unique: true
    },
    personalDetails : {
		firstName : String,
		lasyName : String,
		dob : Date,
		height: {
			feet : Number,
			inch : Number
		},
		weight : Number,
		complexion: String,
		gotra:String,
        janmaRashi:String,
        manglik:String
	},
	educationalJobDetails: {
		education:String,
		occupation:String,
		income: Number,
		companyName:String
	},
	familyDetails : {
		fatherName:String,
		motherName:String,
		siblings: [ 
            { 
                name : String,
                education : String,
                maritalStatus: String
            }
        ]
    },
    socialReference : [
        { 
            name : String,
            relation : String,
            city: String
        }
    ],
    profileMatchingCriteria :
    {
        education:String,
		occupation:String,
        income: Number,
        janmaRashi:String,
        gotra:String,
        manglik:String
    }
});

autoIncrement.initialize(mongoose.connection);
UserProfileSchema.plugin(autoIncrement.plugin, { model: 'UserProfile', field: 'profileId', startAt: 1 });
export const UserProfile = mongoose.model('UserProfile', UserProfileSchema);