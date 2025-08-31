import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // use .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { script, numImages = 4 } = req.body;

    if (!script) {
      return res.status(400).json({ error: "Missing script text" });
    }

    // Pick some key scenes from the script
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Extract key visual scenes from a video script." },
        { role: "user", content: `Script: ${script}. Extract ${numImages} distinct prompts for images.` },
      ],
    });

    const prompts = completion.choices[0].message?.content
      ?.split("\n")
      .filter((line) => line.trim().length > 0) || [];

    // Generate images using DALL·E
    const images = [];
    for (let prompt of prompts) {
      const img = await client.images.generate({
        model: "gpt-image-1",
        prompt,
        size: "1024x1024",
      });
      images.push({ prompt, url: img.data[0].url });
    }

    res.status(200).json({ prompts, images });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
