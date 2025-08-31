import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/lib/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { inputText } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // switchable with GROQ/OpenRouter fallback
      messages: [
        { role: "system", content: "You are a creative script writer for AI video generation." },
        { role: "user", content: inputText },
      ],
    });

    const script = completion.choices[0].message?.content ?? "No script generated.";

    res.status(200).json({ script });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate script." });
  }
}
