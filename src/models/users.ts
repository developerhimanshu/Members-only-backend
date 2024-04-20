import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    userName:String,
    password:String,
    membershipStatus:{type:Boolean, default:false},
})

const User = mongoose.model("User", userSchema)

export default User;