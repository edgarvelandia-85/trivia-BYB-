import React, { useMemo, useState, useEffect } from "react";
import { COMPANIES, SERVICES } from "./data";

export default function BusinessSimulator() {

  const company = useMemo(() => {
    return COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
  }, []);

  const [player, setPlayer] = useState("");
  const [started, setStarted] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [score, setScore] = useState(0);

  const [time, setTime] = useState(20);

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

  useEffect(() => {

    if (!started) return;

    if (time === 0) {

      nextQuestion();

      return;

    }

    const timer = setTimeout(() => {

      setTime(time - 1);

    },1000);

    return ()=>clearTimeout(timer);

  },[time,started]);

  function nextQuestion(){

      if(questionIndex < company.questions.length-1){

          setQuestionIndex(questionIndex+1);

          setTime(20);

      }else{

          alert("Simulación terminada");

      }

  }

  function answer(index){

      if(index===question.correct){

          setScore(score+question.score);

          const copy={...levels};

          Object.keys(question.impact).forEach(key=>{

              copy[key]+=question.impact[key];

          });

          setLevels(copy);

      }

      nextQuestion();

  }

  if(!started){

      return(

      <div style={styles.background}>

          <div style={styles.card}>

              <h1 style={styles.title}>

                  🚀 BYB BUSINESS SIMULATOR

              </h1>

              <p style={styles.subtitle}>

                  Construye la estrategia perfecta utilizando los servicios de Be Your Brand.

              </p>

              <input

                  placeholder="Nombre del participante"

                  value={player}

                  onChange={(e)=>setPlayer(e.target.value)}

                  style={styles.input}

              />

              <button

                  style={styles.start}

                  onClick={()=>{

                      if(player.trim()===""){

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

  return(

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

                  <h3>

                      Desarrollo de Servicios

                  </h3>

                  {

                      SERVICES.map(service=>(

                      <div key={service.id} style={{marginBottom:15}}>

                          <div style={{display:"flex",justifyContent:"space-between"}}>

                              <span>

                                  {service.icon} {service.name}

                              </span>

                              <span>

                                  {levels[service.id]}%

                              </span>

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

                          Pregunta {questionIndex+1} / {company.questions.length}

                      </span>

                      <span>

                          ⏱ {time}s

                      </span>

                  </div>

                  <h2>

                      {question.question}

                  </h2>

                  {

                      question.options.map((option,index)=>(

                      <button

                          key={index}

                          onClick={()=>answer(index)}

                          style={styles.option}

                      >

                          {option}

                      </button>

                      ))

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

const styles={

background:{

minHeight:"100vh",

background:"linear-gradient(135deg,#020617,#081225,#0f172a,#111827)",

padding:30,

fontFamily:"Arial",

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

maxWidth:600,

margin:"70px auto",

padding:40,

background:"#111827",

borderRadius:25,

boxShadow:"0 0 35px rgba(0,255,255,.15)",

textAlign:"center"

},

title:{

color:"#22d3ee",

fontSize:40

},

subtitle:{

color:"#94a3b8",

marginBottom:30

},

input:{

width:"100%",

padding:18,

borderRadius:15,

border:"1px solid #334155",

background:"#020617",

color:"white",

fontSize:18

},

start:{

marginTop:30,

width:"100%",

padding:18,

fontSize:20,

borderRadius:15,

border:"none",

cursor:"pointer",

background:"linear-gradient(90deg,#06b6d4,#2563eb)",

color:"white",

fontWeight:"bold"

},

companyCard:{

background:"#111827",

padding:20,

borderRadius:20,

boxShadow:"0 0 20px rgba(0,255,255,.1)"

},

progressCard:{

background:"#111827",

padding:20,

borderRadius:20,

boxShadow:"0 0 20px rgba(0,255,255,.1)"

},

questionCard:{

background:"#111827",

padding:30,

borderRadius:20,

boxShadow:"0 0 20px rgba(0,255,255,.1)"

},

topRow:{

display:"flex",

justifyContent:"space-between",

marginBottom:25,

color:"#22d3ee"

},

option:{

width:"100%",

padding:18,

marginTop:15,

background:"#1e293b",

border:"1px solid #334155",

color:"white",

borderRadius:15,

fontSize:17,

cursor:"pointer"

},

bar:{

width:"100%",

height:12,

background:"#1e293b",

borderRadius:20,

overflow:"hidden",

marginTop:5

},

fill:{

height:"100%",

transition:"all .5s"

},

score:{

marginTop:25,

fontSize:26,

color:"#22d3ee",

fontWeight:"bold"

}

};
