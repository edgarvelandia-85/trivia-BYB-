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
            🎮 Crear Sala
          </button>

          <button style={blueBtn}>
            📱 Unirse
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
            Escoge una categoría
          </p>

          <div style={grid}>
            <button style={categoryBtn}>Marca Personal</button>
            <button style={categoryBtn}>Diseño</button>
            <button style={categoryBtn}>Redes Sociales</button>
            <button style={categoryBtn}>Branding</button>
            <button style={categoryBtn}>Marketing</button>
            <button style={categoryBtn}>Cultura BYB</button>
          </div>

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
  background: "linear-gradient(135deg,#020617,#0f172a)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
  padding: "20px"
};

const card = {
  width: "90%",
  maxWidth: "700px",
  background: "#111827",
  padding: "40px",
  borderRadius: "30px",
  boxShadow: "0 0 40px rgba(0,0,0,0.5)"
};

const title = {
  color: "#22d3ee",
  textAlign: "center",
  fontSize: "48px",
  marginBottom: "40px"
};

const text = {
  color: "#cbd5e1",
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "22px"
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
  cursor: "pointer",
  transition: "0.3s"
};

const greenBtn = {
  ...baseBtn,
  background: "linear-gradient(90deg,#10b981,#059669)"
};

const blueBtn = {
  ...baseBtn,
  background: "linear-gradient(90deg,#2563eb,#1d4ed8)"
};

const purpleBtn = {
  ...baseBtn,
  background: "linear-gradient(90deg,#7c3aed,#6d28d9)"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginBottom: "30px"
};

const categoryBtn = {
  padding: "18px",
  borderRadius: "15px",
  border: "none",
  background: "#1e293b",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold"
};
