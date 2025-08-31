import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // fallback to OpenRouter or Groq later
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { inputText } = req.body;

  if (!inputText) {
    return res.status(400).json({ error: "No input text provided" });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a scene breakdown assistant for AI video creation. " +
            "Split any script into 3–8 short scenes. Each scene should have: " +
            "scene number, text (narration), voice style, and an image prompt.",
        },
        {
          role: "user",
          content: inputText,
        },
      ],
      response_format: { type: "json_object" }, // force structured JSON
    });

    const output = response.choices[0].message?.content;

    res.status(200).json({ scenes: JSON.parse(output || "[]") });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
