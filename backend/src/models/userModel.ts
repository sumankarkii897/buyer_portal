import mongoose from "mongoose";
const { Schema} = mongoose;

const userSchema = new Schema({
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
        length : 8
    },
    role : {
        type : String,
        default : "buyer",
    }
})
// module.exports = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);