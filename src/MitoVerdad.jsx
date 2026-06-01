import React, { useEffect, useState } from "react";

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

const correctSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3"
);

const wrongSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3"
);

correctSound.volume = 0.3;
wrongSound.volume = 0.15;

export default function MitoVerdad() {
  const [player, setPlayer] = useState("");
  const [screen, setScreen] = useState("login");

  const [score, setScore] = useState(0);

  const [category, setCategory] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);

  const [completed, setCompleted] = useState([]);

  const [time, setTime] = useState(10);

  const questions = categories[category] || [];
  const question = questions[questionIndex];

  useEffect(() => {
    if (screen !== "game") return;

    if (time <= 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, screen]);

  function startGame() {
    if (!player.trim()) return;
    setScreen("categories");
  }

  function selectCategory(cat) {
    setCategory(cat);
    setQuestionIndex(0);
    setTime(10);
    setScreen("game");
  }

  function answer(value) {
    if (value === question.a) {
      correctSound.currentTime = 0;
      correctSound.play();

      setScore((prev) => prev + 10);
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }

    nextQuestion();
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setTime(10);
    } else {
      const updated = [...completed, category];

      setCompleted(updated);

      if (updated.length === Object.keys(categories).length) {
        setScreen("result");
      } else {
        setScreen("categories");
      }
    }
  }

  function restart() {
    setPlayer("");
    setScore(0);
    setCompleted([]);
    setCategory("");
    setQuestionIndex(0);
    setTime(10);
    setScreen("login");
  }

  const page = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#050816,#0f172a,#111827)",
    color: "white",
    padding: "25px",
    fontFamily: "Arial"
  };

  const card = {
    maxWidth: "900px",
    margin: "0 auto",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 0 25px rgba(0,255,255,.1)"
  };

  const button = {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
    marginTop: "10px"
  };

  return (
    <div style={page}>
      <div style={card}>

        <h1
          style={{
            textAlign: "center",
            color: "#00ffff"
          }}
        >
          ⚡ MITO O VERDAD
        </h1>

        {screen === "login" && (
          <>
            <h2>Registro</h2>

            <input
              value={player}
              onChange={(e) =>
                setPlayer(e.target.value)
              }
              placeholder="Tu nombre"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px"
              }}
            />

            <button
              onClick={startGame}
              style={{
                ...button,
                background: "#2563eb"
              }}
            >
              Comenzar
            </button>
          </>
        )}

        {screen === "categories" && (
          <>
            <h2>
              Jugador: {player}
            </h2>

            <p>
              Puntaje: {score}
            </p>

            {Object.keys(categories)
              .filter(
                (cat) =>
                  !completed.includes(cat)
              )
              .map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    selectCategory(cat)
                  }
                  style={{
                    ...button,
                    background:
                      "linear-gradient(90deg,#7c3aed,#2563eb)"
                  }}
                >
                  {cat}
                </button>
              ))}
          </>
        )}

        {screen === "game" && question && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "20px"
              }}
            >
              <div>{category}</div>
              <div>⏱ {time}s</div>
            </div>

            <div
              style={{
                background:
                  "rgba(255,255,255,.08)",
                padding: "30px",
                borderRadius: "20px",
                textAlign: "center",
                fontSize: "22px",
                marginBottom: "20px"
              }}
            >
              {question.q}
            </div>

            <button
              onClick={() =>
                answer(true)
              }
              style={{
                ...button,
                background: "#16a34a"
              }}
            >
              ✅ VERDAD
            </button>

            <button
              onClick={() =>
                answer(false)
              }
              style={{
                ...button,
                background: "#dc2626"
              }}
            >
              ❌ MITO
            </button>
          </>
        )}

        {screen === "result" && (
          <>
            <h2
              style={{
                textAlign: "center"
              }}
            >
              🏆 Resultado Final
            </h2>

            <h3
              style={{
                textAlign: "center"
              }}
            >
              {player}
            </h3>

            <h1
              style={{
                textAlign: "center",
                color: "#00ffff"
              }}
            >
              {score} / 180
            </h1>

            <p
              style={{
                textAlign: "center"
              }}
            >
              Categorías completadas:
              {" "}
              {completed.length}/6
            </p>

            <button
              onClick={restart}
              style={{
                ...button,
                background: "#2563eb"
              }}
            >
              🔄 Jugar de nuevo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
