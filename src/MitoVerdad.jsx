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
    setCategory(null);
    setQuestionIndex(0);
    setScore(0);
    setFinished(false);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
        <div className="bg-[#0f172a] rounded-3xl p-10 w-full max-w-2xl shadow-2xl border border-cyan-500/20">

          <h1 className="text-5xl font-black text-center text-cyan-400 mb-10">
            ⚡ Mito o Verdad
          </h1>

          <div className="grid gap-4">
            {Object.keys(categories).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
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

  if (finished) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
        <div className="bg-[#0f172a] rounded-3xl p-10 w-full max-w-xl text-center shadow-2xl border border-cyan-500/20">

          <h1 className="text-5xl font-black text-cyan-400 mb-6">
            🎉 Resultado
          </h1>

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

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
      <div className="bg-[#0f172a] rounded-3xl p-10 w-full max-w-2xl shadow-2xl border border-cyan-500/20">

        <h1 className="text-4xl font-black text-cyan-400 mb-6 text-center">
          {category}
        </h1>

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

        <div className="mt-8 text-center text-xl">
          Puntaje: {score}
        </div>
      </div>
    </div>
  );
}
