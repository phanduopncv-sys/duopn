import express from "express";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
const router = express.Router();

router.post("/login", async (req,res)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email,password});
  if(!user) return res.json({ok:false,msg:"Invalid"});
  res.json({ok:true,token:signToken({id:user._id})});
});

export default router;