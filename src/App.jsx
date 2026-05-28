import React, { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "trivia") {
    return (
      <div style={container}>
        <div style={card}>
          <h1 style={title}>🧠 Trivia BYB</h1>

          <p style={{color:"white", textAlign:"center"}}>
            Bienvenido al juego de Trivia
          </p>

          <button style={greenBtn}>
            Crear Sala
          </button>

          <button style={blueBtn}>
            Unirse
          </button>

          <button style={purpleBtn} onClick={() => setScreen("home")}>
            ⬅ Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>
          🎮 BYB Games
        </h1>

        <button style={greenBtn}>
          🌐 Memory Online
        </button>

        <button style={blueBtn} onClick={() => setScreen("trivia")}>
          🧠 Trivia
        </button>

        <button style={purpleBtn}>
          ⚡ Mito o Verdad
        </button>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial"
};

const card = {
  width: "90%",
  maxWidth: "650px",
  background: "#0f172a",
  padding: "40px",
  borderRadius: "25px",
  boxShadow: "0 0 30px rgba(0,0,0,0.4)"
};

const title = {
  color: "#22d3ee",
  textAlign: "center",
  fontSize: "48px",
  marginBottom: "40px"
};

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
