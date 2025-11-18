import ApiKey from "../models/ApiKey.js";
import fetch from "node-fetch";

export async function getKey() {
  const keys = await ApiKey.find({ active: true });
  if (!keys.length) throw new Error("No active key");
  return keys[Math.floor(Math.random() * keys.length)].key;
}

export async function getVoices() {
  const key = await getKey();
  const res = await fetch("https://api.elevenlabs.io/v1/voices", {
    headers: { "xi-api-key": key }
  });
  return (await res.json()).voices;
}

export function chunkText(text) {
  text = text.replace(/\s+/g, " ");
  const out = [];
  while (text.length > 2000) {
    out.push(text.slice(0, 2000));
    text = text.slice(2000);
  }
  out.push(text);
  return out;
}

export async function generateAudio(text, voiceId, stability, similarity) {
  const chunks = chunkText(text);
  const finalBuffers = [];
  for (let ch of chunks) {
    const key = await getKey();
    const r = await fetch(\`https://api.elevenlabs.io/v1/text-to-speech/\${voiceId}\`, {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
      },
      body: JSON.stringify({
        text: ch,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability, similarity_boost: similarity }
      })
    });
    const buf = Buffer.from(await r.arrayBuffer());
    finalBuffers.push(buf);
  }
  return Buffer.concat(finalBuffers).toString("base64");
}

export async function checkUsage(key) {
  const r = await fetch("https://api.elevenlabs.io/v1/user", {
    headers: { "xi-api-key": key }
  });
  return await r.json();
}