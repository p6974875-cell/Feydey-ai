import { useState } from "react";

export default function VideoGenerator() {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setVideoUrl(null);

    try {
      // Placeholder – later we’ll connect to API (OpenAI / InVideo / custom backend)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setVideoUrl("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#1e293b", borderRadius: "8px" }}>
      <h2 style={{ color: "#60a5fa", marginBottom: "10px" }}>AI Video Generator</h2>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Enter your video script here..."
        style={{ width: "100%", height: "120px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {videoUrl && (
        <div style={{ marginTop: "20px" }}>
          <video src={videoUrl} controls width="100%" />
        </div>
      )}
    </div>
  );
}
