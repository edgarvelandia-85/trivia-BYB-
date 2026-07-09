import React, { useMemo, useState } from "react";
import { COMPANIES, SERVICES } from "./data";

export default function BusinessSimulator() {
  // Empresa aleatoria
  const company = useMemo(() => {
    return COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
  }, []);

  const [player, setPlayer] = useState("");
  const [started, setStarted] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [levels, setLevels] = useState({
    branding: 0,
    manual: 0,
    marketing: 0,
    commercial: 0,
    social: 0,
    website: 0,
    templates: 0,
    formulas: 0,
  });

  const question = company.questions[questionIndex];

  function answer(index) {
    if (index === question.correct) {
      setScore((s) => s + question.score);

      setLevels((prev) => {
        const next = { ...prev };

        Object.keys(question.impact).forEach((key) => {
          next[key] += question.impact[key];
        });

        return next;
      });
    }

    if (questionIndex < company.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert("🎉 Simulación finalizada");
    }
  }

  if (!started) {
    return (
      <div
        style={{
          background: "#06132a",
          minHeight: "100vh",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>🚀 BYB BUSINESS SIMULATOR</h1>

        <input
          placeholder="Nombre del participante"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          style={{
            padding: 12,
            width: 300,
            borderRadius: 8,
            border: "none",
            marginTop: 20,
          }}
        />

        <button
          style={{
            marginTop: 20,
            padding: "12px 40px",
            background: "#00d4ff",
            border: "none",
            borderRadius: 10,
            fontSize: 18,
            cursor: "pointer",
          }}
          onClick={() => {
            if (!player.trim()) {
              alert("Escribe tu nombre");
              return;
            }

            setStarted(true);
          }}
        >
          Comenzar
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#06132a",
        minHeight: "100vh",
        color: "white",
        padding: 30,
      }}
    >
      <h1>
        {company.icon} {company.company}
      </h1>

      <p>
        <b>Jugador:</b> {player}
      </p>

      <p>
        <b>Objetivo:</b> {company.objective}
      </p>

      <hr />

      <h2>
        Pregunta {questionIndex + 1} de {company.questions.length}
      </h2>

      <h3>{question.question}</h3>

      {question.options.map((option, i) => (
        <button
          key={i}
          onClick={() => answer(i)}
          style={{
            display: "block",
            width: "100%",
            marginTop: 12,
            padding: 15,
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          {option}
        </button>
      ))}

      <hr />

      <h2>Puntaje: {score}</h2>

      {SERVICES.map((service) => (
        <div key={service.id} style={{ marginBottom: 15 }}>
          <div>
            {service.icon} {service.name}
          </div>

          <progress
            value={levels[service.id]}
            max={100}
            style={{
              width: "100%",
              height: 20,
            }}
          />
        </div>
      ))}
    </div>
  );
}
