import React, { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("home");

  // =========================
  // TRIVIA
  // =========================
  if (screen === "trivia") {
    return (
      <div style={container}>
        <div style={card}>
          <h1 style={title}>🧠 Trivia BYB</h1>

          <p style={text}>
            Bienvenido al juego de Trivia
          </p>

          <button style={greenBtn}>
            Crear Sala
          </button>

          <button style={blueBtn}>
            Unirse
          </button>

          <button
            style={purpleBtn}
            onClick={() => setScreen("home")}
          >
            ⬅ Volver
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // MITO O VERDAD
  // =========================
  if (screen === "mito") {
    return (
      <div style={container}>
        <div style={card}>
          <h1 style={title}>⚡ Mito o Verdad</h1>

          <p style={text}>
            Próximamente disponible 🔥
          </p>

          <button
            style={purpleBtn}
            onClick={() => setScreen("home")}
          >
            ⬅ Volver
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // HOME
  // =========================
  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>
          🎮 BYB Games
        </h1>

        <button style={greenBtn}>
          🌐 Memory Online
        </button>

        <button
          style={blueBtn}
          onClick={() => setScreen("trivia")}
        >
          🧠 Trivia
        </button>

        <button
          style={purpleBtn}
          onClick={() => setScreen("mito")}
        >
          ⚡ Mito o Verdad
        </button>
      </div>
    </div>
  );
}

// =========================
// ESTILOS
// =========================

const container = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
  padding: "20px"
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

const text = {
  color: "white",
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "20px"
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
