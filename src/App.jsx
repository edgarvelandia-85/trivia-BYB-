import React from "react";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    }}>
      <div style={{
        width: "90%",
        maxWidth: "650px",
        background: "#0f172a",
        padding: "40px",
        borderRadius: "25px",
        boxShadow: "0 0 30px rgba(0,0,0,0.4)"
      }}>
        <h1 style={{
          color: "#22d3ee",
          textAlign: "center",
          fontSize: "48px",
          marginBottom: "40px"
        }}>
          🎮 BYB Games
        </h1>

        <button style={greenBtn}>
          🌐 Memory Online
        </button>

        <button style={blueBtn}>
          🧠 Trivia
        </button>

        <button style={purpleBtn}>
          ⚡ Mito o Verdad
        </button>
      </div>
    </div>
  );
}

const baseBtn = {
  width: "100%",
  padding: "22px",
  marginBottom: "20px",
  border: "none",
  borderRadius: "18px",
  fontSize: "24px",
  fontWeight: "bold",
  color: "white",
  cursor: "pointer"
};

const greenBtn = {
  ...baseBtn,
  background: "#10b981"
};

const blueBtn = {
  ...baseBtn,
  background: "#2563eb"
};

const purpleBtn = {
  ...baseBtn,
  background: "#7c3aed"
};
