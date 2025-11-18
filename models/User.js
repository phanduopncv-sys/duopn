import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({ email:String, password:String, role:{type:String,default:"user"}},{timestamps:true});
export default mongoose.model("User", UserSchema);