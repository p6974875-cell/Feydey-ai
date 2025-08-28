import { useState } from "react";

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [engine, setEngine] = useState("replicate");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setVideoUrl("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, engine }),
      });
      const data = await res.json();
      if (res.ok) setVideoUrl(data.output);
      else setError(data.error);
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <textarea rows={3} style={{ width: "60%" }} value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
      <br />
      <select value={engine} onChange={(e)=>setEngine(e.target.value)}>
        <option value="replicate">Replicate</option>
        <option value="shotstack">Shotstack</option>
        <option value="unsplash">Unsplash</option>
        <option value="pexels">Pexels</option>
        <option value="groq">Groq</option>
        <option value="openai">OpenAI</option>
        <option value="gemini">Gemini</option>
        <option value="openrouter">OpenRouter</option>
      </select>
      <br />
      <button onClick={handleGenerate} disabled={loading}>{loading ? "Generating..." : "Generate"}</button>
      {error && <p style={{color:"red"}}>{error}</p>}
      {videoUrl && <video src={videoUrl} controls width="480" />}
    </div>
  );
}