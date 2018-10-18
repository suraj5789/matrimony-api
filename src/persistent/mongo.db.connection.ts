
import * as mongoose from "mongoose";
export class MongoDBConnection {
    static setup(mongoUrl : string) {
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoUrl, { useNewUrlParser: true });
    }
}