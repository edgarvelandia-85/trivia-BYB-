import { useState } from "react";
import MemoryOnline from "./MemoryOnline";

export default function App() {
  const [game, setGame] = useState(null);

  const buttonStyle = (color) => ({
    width: "100%",
    padding: "16px",
    marginTop: "15px",
    border: "none",
    borderRadius: "14px",
    background: color,
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  });

  // =============================
  // MEMORY ONLINE
  // =============================
  if (game === "memory-online") {
    return <MemoryOnline />;
  }

  // =============================
  // TRIVIA
  // =============================
  if (game === "trivia") {
    return (
      <div style={screen}>
        <div style={card}>
          <h1>🧠 Trivia BYB</h1>

          <p>Aquí irá tu trivia.</p>

          <button
            style={buttonStyle("#ef4444")}
            onClick={() => setGame(null)}
          >
            ⬅ Volver
          </button>
        </div>
      </div>
    );
  }

  // =============================
  // MITO O VERDAD
  // =============================
  if (game === "mito") {
    return (
      <div style={screen}>
        <div style={card}>
          <h1>⚡ Mito o Verdad</h1>

          <p>Aquí irá tu juego de mito o verdad.</p>

          <button
            style={buttonStyle("#ef4444")}
            onClick={() => setGame(null)}
          >
            ⬅ Volver
          </button>
        </div>
      </div>
    );
  }

  // =============================
  // MENU PRINCIPAL
  // =============================
  return (
    <div style={screen}>
      <div style={card}>
        <h1
          style={{
            color: "#00ffff",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          🎮 BYB Games
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#ddd",
            marginBottom: "30px",
          }}
        >
          Selecciona un juego
        </p>

        <button
          style={buttonStyle("#2563eb")}
          onClick={() => setGame("trivia")}
        >
          🧠 Trivia
        </button>

        <button
          style={buttonStyle("#7c3aed")}
          onClick={() => setGame("mito")}
        >
          ⚡ Mito o Verdad
        </button>

        <button
          style={buttonStyle("#10b981")}
          onClick={() => setGame("memory-online")}
        >
          🌐 Memory Online
        </button>
      </div>
    </div>
  );
}

const screen = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const card = {
  width: "100%",
  maxWidth: "500px",
  background: "#111827",
  padding: "40px",
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.1)",
};
