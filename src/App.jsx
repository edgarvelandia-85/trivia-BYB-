import React, { useState } from "react";
import Trivia from "./Trivia";
import MitoVerdad from "./MitoVerdad";
import MemoryOnline from "./MemoryOnline";

export default function App() {
  const [game, setGame] = useState(null);

  if (game === "trivia") {
    return <Trivia onBack={() => setGame(null)} />;
  }

  if (game === "mito") {
    return <MitoVerdad onBack={() => setGame(null)} />;
  }

  if (game === "memory") {
    return <MemoryOnline onBack={() => setGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="bg-[#0f172a] w-full max-w-xl rounded-3xl p-10 shadow-2xl border border-cyan-500/20">

        <h1 className="text-5xl font-black text-center mb-10 text-cyan-400">
          🎮 BYB Games
        </h1>

        <div className="space-y-5">

          <button
            onClick={() => setGame("memory")}
            className="w-full py-5 rounded-2xl text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-400 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🌐 Memory Online
          </button>

          <button
            onClick={() => setGame("trivia")}
            className="w-full py-5 rounded-2xl text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🧠 Trivia
          </button>

          <button
            onClick={() => setGame("mito")}
            className="w-full py-5 rounded-2xl text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            ⚡ Mito o Verdad
          </button>

        </div>
      </div>
    </div>
  );
}
