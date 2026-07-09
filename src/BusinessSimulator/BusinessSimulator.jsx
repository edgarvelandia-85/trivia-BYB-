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

  const [feedback, setFeedback] = useState(null);

  const [levels, setLevels] = useState({
    branding:0,
    manual:0,
    marketing:0,
    commercial:0,
    social:0,
    website:0,
    templates:0,
    formulas:0
  });

  const question = company.questions[questionIndex];

  useEffect(()=>{

    if(!started || finished) return;

    if(feedback) return;

    if(time===0){

      handleNext();

      return;

    }

    const timer=setTimeout(()=>{

      setTime(t=>t-1);

    },1000);

    return ()=>clearTimeout(timer);

  },[time,started,finished,feedback]);

  function handleAnswer(index){

    const correct=index===question.correct;

    if(correct){

      setScore(s=>s+question.score);

      setLevels(prev=>{

        const copy={...prev};

        Object.keys(question.impact).forEach(key=>{

          copy[key]+=question.impact[key];

          if(copy[key]>100) copy[key]=100;

        });

        return copy;

      });

    }

    setFeedback({

      correct,

      explanation:question.explanation

    });

  }

  function handleNext(){

    setFeedback(null);

    if(questionIndex===company.questions.length-1){

      setFinished(true);

      return;

    }

    setQuestionIndex(q=>q+1);

    setTime(20);

  }

  function restart(){

    window.location.reload();

  }

  function level(){

    if(score>=90) return "🏆 Consultor Elite";

    if(score>=70) return "🥇 Consultor Senior";

    if(score>=50) return "🥈 Consultor Intermedio";

    return "🥉 Consultor Junior";

  }

  if (!started) {

    return (

      <div style={styles.background}>

        <div style={styles.card}>

          <h1 style={styles.title}>
            🚀 BYB BUSINESS SIMULATOR
          </h1>

          <p style={styles.subtitle}>
            Toma decisiones estratégicas para hacer crecer una empresa utilizando los servicios de Be Your Brand.
          </p>

          <input
            placeholder="Nombre del participante"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            style={styles.input}
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

  if (finished) {

    const bestService = SERVICES.reduce((a, b) =>
      levels[a.id] > levels[b.id] ? a : b
    );

    return (

      <div style={styles.background}>

        <div style={styles.resultCard}>

          <h1 style={styles.resultTitle}>
            🏆 SIMULACIÓN FINALIZADA
          </h1>

          <h2>{player}</h2>

          <h1 style={{ color: "#22d3ee" }}>
            {score} puntos
          </h1>

          <h2>{level()}</h2>

          <hr style={{ margin: "30px 0", opacity: .2 }} />

          <h2>Servicio más desarrollado</h2>

          <h1>

            {bestService.icon} {bestService.name}

          </h1>

          <div style={{ marginTop: 40 }}>

            {

              SERVICES.map(service => (

                <div
                  key={service.id}
                  style={{ marginBottom: 18 }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6
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
                        width: `${levels[service.id]}%`,
                        background: service.color
                      }}

                    />

                  </div>

                </div>

              ))

            }

          </div>

          <button

            style={styles.start}

            onClick={restart}

          >

            🔄 JUGAR OTRA VEZ

          </button>

        </div>

      </div>

    );

  }

  return (

    <div style={styles.background}>

      <div style={styles.container}>

        <div style={styles.left}>

          <div style={styles.companyCard}>

            <h2>

              {company.icon} {company.company}

            </h2>

            <p>

              👤 {player}

            </p>

            <p>

              💰 Presupuesto

            </p>

            <h3>

              ${company.budget.toLocaleString()}

            </h3>

            <p>

              🎯 Objetivo

            </p>

            <small>

              {company.objective}

            </small>

          </div>

          <div style={styles.progressCard}>

            <h3>📊 Desarrollo de Servicios</h3>

            {

              SERVICES.map(service => (

                <div
                  key={service.id}
                  style={{ marginBottom:18 }}
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

              ))

            }

          </div>

        </div>

        <div style={styles.right}>

          <div style={styles.questionCard}>

            <div style={styles.topRow}>

              <span>

                Pregunta {questionIndex+1} de {company.questions.length}

              </span>

              <span>

                ⏱ {time}s

              </span>

            </div>

            {/* Barra de tiempo */}

            <div
              style={{
                width:"100%",
                height:12,
                background:"#1e293b",
                borderRadius:20,
                overflow:"hidden",
                marginBottom:25
              }}
            >

              <div

                style={{

                  height:"100%",

                  width:`${time*5}%`,

                  transition:"1s",

                  background:

                    time>10

                    ? "#22d3ee"

                    : time>5

                    ? "#f59e0b"

                    : "#ef4444"

                }}

              />

            </div>

            <h2
              style={{
                lineHeight:1.5,
                marginBottom:30
              }}
            >

              {question.question}

            </h2>

            {

              !feedback &&

              question.options.map((option,index)=>(

                <button

                  key={index}

                  style={styles.option}

                  onClick={()=>handleAnswer(index)}

                >

                  {option}

                </button>

              ))

            }

            {

              feedback && (

                <div
                  style={{

                    marginTop:25,

                    padding:20,

                    borderRadius:20,

                    background:

                      feedback.correct

                      ? "#052e16"

                      : "#450a0a"

                  }}
                >

                  <h2>

                    {

                      feedback.correct

                      ? "✅ ¡Correcto!"

                      : "❌ Respuesta incorrecta"

                    }

                  </h2>

                  <p
                    style={{
                      lineHeight:1.7,
                      marginTop:15
                    }}
                  >

                    {feedback.explanation}

                  </p>

                  <button

                    style={{

                      ...styles.start,

                      marginTop:30

                    }}

                    onClick={handleNext}

                  >

                    Siguiente →

                  </button>

                </div>

              )

            }

            <div style={styles.score}>

              Puntaje: {score}

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
    gridTemplateColumns:"350px 1fr",
    gap:25
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
    padding:45,
    textAlign:"center",
    boxShadow:"0 0 35px rgba(34,211,238,.15)"
  },

  title:{
    color:"#22d3ee",
    fontSize:42,
    marginBottom:15
  },

  subtitle:{
    color:"#94a3b8",
    lineHeight:1.7,
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
    outline:"none"
  },

  start:{
    width:"100%",
    marginTop:25,
    padding:18,
    border:"none",
    borderRadius:15,
    cursor:"pointer",
    fontSize:18,
    fontWeight:"bold",
    color:"white",
    background:"linear-gradient(90deg,#06b6d4,#2563eb)"
  },

  companyCard:{
    background:"#111827",
    borderRadius:20,
    padding:25,
    boxShadow:"0 0 20px rgba(34,211,238,.10)"
  },

  progressCard:{
    background:"#111827",
    borderRadius:20,
    padding:25,
    boxShadow:"0 0 20px rgba(34,211,238,.10)"
  },

  questionCard:{
    background:"#111827",
    borderRadius:20,
    padding:35,
    boxShadow:"0 0 25px rgba(34,211,238,.10)"
  },

  topRow:{
    display:"flex",
    justifyContent:"space-between",
    color:"#22d3ee",
    fontWeight:"bold",
    marginBottom:15
  },

  option:{
    width:"100%",
    padding:18,
    marginTop:15,
    borderRadius:15,
    border:"1px solid #334155",
    background:"#1e293b",
    color:"white",
    fontSize:17,
    cursor:"pointer",
    transition:"all .25s ease"
  },

  bar:{
    width:"100%",
    height:12,
    background:"#1e293b",
    borderRadius:20,
    overflow:"hidden",
    marginTop:6
  },

  fill:{
    height:"100%",
    transition:"width .5s ease"
  },

  score:{
    marginTop:30,
    fontSize:28,
    fontWeight:"bold",
    color:"#22d3ee",
    textAlign:"center"
  },

  resultCard:{
    maxWidth:800,
    margin:"40px auto",
    background:"#111827",
    borderRadius:25,
    padding:45,
    boxShadow:"0 0 35px rgba(34,211,238,.15)"
  },

  resultTitle:{
    textAlign:"center",
    color:"#22d3ee",
    fontSize:40,
    marginBottom:25
  }

};

export default BusinessSimulator;
