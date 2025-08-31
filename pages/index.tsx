import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");

  async function handleGenerate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputText }),
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>🎬 FadeAI – Your AI Video Creator</h1>
      <textarea
        rows={6}
        cols={60}
        placeholder="Enter your video script here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <button
        onClick={handleGenerate}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "16px",
          background: "black",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Generate
      </button>

      {response && (
        <pre
          style={{
            marginTop: "2rem",
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
        </pre>
      )}
    </div>
  );
}
