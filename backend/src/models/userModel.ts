import mongoose from "mongoose";
const { Schema} = mongoose;
interface IUser {
    username : string;
    email : string;
    password : string;
    role : "buyer" | "seller";
}
const userSchema = new Schema <IUser>({
    username : {
        type : String,
        required : true,

    },
    email : {
        type : String,
        required : true,
        unique : true
    }, 
    password : {
        type : String,
        required : true,
        minlength : 8
    },
    role : {
        type : String,
        enum : ["buyer", "seller"],
        default : "buyer",
    }
})
// module.exports = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);