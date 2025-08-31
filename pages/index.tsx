const [images, setImages] = useState([]);

const handleGenerateImages = async () => {
  const res = await fetch("/api/generateImages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ script, numImages: 4 }),
  });
  const data = await res.json();
  setImages(data.images);
};

...

{script && (
  <div style={{ marginTop: "20px", whiteSpace: "pre-line" }}>
    <h2>Generated Script:</h2>
    <p>{script}</p>
    <button onClick={handleGenerateImages}>Generate Images</button>
  </div>
)}

{images.length > 0 && (
  <div style={{ marginTop: "20px" }}>
    <h2>Generated Images:</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
      {images.map((img, i) => (
        <div key={i}>
          <img src={img.url} alt={img.prompt} style={{ width: "100%" }} />
          <p>{img.prompt}</p>
        </div>
      ))}
    </div>
  </div>
)}        }}
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
