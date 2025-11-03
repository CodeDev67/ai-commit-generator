import React, { useState } from "react";

function App() {
  const [repoPath, setRepoPath] = useState(".");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:8080/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ repo_path: repoPath }),
      });

      if (!res.ok) throw new Error("Server Error: " + res.statusText);

      const data = await res.json();
      setResponse(data.result || JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    alert("✅ Copied to clipboard!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}> RepoMind </h1>

      <input
        type="text"
        placeholder="Enter repo path (e.g. C:\\Users\\aasif\\Desktop\\test-git)"
        value={repoPath}
        onChange={(e) => setRepoPath(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleGenerate} style={styles.button} disabled={loading}>
        {loading ? "⏳ Generating..." : "Generate Commit Message"}
      </button>

      {loading && <div style={styles.spinner}></div>}

      {error && <p style={styles.error}>⚠️ {error}</p>}

      {response && (
        <div style={styles.resultBox}>
          <pre style={styles.codeBlock}>{response}</pre>
          <button onClick={handleCopy} style={styles.copyButton}>
            📋 Copy
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    color: "#222",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    width: "400px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  spinner: {
    margin: "20px auto",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #007bff",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },
  resultBox: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "30px",
    textAlign: "left",
    maxWidth: "800px",
    margin: "30px auto",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  codeBlock: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontFamily: "monospace",
  },
  copyButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "20px",
  },
};

export default App;
