import express from "express";
import { getVoices, generateAudio } from "../utils/elevenlabs.js";
import Log from "../models/Log.js";

const router = express.Router();

router.get("/voices", async (req, res) => {
  res.json({ ok: true, voices: await getVoices() });
});

router.post("/", async (req, res) => {
  const { text, voiceId, stability, similarity } = req.body;
  const audio = await generateAudio(text, voiceId, stability, similarity);
  await Log.create({
    text: text.slice(0, 120),
    characters: text.length
  });
  res.json({ ok: true, audio });
});

export default router;