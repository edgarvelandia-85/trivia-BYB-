import React, { useEffect, useState } from "react";

const categories = {
"💡 Marca Personal": [
{
q: "Si eres muy bueno en lo que haces, no necesitas trabajar tu marca personal.",
a: false
},
{
q: "Las personas ya tienen una marca personal aunque nunca hayan pensado en ello.",
a: true
},
{
q: "Tener muchos seguidores significa tener una marca personal fuerte.",
a: false
},
{
q: "No comunicar también comunica algo sobre tu marca personal.",
a: true
},
{
q: "Una marca personal auténtica significa contar absolutamente todo sobre tu vida.",
a: false
}
],

"📱 Manejo de Redes Sociales": [
{
q: "Un video viral siempre beneficia a una marca.",
a: false
},
{
q: "La mejor red social depende del público al que quieres llegar.",
a: true
},
{
q: "Más alcance siempre significa mejor estrategia.",
a: false
},
{
q: "Escuchar a la audiencia es tan importante como publicar contenido.",
a: true
},
{
q: "Copiar exactamente lo que hace la competencia garantiza resultados similares.",
a: false
}
],

"🤝 Networking": [
{
q: "El networking consiste principalmente en conseguir contactos útiles.",
a: false
},
{
q: "Escuchar puede generar mejores conexiones que hablar.",
a: true
},
{
q: "Agregar personas en LinkedIn significa que ya hiciste networking.",
a: false
},
{
q: "Una conversación informal puede convertirse en una oportunidad profesional.",
a: true
},
{
q: "Mientras más personas conozcas, mejor será tu red profesional.",
a: false
}
],

"🎯 Marketing": [
{
q: "Un producto excelente siempre se vende solo.",
a: false
},
{
q: "El marketing busca entender a las personas antes de venderles.",
a: true
},
{
q: "Si una publicación tiene muchos likes, necesariamente generó resultados.",
a: false
},
{
q: "Un cliente puede comprar por razones emocionales y justificarlo con lógica.",
a: true
},
{
q: "Bajar precios es la única forma de competir en el mercado.",
a: false
}
],

"🌎 Cultura General": [
  {
    q: "La Gran Muralla China puede verse claramente desde la Luna a simple vista.",
    a: false
  },
  {
    q: "Australia es más ancha que la Luna.",
    a: true
  },
  {
    q: "Los tiburones existían antes que los árboles.",
    a: true
  },
  {
    q: "Napoleón Bonaparte era extremadamente bajo para su época.",
    a: false
  },
  {
    q: "El corazón de una ballena azul puede pesar más que un automóvil pequeño.",
    a: true
  },
  {
    q: "Los camellos almacenan agua en sus jorobas.",
    a: false
  },
  {
    q: "La Torre Eiffel puede crecer varios centímetros durante el verano.",
    a: true
  },
  {
    q: "Un día en Venus dura más que un año en Venus.",
    a: true
  }
],
  
"✨ Be Your Brand": [
{
q: "Una marca fuerte se construye únicamente con un buen logo.",
a: false
},
{
q: "La confianza puede convertirse en una ventaja competitiva.",
a: true
},
{
q: "Un manual de marca limita la creatividad.",
a: false
},
{
q: "Las habilidades humanas pueden influir en los resultados de una organización.",
a: true
},
{
q: "La coherencia es más importante que la perfección en una marca.",
a: true
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
              {score} / 330
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
