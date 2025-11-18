import mongoose from "mongoose";
const ApiKeySchema = new mongoose.Schema({ key:String, used:{type:Number,default:0}, limit:{type:Number,default:500000}},{timestamps:true});
export default mongoose.model("ApiKey", ApiKeySchema);