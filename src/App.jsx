import React, { useEffect, useState } from "react";

const bank = {
  colombia: [
    { q: "¿En qué año nació la Gran Colombia?", o: ["1810", "1819", "1821", "1830"], c: 1 },
    { q: "¿Qué fruta aparece en el escudo de Colombia?", o: ["Piña", "Granada", "Guanábana", "Maracuyá"], c: 1 },
    { q: "¿El mar que baña Cartagena es?", o: ["Caribe", "Atlántico", "Golfo de México", "Pacífico"], c: 0 }
  ],

  cultura: [
    { q: "¿Cuál es el país más grande del mundo?", o: ["Canadá", "China", "Rusia", "Estados Unidos"], c: 2 },
    { q: "¿Cuál es la moneda oficial de Japón?", o: ["Yuan", "Won", "Yen", "Baht"], c: 2 },
    { q: "¿Cuál es el océano más grande?", o: ["Atlántico", "Índico", "Pacífico", "Ártico"], c: 2 }
  ],

  musica: [
    { q: "¿Quién es el Rey del Pop?", o: ["Elvis Presley", "Michael Jackson", "Prince", "Bruno Mars"], c: 1 },
    { q: "¿Qué banda lanzó Bohemian Rhapsody?", o: ["Queen", "ABBA", "Aerosmith", "The Beatles"], c: 0 },
    { q: "¿Quién canta Shape of You?", o: ["Ed Sheeran", "Shawn Mendes", "Justin Bieber", "Sam Smith"], c: 0 }
  ],

  ciencia: [
    { q: "¿Cuál es el planeta más grande del sistema solar?", o: ["Saturno", "Marte", "Júpiter", "Neptuno"], c: 2 },
    { q: "¿Qué gas usamos principalmente para respirar?", o: ["Nitrógeno", "Oxígeno", "Helio", "Dióxido de carbono"], c: 1 },
    { q: "¿Cuál es el símbolo químico del oro?", o: ["Ag", "Au", "Ar", "O"], c: 1 }
  ]
};

export default function App() {
  const [screen, setScreen] = useState("join");
  const [name, setName] = useState("");
  const [code, setCode] = useState("BYB25");
  const [cat, setCat] = useState("");
  const [idx, setIdx] = useState(0);
  const [time, setTime] = useState(10);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (screen === "game" && time > 0) {
      const t = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(t);
    }

    if (time === 0 && screen === "game") next();
  }, [time, screen]);

  const startCat = (c) => {
    setCat(c);
    setIdx(0);
    setScore(0);
    setTime(10);
    setScreen("game");
  };

  const next = () => {
    if (idx < 2) {
      setIdx(idx + 1);
      setTime(10);
    } else {
      setScreen("end");
    }
  };

  const ans = (i) => {
    if (i === bank[cat][idx].c) {
      setScore(score + time * 10);
    }
    next();
  };

  if (screen === "join") {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-3">
        <h1 className="text-3xl font-bold">🏆 Trivia BYB</h1>
        <input className="border p-2 w-full" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 w-full" value={code} onChange={(e) => setCode(e.target.value)} />
        <button className="border px-4 py-2 rounded" onClick={() => setScreen("cats")}>Entrar</button>
      </div>
    );
  }

  if (screen === "cats") {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-3">
        <h2 className="text-2xl font-bold">Elige categoría</h2>
        <button className="border px-4 py-2 rounded w-full" onClick={() => startCat("colombia")}>🇨🇴 Colombia</button>
        <button className="border px-4 py-2 rounded w-full" onClick={() => startCat("cultura")}>🌎 Cultura General</button>
        <button className="border px-4 py-2 rounded w-full" onClick={() => startCat("musica")}>🎵 Música</button>
        <button className="border px-4 py-2 rounded w-full" onClick={() => startCat("ciencia")}>🔬 Ciencia</button>
      </div>
    );
  }

  if (screen === "game") {
    const q = bank[cat][idx];

    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-3">
        <div>⏱ {time}s</div>
        <h2 className="text-xl font-bold">{q.q}</h2>

        {q.o.map((x, i) => (
          <button key={i} className="block border px-4 py-2 rounded w-full my-2" onClick={() => ans(i)}>
            {x}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto text-center space-y-3">
      <h2 className="text-3xl font-bold">🏆 Final</h2>
      <p>{name}</p>
      <p>Puntaje: {score}</p>
      <button className="border px-4 py-2 rounded" onClick={() => setScreen("cats")}>Jugar otra categoría</button>
    </div>
  );
}
