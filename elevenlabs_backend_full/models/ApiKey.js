import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  key: String,
  active: { type: Boolean, default: true },
  remaining: Number
});

export default mongoose.model("ApiKey", apiKeySchema);