import React, { useState } from "react";
import Trivia from "./Trivia";
import MitoVerdad from "./MitoVerdad";
import MemoryOnline from "./MemoryOnline";

export default function App() {
  const [game, setGame] = useState(null);

  if (game === "trivia") {
    return <Trivia />;
  }

  if (game === "mito") {
    return <MitoVerdad />;
  }

  if (game === "memory") {
    return <MemoryOnline />;
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 overflow-hidden relative">

      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-fuchsia-500/20 blur-3xl rounded-full bottom-0 right-0"></div>

      <div className="relative bg-[#0f172a]/90 backdrop-blur-xl w-full max-w-2xl rounded-[32px] p-10 shadow-2xl border border-cyan-400/20">

        <h1 className="text-6xl font-black text-center mb-12 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          🎮 BYB Games
        </h1>

        <div className="space-y-6">

          <button
            onClick={() => setGame("memory")}
            className="w-full py-6 rounded-3xl text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/30"
          >
            🌐 Memory Online
          </button>

          <button
            onClick={() => setGame("trivia")}
            className="w-full py-6 rounded-3xl text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30"
          >
            🧠 Trivia
          </button>

          <button
            onClick={() => setGame("mito")}
            className="w-full py-6 rounded-3xl text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-fuchsia-500/30"
          >
            ⚡ Mito o Verdad
          </button>

        </div>

        <p className="text-center text-slate-400 mt-10">
          BYB Interactive Experience ✨
        </p>

      </div>
    </div>
  );
}
