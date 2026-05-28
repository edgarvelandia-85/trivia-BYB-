import React, { useState } from "react";
import MitoVerdad from "./MitoVerdad";

export default function App() {
  const [screen, setScreen] = useState("menu");

  if (screen === "mito") {
    return <MitoVerdad />;
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="bg-[#0f172a] w-full max-w-xl rounded-3xl p-10 shadow-2xl border border-cyan-500/20">

        <h1 className="text-5xl font-black text-center mb-10 text-cyan-400">
          🎮 BYB Games
        </h1>

        <button
          onClick={() => setScreen("mito")}
          className="w-full py-5 rounded-2xl text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          ⚡ Mito o Verdad
        </button>

      </div>
    </div>
  );
}
