import fetch from "node-fetch";
import ApiKey from "../models/ApiKey.js";

export const getWorkingKey = async () => {
  const keys = await ApiKey.find({});
  if (!keys.length) throw new Error("No API keys");
  return keys[Math.floor(Math.random() * keys.length)];
};

export const ttsRequest = async (voiceId, text, stability, similarity) => {
  const keyDoc = await getWorkingKey();
  const key = keyDoc.key;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability, similarity_boost: similarity }
      })
    }
  );

  if (!response.ok) throw new Error(await response.text());

  const audio = Buffer.from(await response.arrayBuffer()).toString("base64");
  return { audio, keyUsed: key };
};