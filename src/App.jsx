import React, { useState } from "react";
import Trivia from "./Trivia";
import MitoVerdad from "./MitoVerdad";

export default function App() {
  const [game, setGame] = useState("");

  if (game === "trivia") return <Trivia />;
  if (game === "mito") return <MitoVerdad />;

  return (
    <div>
      <h1>BYB Games</h1>

      <button onClick={() => setGame("trivia")}>
        Trivia
      </button>

      <button onClick={() => setGame("mito")}>
        Mito o Verdad
      </button>
    </div>
  );
}
