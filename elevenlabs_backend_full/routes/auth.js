import express from "express";
import User from "../models/User.js";
import { sign } from "../utils/jwt.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const u = await User.findOne({ email: req.body.email });
  if (u) return res.json({ ok: false, msg: "Email already exists" });
  await User.create(req.body);
  res.json({ ok: true });
});

router.post("/login", async (req, res) => {
  const u = await User.findOne(req.body);
  if (!u) return res.json({ ok: false, msg: "Invalid login" });
  const token = sign({ id: u._id });
  res.json({ ok: true, token });
});

export default router;