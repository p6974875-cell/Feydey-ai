import type { NextApiRequest, NextApiResponse } from "next";
import { unsplash } from "@/lib/unsplash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt } = req.body;

    // First try Unsplash
    const photos = await unsplash.search.getPhotos({
      query: prompt,
      perPage: 5,
    });

    if (photos.response?.results?.length) {
      return res.status(200).json({ images: photos.response.results.map(p => p.urls.regular) });
    }

    // TODO: Add fallback: Pexels / Replicate if Unsplash fails

    res.status(200).json({ images: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate images." });
  }
}
