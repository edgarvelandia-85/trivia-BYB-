import React, { useEffect, useMemo, useState } from "react";

/* sonidos */
const okSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3"
);
const badSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3"
);

/* preguntas */
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

export default function MitoVerdad() {
  const [players, setPlayers] = useState(
    () => JSON.parse(localStorage.getItem("mv_players")) || []
  );

  const [scores, setScores] = useState(
    () => JSON.parse(localStorage.getItem("mv_scores")) || {}
  );

  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  const [screen, setScreen] = useState("login");

  const [cat, setCat] = useState("Diseño");
  const [index, setIndex] = useState(0);
  const [pts, setPts] = useState(0);
  const [time, setTime] = useState(10);
  const [playedCategories, setPlayedCategories] = useState([]);

  useEffect(() => {
    localStorage.setItem("mv_players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("mv_scores", JSON.stringify(scores));
  }, [scores]);

  const ranking = useMemo(() => {
    return players
      .map((p) => ({
        name: p,
        score: scores[p] || 0
      }))
      .sort((a, b) => b.score - a.score);
  }, [players, scores]);

  const questions = categories[cat];
  const current = questions[index];

  useEffect(() => {
    if (screen !== "game") return;

    if (time <= 0) {
      nextQuestion();
      return;
    }

    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, screen]);

  function registerPlayer() {
    const clean = name.trim();

    if (!clean) return;

    if (!players.includes(clean)) {
      setPlayers([...players, clean]);
    }

    startGame(clean);
    setName("");
  }

  function startGame(player) {
    setActive(player);
    setPts(0);
    setIndex(0);
    setTime(10);
    setPlayedCategories([]);
    setScreen("category");
  }

  function choose(ans) {
    let total = pts;

    if (ans === current.a) {
      okSound.play();
      total += 10;
      setPts(total);
    } else {
      badSound.play();
    }

    if (index < questions.length - 1) {
      setIndex(index + 1);
      setTime(10);
    } else {
      finishCategory(total);
    }
  }

  function nextQuestion() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setTime(10);
    } else {
      finishCategory(pts);
    }
  }

  function finishCategory(totalPts) {
    const updated = [...playedCategories, cat];
    setPlayedCategories(updated);

    if (updated.length === Object.keys(categories).length) {
      setScores({
        ...scores,
        [active]: (scores[active] || 0) + totalPts
      });

      setScreen("result");
    } else {
      setIndex(0);
      setTime(10);
      setScreen("category");
    }
  }

  const page = {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#050816,#0f172a,#111827)",
    color: "white",
    padding: "30px",
    fontFamily: "Arial"
  };

  const card = {
    maxWidth: "850px",
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

        {/* LOGIN */}
        {screen === "login" && (
          <>
            <h2>Ingresa tu nombre</h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px"
              }}
            />

            <button
              onClick={registerPlayer}
              style={{
                ...btn,
                width: "100%",
                background: "#2563eb"
              }}
            >
              Entrar
            </button>

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

        {/* CATEGORY */}
        {screen === "category" && (
          <>
            <h2>Hola {active}</h2>

            <p>
              Categorías completadas: {playedCategories.length} /{" "}
              {Object.keys(categories).length}
            </p>

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
              {Object.keys(categories)
                .filter((c) => !playedCategories.includes(c))
                .map((c) => (
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
              Empezar Categoría
            </button>
          </>
        )}

        {/* GAME */}
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

        {/* RESULT */}
        {screen === "result" && (
          <>
            <h2>🎉 Juego completado</h2>
            <h1>{pts} puntos</h1>

            <button
              onClick={() => setScreen("login")}
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
