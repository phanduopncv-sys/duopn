import mongoose from "mongoose";
const LogSchema = new mongoose.Schema({ textLength:Number, keyUsed:String, voiceId:String, ip:String},{timestamps:true});
export default mongoose.model("Log", LogSchema);