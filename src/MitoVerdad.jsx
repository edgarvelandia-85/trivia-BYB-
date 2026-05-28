import React, { useState } from "react";

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

  const [player, setPlayer] = useState("");
  const [started, setStarted] = useState(false);

  const [category, setCategory] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestions = category
    ? categories[category]
    : [];

  const currentQuestion =
    currentQuestions[questionIndex];

  const answerQuestion = (answer) => {

    if (answer === currentQuestion.a) {
      setScore(score + 10);
    }

    const next = questionIndex + 1;

    if (next < currentQuestions.length) {
      setQuestionIndex(next);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setPlayer("");
    setStarted(false);
    setCategory(null);
    setQuestionIndex(0);
    setScore(0);
    setFinished(false);
  };

  // PANTALLA DE REGISTRO

  if (!started) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">

        <div className="bg-[#0f172a] rounded-3xl p-10 w-full max-w-xl shadow-2xl border border-cyan-500/20">

          <h1 className="text-5xl font-black text-center text-cyan-400 mb-8">
            ⚡ Mito o Verdad
          </h1>

          <p className="text-center text-slate-300 mb-6 text-xl">
            Ingresa tu nombre para comenzar
          </p>

          <input
            type="text"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            placeholder="Nombre del jugador"
            className="w-full p-4 rounded-2xl bg-[#111827] border border-cyan-500/30 text-white text-xl outline-none mb-6"
          />

          <button
            onClick={() => {
              if (player.trim() !== "") {
                setStarted(true);
              }
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-xl font-bold hover:scale-105 transition-all"
          >
            🚀 Comenzar
          </button>

        </div>
      </div>
    );
  }

  // CATEGORÍAS

  if (!category) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">

        <div className="bg-[#0f172a] rounded-3xl p-10 w-full max-w-2xl shadow-2xl border border-cyan-500/20">

          <h1 className="text-5xl font-black text-center text-cyan-400 mb-4">
            ⚡ Mito o Verdad
          </h1>

          <p className="text-center text-xl text-slate-300 mb-10">
            Jugador: {player}
          </p>

          <div className="grid gap-4">

            {Object.keys(categories).map((cat) => (

              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setQuestionIndex(0);
                }}
                className="py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-xl font-bold hover:scale-105 transition-all"
              >
                {cat}
              </button>

            ))}

          </div>

        </div>
      </div>
    );
  }

  // RESULTADO FINAL

  if (finished) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">

        <div className="bg-[#0f172a] rounded-3xl p-10 w-full max-w-xl text-center shadow-2xl border border-cyan-500/20">

          <h1 className="text-5xl font-black text-cyan-400 mb-6">
            🎉 Resultado
          </h1>

          <p className="text-2xl mb-4 text-cyan-300">
            Jugador: {player}
          </p>

          <p className="text-3xl mb-8">
            Puntaje: {score}
          </p>

          <button
            onClick={restart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-xl font-bold hover:scale-105 transition-all"
          >
            🔄 Volver al inicio
          </button>

        </div>
      </div>
    );
  }

  // PREGUNTAS

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">

      <div className="bg-[#0f172a] rounded-3xl p-10 w-full max-w-2xl shadow-2xl border border-cyan-500/20">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-black text-cyan-400">
            {category}
          </h1>

          <div className="text-right">
            <p className="text-cyan-300 font-bold">
              {player}
            </p>

            <p className="text-slate-300">
              {score} pts
            </p>
          </div>

        </div>

        <div className="bg-[#111827] p-8 rounded-2xl mb-8 text-center text-2xl font-semibold">
          {currentQuestion.q}
        </div>

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() => answerQuestion(true)}
            className="py-5 rounded-2xl bg-green-500 text-2xl font-bold hover:scale-105 transition-all"
          >
            ✅ VERDAD
          </button>

          <button
            onClick={() => answerQuestion(false)}
            className="py-5 rounded-2xl bg-red-500 text-2xl font-bold hover:scale-105 transition-all"
          >
            ❌ MITO
          </button>

        </div>

      </div>
    </div>
  );
}
