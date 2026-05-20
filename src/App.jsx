import React, { useState } from "react";
import Trivia from "./Trivia";
import MitoVerdad from "./MitoVerdad";
import MemoryBYB from "./MemoryBYB";

export default function App() {
  const [game, setGame] = useState("");

  if (game === "trivia") return <Trivia />;
  if (game === "mito") return <MitoVerdad />;
  if (game === "memory") return <MemoryBYB />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#050816,#0f172a,#111827)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "20px"
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border:
            "1px solid rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "450px",
          textAlign: "center",
          boxShadow:
            "0 0 25px rgba(0,255,255,0.15)"
        }}
      >
        <h1
          style={{
            color: "#00ffff",
            marginBottom: "10px"
          }}
        >
          🎮 BYB Games
        </h1>

        <p
          style={{
            opacity: 0.8,
            marginBottom: "30px"
          }}
        >
          Selecciona un juego
        </p>

        {/* TRIVIA */}
        <button
          onClick={() => setGame("trivia")}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            background: "#2563eb",
            color: "white",
            marginBottom: "12px",
            fontSize: "16px"
          }}
        >
          🧠 Trivia
        </button>

        {/* MITO O VERDAD */}
        <button
          onClick={() => setGame("mito")}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            background: "#7c3aed",
            color: "white",
            marginBottom: "12px",
            fontSize: "16px"
          }}
        >
          ⚡ Mito o Verdad
        </button>

        {/* MEMORY */}
        <button
          onClick={() => setGame("memory")}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            background: "#06b6d4",
            color: "white",
            fontSize: "16px"
          }}
        >
          🧩 Memory BYB
        </button>
      </div>
    </div>
  );
}
