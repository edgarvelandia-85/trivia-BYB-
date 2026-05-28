import React, { useEffect, useMemo, useState } from "react";

/* =========================
   SONIDOS
========================= */
const okSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3"
);
okSound.volume = 0.35;

const badSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3"
);
badSound.volume = 0.18;

/* =========================
   PREGUNTAS
========================= */
const categories = {
  "Marca Personal": [
    {
      q: "La marca personal solo importa para influencers.",
      a: false
    },
    {
      q: "Tu forma de comunicarte también construye tu marca personal.",
      a: true
    },
    {
      q: "Tener muchos seguidores significa tener una marca personal fuerte.",
      a: false
    }
  ],

  Diseño: [
    {
      q: "Un buen diseño solo debe verse bonito.",
      a: false
    },
    {
      q: "Los colores pueden influir en las emociones de una marca.",
      a: true
    },
    {
      q: "Mientras más elementos tenga un diseño, más profesional se ve.",
      a: false
    }
  ],

  "Redes Sociales": [
    {
      q: "Publicar mucho garantiza más ventas.",
      a: false
    },
    {
      q: "La interacción con la audiencia es clave en redes sociales.",
      a: true
    },
    {
      q: "El algoritmo siempre muestra el contenido a todos tus seguidores.",
      a: false
    }
  ],

  Branding: [
    {
      q: "El branding incluye más que solo el logo.",
      a: true
    },
    {
      q: "Las emociones hacen parte del branding.",
      a: true
    },
    {
      q: "El branding puede influir en cuánto está dispuesto a pagar un cliente.",
      a: true
    }
  ],

  Marketing: [
    {
      q: "El marketing busca conectar productos con personas.",
      a: true
    },
    {
      q: "Conocer al público objetivo es importante en marketing.",
      a: true
    },
    {
      q: "Un producto bueno se vende solo, incluso sin marketing.",
      a: false
    }
  ],

  "Cultura BYB": [
    {
      q: "La creatividad es parte fundamental de BYB.",
      a: true
    },
    {
      q: "La innovación ayuda a que una marca evolucione.",
      a: true
    },
    {
      q: "La innovación siempre significa crear algo completamente nuevo.",
      a: false
    }
  ]
};
export default function MitoVerdad() {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});

  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  const [screen, setScreen] = useState("login");

  /* CATEGORÍA ACTIVA REAL */
  const [cat, setCat] = useState("");
  const [index, setIndex] = useState(0);

  const [pts, setPts] = useState(0);
  const [time, setTime] = useState(10);
  const [playedCategories, setPlayedCategories] = useState([]);

  /* ranking */
  const ranking = useMemo(() => {
    return players
      .map((p) => ({
        name: p,
        score: scores[p] || 0
      }))
      .sort((a, b) => b.score - a.score);
  }, [players, scores]);

  /* preguntas activas */
  const questions = cat ? categories[cat] : [];
  const current = questions[index];

  /* reloj */
  useEffect(() => {
    if (screen !== "game") return;

    if (time <= 0) {
      nextQuestion();
      return;
    }

    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, screen, index, cat]);

  /* =========================
     FUNCIONES
  ========================= */

  function registerPlayer() {
    const clean = name.trim();
    if (!clean) return;

    if (!players.includes(clean)) {
      setPlayers([...players, clean]);
    }

    startPlayer(clean);
    setName("");
  }

  function startPlayer(player) {
    setActive(player);
    setPts(0);
    setIndex(0);
    setTime(10);
    setPlayedCategories([]);
    setCat("");
    setScreen("category");
  }

  function startCategory() {
    if (!cat) return;

    setIndex(0);
    setTime(10);
    setScreen("game");
  }

  function choose(answer) {
    let total = pts;

    if (answer === current.a) {
      okSound.currentTime = 0;
      okSound.play();
      total += 10;
      setPts(total);
    } else {
      badSound.currentTime = 0;
      badSound.play();
    }

    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
      setTime(10);
    } else {
      finishCategory(total);
    }
  }

  function nextQuestion() {
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
      setTime(10);
    } else {
      finishCategory(pts);
    }
  }

  function finishCategory(totalPts) {
    const updated = [...playedCategories, cat];

    setPlayedCategories(updated);
    setIndex(0);
    setTime(10);
    setCat("");

    if (updated.length === Object.keys(categories).length) {
      setScores({
        ...scores,
        [active]: totalPts
      });

      setScreen("result");
    } else {
      setScreen("category");
    }
  }

  function resetAll() {
    setPlayers([]);
    setScores({});
    setName("");
    setActive("");
    setScreen("login");
    setCat("");
    setIndex(0);
    setPts(0);
    setTime(10);
    setPlayedCategories([]);
  }

  if (screen === "game" && !current) return null;

  /* =========================
     ESTILOS
  ========================= */

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

  const available = Object.keys(categories).filter(
    (c) => !playedCategories.includes(c)
  );

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={{ textAlign: "center", color: "#00ffff" }}>
          ⚡ Mito o Verdad
        </h1>

        {/* LOGIN */}
        {screen === "login" && (
          <>
            <h2>Registrar jugador</h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escribe tu nombre"
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
              Entrar a jugar
            </button>
          </>
        )}

        {/* CATEGORÍAS */}
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
              <option value="">Selecciona categoría</option>

              {available.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={startCategory}
              style={{
                ...btn,
                width: "100%",
                background: "#16a34a"
              }}
            >
              Empezar categoría
            </button>
          </>
        )}

        {/* JUEGO */}
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

        {/* RESULTADOS */}
        {screen === "result" && (
          <>
            <h2>🏆 Resultados de la sesión</h2>

            {ranking.map((r, i) => (
              <div
                key={r.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,.08)"
                }}
              >
                <span>
                  {i + 1}. {r.name}
                </span>
                <span>{r.score} pts</span>
              </div>
            ))}

            <button
              onClick={() => setScreen("login")}
              style={{
                ...btn,
                width: "100%",
                background: "#2563eb",
                marginTop: "20px"
              }}
            >
              Volver al inicio
            </button>

            <button
              onClick={resetAll}
              style={{
                ...btn,
                width: "100%",
                background: "#dc2626",
                marginTop: "12px"
              }}
            >
              Reiniciar juego
            </button>
          </>
        )}
      </div>
    </div>
  );
}
