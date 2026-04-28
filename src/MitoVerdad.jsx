import React, { useEffect, useMemo, useState } from "react";

const categories = {
  Cultura: [
    { q: "La Gran Muralla China es visible desde el espacio.", a: false },
    { q: "Australia es país y continente.", a: true },
    { q: "Shakespeare escribió Hamlet.", a: true }
  ],
  Diseño: [
    { q: "El formato SVG pierde calidad al ampliar.", a: false },
    { q: "CMYK se usa para impresión.", a: true },
    { q: "PNG siempre pesa menos que JPG.", a: false }
  ],
  Marketing: [
    { q: "Una CTA ayuda a convertir.", a: true },
    { q: "Más seguidores siempre significan más ventas.", a: false },
    { q: "El email marketing aún funciona.", a: true }
  ],
  Tecnología: [
    { q: "Reiniciar no sirve para nada.", a: false },
    { q: "La nube significa archivos en internet.", a: true },
    { q: "Modo incógnito te vuelve invisible.", a: false }
  ],
  General: [
    { q: "El lirio de mayo es la flor nacional de Colombia.", a: true },
    { q: "Los murciélagos son ciegos.", a: false },
    { q: "El agua hierve a 100°C al nivel del mar.", a: true }
  ]
};

const defaultPlayers = ["Jugador 1", "Jugador 2", "Jugador 3"];

export default function MitoVerdad() {
  const [players, setPlayers] = useState(
    () => JSON.parse(localStorage.getItem("mv_players")) || defaultPlayers
  );

  const [scores, setScores] = useState(
    () => JSON.parse(localStorage.getItem("mv_scores")) || {}
  );

  const [screen, setScreen] = useState("home");
  const [active, setActive] = useState("");
  const [cat, setCat] = useState("Diseño");
  const [index, setIndex] = useState(0);
  const [pts, setPts] = useState(0);
  const [time, setTime] = useState(10);

  useEffect(() => {
    localStorage.setItem("mv_players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("mv_scores", JSON.stringify(scores));
  }, [scores]);

  const ranking = useMemo(() => {
    return players
      .map((p) => ({ name: p, score: scores[p] || 0 }))
      .sort((a, b) => b.score - a.score);
  }, [players, scores]);

  const questions = categories[cat];
  const current = questions[index];

  useEffect(() => {
    if (screen !== "game") return;

    if (time <= 0) nextQuestion();
    const t = setTimeout(() => setTime(time - 1), 1000);

    return () => clearTimeout(t);
  }, [time, screen]);

  function nextQuestion() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setTime(10);
    } else {
      setScores({
        ...scores,
        [active]: (scores[active] || 0) + pts
      });
      setScreen("result");
    }
  }

  function choose(ans) {
    let total = pts;
    if (ans === current.a) {
      total += 10;
      setPts(total);
    }

    if (index < questions.length - 1) {
      setIndex(index + 1);
      setTime(10);
    } else {
      setScores({
        ...scores,
        [active]: (scores[active] || 0) + total
      });
      setScreen("result");
    }
  }

  function start(name) {
    setActive(name);
    setPts(0);
    setIndex(0);
    setTime(10);
    setScreen("category");
  }

  const page = {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#050816,#0f172a,#111827)",
    color: "white",
    padding: "30px",
    fontFamily: "Arial"
  };

  const card = {
    maxWidth: "800px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 25px rgba(0,255,255,.08)"
  };

  const btn = {
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={{ textAlign: "center", color: "#00ffff" }}>
          ⚡ Mito o Verdad
        </h1>

        {screen === "home" && (
          <>
            <h3>Jugadores</h3>

            {players.map((p, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <input
                  value={p}
                  onChange={(e) => {
                    const arr = [...players];
                    arr[i] = e.target.value;
                    setPlayers(arr);
                  }}
                  style={{
                    padding: "10px",
                    width: "60%",
                    marginRight: "10px",
                    borderRadius: "10px"
                  }}
                />

                <button
                  onClick={() => start(p)}
                  style={{
                    ...btn,
                    background: "#2563eb"
                  }}
                >
                  Jugar
                </button>
              </div>
            ))}

            <h3 style={{ marginTop: "25px" }}>🏆 Ranking</h3>

            {ranking.map((r, i) => (
              <div
                key={r.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(255,255,255,.08)"
                }}
              >
                <span>
                  {i + 1}. {r.name}
                </span>
                <span>{r.score} pts</span>
              </div>
            ))}
          </>
        )}

        {screen === "category" && (
          <>
            <h2>Hola {active}</h2>

            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "20px"
              }}
            >
              {Object.keys(categories).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <button
              onClick={() => setScreen("game")}
              style={{
                ...btn,
                width: "100%",
                background: "#16a34a"
              }}
            >
              Empezar
            </button>
          </>
        )}

        {screen === "game" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px"
              }}
            >
              <span>{active}</span>
              <span>{pts} pts</span>
              <span>⏱ {time}s</span>
            </div>

            <h2 style={{ marginBottom: "25px" }}>{current.q}</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px"
              }}
            >
              <button
                onClick={() => choose(true)}
                style={{
                  ...btn,
                  background: "#059669"
                }}
              >
                VERDAD
              </button>

              <button
                onClick={() => choose(false)}
                style={{
                  ...btn,
                  background: "#e11d48"
                }}
              >
                MITO
              </button>
            </div>
          </>
        )}

        {screen === "result" && (
          <>
            <h2>🎉 Partida Terminada</h2>
            <h1>{pts} puntos</h1>

            <button
              onClick={() => setScreen("home")}
              style={{
                ...btn,
                width: "100%",
                background: "#2563eb"
              }}
            >
              Volver al inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
}
