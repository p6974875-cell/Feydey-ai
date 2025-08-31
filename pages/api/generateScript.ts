import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // put your key in .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { inputText } = req.body;

    if (!inputText) {
      return res.status(400).json({ error: "Missing input text" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // fast + cheap
      messages: [
        { role: "system", content: "You are a professional video scriptwriter." },
        { role: "user", content: `Write a short, engaging video script about: ${inputText}` },
      ],
    });

    const script = completion.choices[0].message?.content || "No script generated.";

    res.status(200).json({ script });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
