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

  const [category, setCategory] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestions =
    categories[category] || [];

  const currentQuestion =
    currentQuestions[questionIndex];

  // INICIAR

  const startGame = () => {
    if (player.trim() === "") return;

    setStarted(true);
  };

  // RESPONDER

  const answerQuestion = (answer) => {

    if (answer === currentQuestion.a) {
      setScore((prev) => prev + 10);
    }

    const nextQuestion =
      questionIndex + 1;

    if (nextQuestion < currentQuestions.length) {

      setQuestionIndex(nextQuestion);

    } else {

      setFinished(true);
    }
  };

  // REINICIAR

  const restartGame = () => {

    setPlayer("");
    setStarted(false);

    setCategory("");
    setQuestionIndex(0);

    setScore(0);
    setFinished(false);
  };

  // REGISTRO

  if (!started) {

    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">

        <div className="bg-[#0f172a] p-10 rounded-3xl w-full max-w-xl border border-cyan-500/20 shadow-2xl">

          <h1 className="text-5xl font-black text-center text-cyan-400 mb-8">
            ⚡ Mito o Verdad
          </h1>

          <input
            type="text"
            placeholder="Nombre del jugador"
            value={player}
            onChange={(e) =>
              setPlayer(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-[#111827] text-white border border-cyan-500/30 outline-none mb-6 text-xl"
          />

          <button
            onClick={startGame}
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
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">

        <div className="bg-[#0f172a] p-10 rounded-3xl w-full max-w-2xl border border-cyan-500/20 shadow-2xl">

          <h1 className="text-5xl font-black text-center text-cyan-400 mb-4">
            ⚡ Mito o Verdad
          </h1>

          <p className="text-center text-cyan-300 text-xl mb-10">
            Jugador: {player}
          </p>

          <div className="grid gap-4">

            {Object.keys(categories).map((cat) => (

              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setQuestionIndex(0);
                  setFinished(false);
                }}
                className="py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-xl font-bold hover:scale-105 transition-all"
              >
                {cat}
              </button>

            ))}

          </div>

        </div>
      </div>
    );
  }

  // RESULTADO

  if (finished) {

    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">

        <div className="bg-[#0f172a] p-10 rounded-3xl w-full max-w-xl border border-cyan-500/20 shadow-2xl text-center">

          <h1 className="text-5xl font-black text-cyan-400 mb-6">
            🎉 Resultado
          </h1>

          <p className="text-2xl text-cyan-300 mb-4">
            {player}
          </p>

          <p className="text-4xl font-black mb-8">
            {score} pts
          </p>

          <button
            onClick={restartGame}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-xl font-bold hover:scale-105 transition-all"
          >
            🔄 Reiniciar
          </button>

        </div>
      </div>
    );
  }

  // PREGUNTAS

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">

      <div className="bg-[#0f172a] p-10 rounded-3xl w-full max-w-2xl border border-cyan-500/20 shadow-2xl">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-black text-cyan-400">
              {category}
            </h1>

            <p className="text-cyan-300">
              {player}
            </p>
          </div>

          <div className="text-right">
            <p className="text-white text-2xl font-bold">
              {score}
            </p>

            <p className="text-slate-400">
              puntos
            </p>
          </div>

        </div>

        <div className="bg-[#111827] p-8 rounded-2xl text-center text-2xl font-semibold mb-8">
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
