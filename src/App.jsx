import React, { useState } from "react";
import Trivia from "./Trivia";
import MitoVerdad from "./MitoVerdad";
import MemoryBYB from "./MemoryBYB";
import BusinessSimulator from "./BusinessSimulator/BusinessSimulator";

export default function App() {
  const [game, setGame] = useState("");

  if (game === "trivia") {
    return <Trivia />;
  }

  if (game === "mito") {
    return <MitoVerdad />;
  }

  if (game === "memory") {
    return <MemoryBYB />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#111827",
          borderRadius: "30px",
          padding: "40px",
          boxShadow: "0 0 40px rgba(0,255,255,.15)"
        }}
      >
        <h1
          style={{
            color: "#22d3ee",
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "30px"
          }}
        >
          🎮 BYB Games
        </h1>

        <button
          onClick={() => setGame("memory")}
          style={btn("#06b6d4", "#0891b2")}
        >
          🧩 Memory BYB
        </button>

        <button
          onClick={() => setGame("trivia")}
          style={btn("#2563eb", "#1d4ed8")}
        >
          🧠 Trivia
        </button>

        <button
          onClick={() => setGame("mito")}
          style={btn("#7c3aed", "#6d28d9")}
        >
          ⚡ Mito o Verdad
        </button>
      </div>
    </div>
  );
}

function btn(color1, color2) {
  return {
    width: "100%",
    padding: "18px",
    marginBottom: "15px",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    background: `linear-gradient(90deg, ${color1}, ${color2})`
  };
}
