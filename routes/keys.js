import express from "express";
import ApiKey from "../models/ApiKey.js";
const router = express.Router();

router.get("/", async (req,res)=>{
  res.json(await ApiKey.find({}));
});

router.post("/add", async (req,res)=>{
  await ApiKey.create({key:req.body.key});
  res.json({ok:true});
});

export default router;