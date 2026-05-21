import React, { useState } from "react";
import MemoryOnline from "./MemoryOnline";

export default function App() {
  const [screen, setScreen] = useState("menu");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        fontFamily: "Arial",
        color: "white"
      }}
    >
      {screen === "menu" && (
        <div
          style={{
            width: "100%",
            maxWidth: 500,
            background: "#111827",
            padding: 40,
            borderRadius: 25
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#00ffff"
            }}
          >
            🎮 BYB Games
          </h1>

          <button
            onClick={() => setScreen("memory")}
            style={button("#10b981")}
          >
            🌐 Memory Online
          </button>

          <button style={button("#2563eb")}>
            🧠 Trivia
          </button>

          <button style={button("#7c3aed")}>
            ⚡ Mito o Verdad
          </button>
        </div>
      )}

      {screen === "memory" && (
        <MemoryOnline />
      )}
    </div>
  );
}

function button(color) {
  return {
    width: "100%",
    padding: 15,
    marginTop: 15,
    border: "none",
    borderRadius: 15,
    background: color,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer"
  };
}
