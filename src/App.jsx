import React, { useState } from "react";

import Trivia from "./Trivia";
import MitoVerdad from "./MitoVerdad";
import MemoryOnline from "./MemoryOnline";

export default function App() {
  const [game, setGame] = useState("");

  if (game === "trivia") return <Trivia />;

  if (game === "mito") return <MitoVerdad />;

  
  if (game === "online")
    return <MemoryOnline />;

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
        fontFamily: "Arial",
        color: "white"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background:
            "rgba(255,255,255,0.05)",
          border:
            "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "35px",
          boxShadow:
            "0 0 25px rgba(0,255,255,.08)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#00ffff",
            marginBottom: "10px"
          }}
        >
          🎮 BYB Games
        </h1>

        <p
          style={{
            textAlign: "center",
            opacity: 0.8,
            marginBottom: "30px"
          }}
        >
          Selecciona un juego
        </p>

        {/* TRIVIA */}
        <button
          onClick={() => setGame("trivia")}
          style={button("#2563eb")}
        >
          🧠 Trivia
        </button>

        {/* MITO */}
        <button
          onClick={() => setGame("mito")}
          style={button("#7c3aed")}
        >
          ⚡ Mito o Verdad
        </button>

        
        {/* ONLINE */}
        <button
          onClick={() => setGame("online")}
          style={button("#10b981")}
        >
          🌐 Memory Online
        </button>
      </div>
    </div>
  );
}

/* estilos botones */

function button(color) {
  return {
    width: "100%",
    padding: "15px",
    marginBottom: "14px",
    border: "none",
    borderRadius: "14px",
    background: color,
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s"
  };
}
