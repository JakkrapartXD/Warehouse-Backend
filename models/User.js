import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userId: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
});

const User = mongoose.model('User', UserSchema);

export default User;
