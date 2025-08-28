import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { prompt, engine } = req.body;
  try {
    let outputUrl = "";
    if (engine === "replicate") {
      const resp = await axios.post("https://api.replicate.com/v1/predictions",
        { version: "9d3d4f35-5be0-4cf8-a8f5-0b8c0d0a1469", input: { prompt } },
        { headers: { Authorization: `Token ${process.env.REPLICATE_API_KEY}` } });
      outputUrl = resp.data.urls ? resp.data.urls[0] : "";
    }
    res.status(200).json({ output: outputUrl });
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
}