import express from "express";
import ApiKey from "../models/ApiKey.js";
import { checkUsage } from "../utils/elevenlabs.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  await ApiKey.create({ key: req.body.key });
  res.json({ ok: true });
});

router.get("/all", async (req, res) => {
  res.json({ ok: true, keys: await ApiKey.find() });
});

router.get("/test", async (req, res) => {
  const keys = await ApiKey.find();
  const out = [];
  for (const k of keys) {
    const usage = await checkUsage(k.key);
    out.push({ key: k.key.slice(0, 6) + "…", usage });
  }
  res.json({ ok: true, out });
});

export default router;