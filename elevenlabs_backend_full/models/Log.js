import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  text: String,
  characters: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Log", logSchema);