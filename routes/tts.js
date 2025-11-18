import express from "express";
import { splitText } from "../utils/splitText.js";
import { ttsRequest } from "../utils/elevenlabs.js";
import Log from "../models/Log.js";

const router = express.Router();

router.post("/", async (req,res)=>{
  try{
    const {text,voiceId,stability,similarity}=req.body;
    const chunks=splitText(text,2000);
    const results=[];
    for(const c of chunks){
      const {audio,keyUsed}=await ttsRequest(voiceId,c,stability,similarity);
      results.push(audio);
      await Log.create({textLength:c.length,voiceId,keyUsed});
    }
    res.json({ok:true,audioChunks:results});
  }catch(e){res.json({ok:false,msg:e.message})}
});

export default router;