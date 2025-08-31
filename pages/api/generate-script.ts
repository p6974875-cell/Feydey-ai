import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { inputText } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Write a video script about: ${inputText}` }],
    });

    const script = response.choices[0].message?.content || "No script generated.";
    res.status(200).json({ script });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
