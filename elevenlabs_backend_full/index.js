import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./config.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/auth", (await import("./routes/auth.js")).default);
app.use("/keys", (await import("./routes/keys.js")).default);
app.use("/tts", (await import("./routes/tts.js")).default);

app.get("/", (req, res) => res.send("ElevenLabs Backend Running"));

app.listen(PORT, () => console.log("Server running on port " + PORT));