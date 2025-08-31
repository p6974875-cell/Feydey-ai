import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setScript("");

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputText }),
      });

      const data = await response.json();
      if (data.script) {
        setScript(data.script);
      } else {
        setScript("❌ Failed to generate script.");
      }
    } catch (err) {
      console.error(err);
      setScript("❌ Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎬 Feydey AI</h1>
      <p>Enter your idea and let AI create a video script for you.</p>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your idea here..."
        rows={5}
        cols={50}
        style={{ display: "block", marginBottom: "1rem" }}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        {loading ? "Generating..." : "Generate Script"}
      </button>

      {script && (
        <div style={{ marginTop: "2rem" }}>
          <h2>📝 Generated Script:</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{script}</pre>
        </div>
      )}
    </div>
  );
}
