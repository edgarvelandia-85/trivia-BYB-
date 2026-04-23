import React, { useEffect, useRef, useState } from "react";

const bank = {
  "🇨🇴 Colombia": [
    { q:"¿En qué año nació la Gran Colombia?", o:["1810","1819","1821","1830"], c:1 },
    { q:"¿Qué fruta aparece en el escudo de Colombia?", o:["Piña","Granada","Guanábana","Maracuyá"], c:1 },
    { q:"¿El mar que baña Cartagena es?", o:["Caribe","Atlántico","Golfo de México","Pacífico"], c:0 }
  ],
  "🌎 Cultura General": [
    { q:"¿Cuál es el país más grande del mundo?", o:["Canadá","China","Rusia","EEUU"], c:2 },
    { q:"¿Moneda oficial de Japón?", o:["Yuan","Won","Yen","Baht"], c:2 },
    { q:"¿Océano más grande?", o:["Atlántico","Índico","Pacífico","Ártico"], c:2 }
  ],
  "🎵 Música": [
    { q:"¿Quién es el Rey del Pop?", o:["Elvis","Michael Jackson","Prince","Bruno Mars"], c:1 },
    { q:"¿Qué banda lanzó Bohemian Rhapsody?", o:["Queen","ABBA","Beatles","U2"], c:0 },
    { q:"¿Quién canta Shape of You?", o:["Ed Sheeran","Bieber","Mendes","Adele"], c:0 }
  ],
  "🔬 Ciencia": [
    { q:"¿Planeta más grande?", o:["Saturno","Marte","Júpiter","Neptuno"], c:2 },
    { q:"¿Gas para respirar?", o:["Nitrógeno","Oxígeno","Helio","CO2"], c:1 },
    { q:"¿Símbolo del oro?", o:["Ag","Au","Ar","Go"], c:1 }
  ]
};

const categories = Object.keys(bank);

export default function App() {
  const [screen,setScreen]=useState("home");
  const [name,setName]=useState("");
  const [code,setCode]=useState("BYB25");
  const [players,setPlayers]=useState([]);
  const [scores,setScores]=useState({});
  const [usedCats,setUsedCats]=useState([]);
  const [cat,setCat]=useState("");
  const [idx,setIdx]=useState(0);
  const [time,setTime]=useState(10);

  const okRef = useRef(null);
  const badRef = useRef(null);

  useEffect(()=>{
    if(screen==="game" && time>0){
      const t=setTimeout(()=>setTime(time-1),1000);
      return ()=>clearTimeout(t);
    }
    if(screen==="game" && time===0) next();
  },[time,screen]);

  const box={background:"#ffffff10",padding:"30px",borderRadius:"20px",maxWidth:"500px",width:"100%",textAlign:"center"};
  const btn={padding:"14px",width:"100%",margin:"8px 0",border:"none",borderRadius:"12px",background:"#00c896",color:"#fff",fontWeight:"bold",cursor:"pointer"};
  const input={padding:"14px",width:"100%",margin:"8px 0",borderRadius:"12px",border:"none"};

  const join=()=>{
    if(!players.includes(name)){
      const newPlayers=[...players,name];
      const newScores={...scores,[name]:0};
      setPlayers(newPlayers);
      setScores(newScores);
      localStorage.setItem("triviaPlayers", JSON.stringify(newPlayers));
      localStorage.setItem("triviaScores", JSON.stringify(newScores));
    }
    setScreen("cats");
  };

  const startCat=(c)=>{
    setCat(c);
    setIdx(0);
    setTime(10);
    setScreen("game");
  };

  const next=()=>{
    if(idx<2){
      setIdx(idx+1);
      setTime(10);
    }else{
      const newUsed=[...usedCats,cat];
      setUsedCats(newUsed);

      localStorage.setItem("triviaScores", JSON.stringify(scores));

      if(newUsed.length===categories.length){
        setScreen("done");
      }else{
        setScreen("cats");
      }
    }
  };

  const answer=(i)=>{
    if(i===bank[cat][idx].c){
      okRef.current.play();
      const ns={...scores,[name]:scores[name]+time*10};
      setScores(ns);
      localStorage.setItem("triviaScores", JSON.stringify(ns));
    }else{
      badRef.current.play();
    }
    next();
  };

  const hostScores = JSON.parse(localStorage.getItem("triviaScores") || "{}");
  const ranking = Object.entries(hostScores).sort((a,b)=>b[1]-a[1]);

  return (
  <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#111,#222)",display:"flex",justifyContent:"center",alignItems:"center",color:"#fff",fontFamily:"Arial",padding:"20px"}}>
   <div style={box}>

   <audio ref={okRef} src="https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3" />
   <audio ref={badRef} src="https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3" />

   {screen==="home" && <>
    <h1>🏆 Trivia BYB</h1>
    <button style={btn} onClick={()=>setScreen("join")}>🎮 Soy Jugador</button>
    <button style={btn} onClick={()=>setScreen("host")}>🧑‍💼 Soy Host</button>
   </>}

   {screen==="join" && <>
    <h2>Ingreso Jugador</h2>
    <input style={input} placeholder="Tu nombre" value={name} onChange={e=>setName(e.target.value)} />
    <input style={input} value={code} onChange={e=>setCode(e.target.value)} />
    <button style={btn} onClick={join}>Entrar</button>
   </>}

   {screen==="cats" && <>
    <h2>Elige Categoría</h2>
    {categories.filter(c=>!usedCats.includes(c)).map(c=>(
      <button key={c} style={btn} onClick={()=>startCat(c)}>{c}</button>
    ))}
   </>}

   {screen==="game" && <>
    <h2>⏱ {time}s</h2>
    <h3>{bank[cat][idx].q}</h3>
    {bank[cat][idx].o.map((x,i)=>(
      <button key={i} style={btn} onClick={()=>answer(i)}>{x}</button>
    ))}
   </>}

   {screen==="done" && <>
    <h2>🏆 Juego Terminado</h2>
    <p>{name}</p>
    <p>{scores[name]} puntos</p>
   </>}

   {screen==="host" && <>
    <h2>🧑‍💼 Resultados Finales</h2>
    <h1>{code}</h1>
    {ranking.length===0 && <p>Sin resultados aún</p>}
    {ranking.map((r,i)=>(
      <p key={r[0]}>{i+1}. {r[0]} - {r[1]} pts</p>
    ))}
   </>}

   </div>
  </div>
  );
}
