import { useState } from "react";
import Trivia from "./Trivia";
import MitoVerdad from "./MitoVerdad";

export default function App() {
  const [game, setGame] = useState("");

  if (game === "trivia") return <Trivia />;
  if (game === "mito") return <MitoVerdad />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px"
    }}>
      <h1 style={{fontSize:"48px"}}>BYB Games</h1>

      <button
        onClick={() => setGame("trivia")}
        style={{
          padding:"15px 40px",
          fontSize:"22px",
          borderRadius:"12px"
        }}
      >
        🎯 Jugar Trivia
      </button>

      <button
        onClick={() => setGame("mito")}
        style={{
          padding:"15px 40px",
          fontSize:"22px",
          borderRadius:"12px"
        }}
      >
        ⚡ Mito o Verdad
      </button>
    </div>
  );
}
