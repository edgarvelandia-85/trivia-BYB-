import React, { useEffect, useMemo, useState } from "react";
import { COMPANIES, SERVICES } from "./data";

export default function BusinessSimulator() {

  const company = useMemo(() => {
    return COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
  }, []);

  const [player, setPlayer] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [score, setScore] = useState(0);

  const [time, setTime] = useState(20);

  const [selected, setSelected] = useState(null);

  const [showExplanation, setShowExplanation] = useState(false);

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

  const question = useMemo(() => {

  const original = company.questions[questionIndex];

  const options = original.options.map((text, index) => ({
    text,
    correct: index === original.correct
  }));

  // Fisher-Yates Shuffle
  for (let i = options.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [options[i], options[j]] = [options[j], options[i]];

  }

  return {
    ...original,
    options,
    correct: options.findIndex(o => o.correct)
  };

}, [company, questionIndex]);

    useEffect(() => {

  if (!started || finished || showExplanation) return;

  if (time === 0) {
    nextQuestion();
    return;
  }

    const timer = setTimeout(() => {

      setTime((t) => t - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [time, started, finished, showExplanation]);

  function answer(index) {

    if (selected !== null) return;

    setSelected(index);

    if (index === question.correct) {

      setScore((s) => s + question.score);

      setLevels((prev) => {

        const copy = { ...prev };

        Object.keys(question.impact).forEach((key) => {

          copy[key] += question.impact[key];

          if (copy[key] > 100) copy[key] = 100;

        });

        return copy;

      });

    }

    setShowExplanation(true);

  }

  function nextQuestion() {

    if (questionIndex === company.questions.length - 1) {

      setFinished(true);

      return;

    }

    setQuestionIndex((q) => q + 1);

    setSelected(null);

    setShowExplanation(false);

    setTime(20);

  }
    // ============================
  // PANTALLA DE BIENVENIDA
  // ============================

  if (!started) {
    return (
      <div style={styles.background}>
        <div style={styles.card}>

          <h1 style={styles.title}>
            🚀 BYB BUSINESS SIMULATOR
          </h1>

          <p style={styles.subtitle}>
            Ponte en el papel de un consultor de Be Your Brand.
            Toma decisiones estratégicas y desarrolla los servicios
            adecuados para cada empresa.
          </p>

          <input
            style={styles.input}
            placeholder="Escribe tu nombre"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
          />

          <button
            style={styles.start}
            onClick={() => {

              if (!player.trim()) {
                alert("Escribe tu nombre");
                return;
              }

              setStarted(true);

            }}
          >
            COMENZAR
          </button>

        </div>
      </div>
    );
  }

  // ============================
  // PANTALLA FINAL
  // ============================

  if (finished) {

    let level = "🥉 Consultor Junior";

    if (score >= 250) level = "🏆 Consultor Elite";
    else if (score >= 200) level = "🥇 Consultor Senior";
    else if (score >= 150) level = "🥈 Consultor Intermedio";

    const bestService = SERVICES.reduce((a, b) =>
      levels[a.id] > levels[b.id] ? a : b
    );

    return (

      <div style={styles.background}>

        <div style={styles.card}>

          <h1 style={styles.title}>
            🎉 Simulación Finalizada
          </h1>

          <h2>
            {player}
          </h2>

          <h1
            style={{
              color:"#22d3ee",
              fontSize:60
            }}
          >
            {score}
          </h1>

          <h2>{level}</h2>

          <p style={{marginTop:25}}>
            Servicio más desarrollado
          </p>

          <h2>
            {bestService.icon} {bestService.name}
          </h2>

          <button
            style={styles.start}
            onClick={() => window.location.reload()}
          >
            JUGAR DE NUEVO
          </button>

        </div>

      </div>

    );

  }
    return (
    <div style={styles.background}>

      <div style={styles.container}>

        {/* PANEL IZQUIERDO */}

        <div style={styles.left}>

          <div style={styles.companyCard}>

            <h2>
              {company.icon} {company.company}
            </h2>

            <p>
              👤 <b>{player}</b>
            </p>

            <p>
              💰 ${company.budget.toLocaleString()}
            </p>

            <small>
              {company.objective}
            </small>

          </div>

          <div style={styles.progressCard}>

            <h3>
              Desarrollo de Servicios
            </h3>

            {SERVICES.map(service=>(

              <div
                key={service.id}
                style={{marginBottom:15}}
              >

                <div
                  style={{
                    display:"flex",
                    justifyContent:"space-between",
                    marginBottom:5
                  }}
                >

                  <span>

                    {service.icon} {service.name}

                  </span>

                  <b>

                    {levels[service.id]}%

                  </b>

                </div>

                <div style={styles.bar}>

                  <div
                    style={{
                      ...styles.fill,
                      width:`${levels[service.id]}%`,
                      background:service.color
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* PANEL DERECHO */}

        <div style={styles.right}>

          <div style={styles.questionCard}>

            <div style={styles.topRow}>

              <span>

                Pregunta {questionIndex+1} / {company.questions.length}

              </span>

              <span>

                ⏱ {time}s

              </span>

            </div>

            <div style={styles.timerBar}>

              <div
                style={{
                  ...styles.timerFill,
                  width:`${time*5}%`
                }}
              />

            </div>

            <h2
              style={{
                marginTop:25,
                marginBottom:25
              }}
            >
              {question.question}
            </h2>

            {

              question.options.map((option,index)=>(

                <button

                  key={index}

                  disabled={showExplanation}

                  onClick={()=>answer(index)}

                  style={{

                    ...styles.option,

                    background:

                      showExplanation

                      ? index===question.correct

                        ? "#16a34a"

                        : index===selected

                        ? "#dc2626"

                        : "#1e293b"

                      : "#1e293b"

                  }}

                >

                  {option.text}

                </button>

              ))

            }

            {

              showExplanation &&

              <div style={styles.explanation}>

                <h3>

                  💡 Explicación

                </h3>

                <p>

                  {question.explanation}

                </p>

                <button

                  style={styles.start}

                  onClick={nextQuestion}

                >

                  SIGUIENTE

                </button>

              </div>

            }

            <div style={styles.score}>

              ⭐ Puntaje: {score}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
const styles = {

  background:{
    minHeight:"100vh",
    background:"linear-gradient(135deg,#020617,#081225,#0f172a,#111827)",
    padding:30,
    fontFamily:"Arial, sans-serif",
    color:"white"
  },

  container:{
    display:"grid",
    gridTemplateColumns:"360px 1fr",
    gap:25,
    maxWidth:1400,
    margin:"0 auto"
  },

  left:{
    display:"flex",
    flexDirection:"column",
    gap:20
  },

  right:{},

  card:{
    maxWidth:650,
    margin:"60px auto",
    background:"#111827",
    borderRadius:25,
    padding:40,
    textAlign:"center",
    boxShadow:"0 0 35px rgba(34,211,238,.20)"
  },

  title:{
    color:"#22d3ee",
    fontSize:42,
    marginBottom:15
  },

  subtitle:{
    color:"#cbd5e1",
    lineHeight:1.6,
    marginBottom:30
  },

  input:{
    width:"100%",
    padding:18,
    borderRadius:15,
    border:"1px solid #334155",
    background:"#020617",
    color:"white",
    fontSize:18,
    outline:"none",
    boxSizing:"border-box"
  },

  start:{
    width:"100%",
    marginTop:25,
    padding:18,
    border:"none",
    borderRadius:15,
    background:"linear-gradient(90deg,#06b6d4,#2563eb)",
    color:"white",
    cursor:"pointer",
    fontWeight:"bold",
    fontSize:18
  },

  companyCard:{
    background:"#111827",
    borderRadius:20,
    padding:20,
    boxShadow:"0 0 20px rgba(34,211,238,.12)"
  },

  progressCard:{
    background:"#111827",
    borderRadius:20,
    padding:20,
    boxShadow:"0 0 20px rgba(34,211,238,.12)"
  },

  questionCard:{
    background:"#111827",
    borderRadius:20,
    padding:30,
    boxShadow:"0 0 20px rgba(34,211,238,.12)"
  },

  topRow:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    color:"#22d3ee",
    fontWeight:"bold",
    fontSize:18
  },

  timerBar:{
    width:"100%",
    height:12,
    background:"#1e293b",
    borderRadius:20,
    overflow:"hidden",
    marginTop:15
  },

  timerFill:{
    height:"100%",
    background:"linear-gradient(90deg,#22d3ee,#3b82f6)",
    transition:"all 1s linear"
  },

  option:{
    width:"100%",
    padding:18,
    marginTop:15,
    borderRadius:15,
    border:"1px solid #334155",
    background:"#1e293b",
    color:"white",
    cursor:"pointer",
    fontSize:17,
    transition:"all .25s"
  },

  explanation:{
    marginTop:25,
    padding:20,
    borderRadius:15,
    background:"#0f172a",
    border:"1px solid #334155",
    color:"#e2e8f0"
  },

  score:{
    marginTop:25,
    textAlign:"center",
    fontSize:28,
    color:"#22d3ee",
    fontWeight:"bold"
  },

  bar:{
    width:"100%",
    height:12,
    background:"#1e293b",
    borderRadius:20,
    overflow:"hidden"
  },

  fill:{
    height:"100%",
    transition:"all .6s ease"
  }

};
