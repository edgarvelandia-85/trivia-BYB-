import React, { useState } from "react";
import Trivia from "./Trivia";
import MitoVerdad from "./MitoVerdad";

export default function App() {
  const [game, setGame] = useState("");

  if (game === "trivia") return <Trivia />;
  if (game === "mito") return <MitoVerdad />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#050816,#0f172a,#111827)",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "40px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "450px",
        textAlign: "center",
        boxShadow: "0 0 25px rgba(0,255,255,0.15)"
      }}>
        <h1 style={{
          fontSize: "38px",
          marginBottom: "10px",
          color: "#00ffff",
          textShadow: "0 0 15px #00ffff"
        }}>
          BYB GAMES
        </h1>

        <p style={{
          color: "#cbd5e1",
          marginBottom: "30px"
        }}>
          Elige tu desafío
        </p>

        <button
          onClick={() => setGame("trivia")}
          style={btnStyle}
        >
          🎯 Trivia BYB
        </button>

        <button
          onClick={() => setGame("mito")}
          style={{...btnStyle, marginTop:"15px"}}
        >
          ⚡ Mito o Verdad
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  width: "100%",
  padding: "15px",
  fontSize: "18px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 0 15px rgba(59,130,246,.5)"
};
