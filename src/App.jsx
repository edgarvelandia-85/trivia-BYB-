import React, { useEffect, useState } from "react";

const bank = {
  colombia: [
    { q: "¿En qué año nació la Gran Colombia?", o: ["1810", "1819", "1821", "1830"], c: 1 },
    { q: "¿Qué fruta aparece en el escudo de Colombia?", o: ["Piña", "Granada", "Guanábana", "Maracuyá"], c: 1 },
    { q: "¿El mar que baña Cartagena es?", o: ["Caribe", "Atlántico", "Golfo de México", "Pacífico"], c: 0 }
  ],
  cultura: [
    { q: "¿Cuál es el país más grande del mundo?", o: ["Canadá", "China", "Rusia", "Estados Unidos"], c: 2 },
    { q: "¿Cuál es la moneda oficial de Japón?", o: ["Yuan", "Won", "Yen", "Baht"], c: 2 },
    { q: "¿Cuál es el océano más grande?", o: ["Atlántico", "Índico", "Pacífico", "Ártico"], c: 2 }
  ],
  musica: [
    { q: "¿Quién es el Rey del Pop?", o: ["Elvis Presley", "Michael Jackson", "Prince", "Bruno Mars"], c: 1 },
    { q: "¿Qué banda lanzó Bohemian Rhapsody?", o: ["Queen", "ABBA", "Aerosmith", "The Beatles"], c: 0 },
    { q: "¿Quién canta Shape of You?", o: ["Ed Sheeran", "Shawn Mendes", "Justin Bieber", "Sam Smith"], c: 0 }
  ],
  ciencia: [
    { q: "¿Cuál es el planeta más grande del sistema solar?", o: ["Saturno", "Marte", "Júpiter", "Neptuno"], c: 2 },
    { q: "¿Qué gas usamos principalmente para respirar?", o: ["Nitrógeno", "Oxígeno", "Helio", "Dióxido de carbono"], c: 1 },
    { q: "¿Cuál es el símbolo químico del oro?", o: ["Ag", "Au", "Ar", "O"], c: 1 }
  ]
};

export default function App() {
  const [screen, setScreen] = useState("join");
  const [name, setName] = useState("");
  const [code, setCode] = useState("BYB25");
  const [cat, setCat] = useState("");
  const [idx, setIdx] = useState(0);
  const [time, setTime] = useState(10);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (screen === "game" && time > 0) {
      const t = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(t);
    }
    if (time === 0 && screen === "game") next();
  }, [time, screen]);

  const startCat = (c) => {
    setCat(c);
    setIdx(0);
    setScore(0);
    setTime(10);
    setScreen("game");
  };

  const next = () => {
    if (idx < 2) {
      setIdx(idx + 1);
      setTime(10);
    } else {
      setScreen("end");
    }
  };

  const ans = (i) => {
    if (i === bank[cat][idx].c) setScore(score + time * 10);
    next();
  };

  const box = {
    background:"#ffffff10",
    padding:"30px",
    borderRadius:"20px",
    maxWidth:"500px",
    width:"100%",
    textAlign:"center"
  };

  const btn = {
    padding:"14px",
    width:"100%",
    margin:"8px 0",
    border:"none",
    borderRadius:"12px",
    background:"#00c896",
    color:"#fff",
    fontWeight:"bold",
    cursor:"pointer"
  };

  const input = {
    padding:"14px",
    width:"100%",
    margin:"8px 0",
    borderRadius:"12px",
    border:"none"
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#111,#222)",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      color:"#fff",
      fontFamily:"Arial",
      padding:"20px"
    }}>
      <div style={box}>

        {screen === "join" && (
          <>
            <h1>🏆 Trivia BYB</h1>
            <input style={input} placeholder="Tu nombre" value={name} onChange={(e)=>setName(e.target.value)} />
            <input style={input} value={code} onChange={(e)=>setCode(e.target.value)} />
            <button style={btn} onClick={()=>setScreen("cats")}>Entrar</button>
          </>
        )}

        {screen === "cats" && (
          <>
            <h2>Elige Categoría</h2>
            <button style={btn} onClick={()=>startCat("colombia")}>🇨🇴 Colombia</button>
            <button style={btn} onClick={()=>startCat("cultura")}>🌎 Cultura General</button>
            <button style={btn} onClick={()=>startCat("musica")}>🎵 Música</button>
            <button style={btn} onClick={()=>startCat("ciencia")}>🔬 Ciencia</button>
          </>
        )}

        {screen === "game" && (
          <>
            <h2>⏱ {time}s</h2>
            <h3>{bank[cat][idx].q}</h3>
            {bank[cat][idx].o.map((x,i)=>(
              <button key={i} style={btn} onClick={()=>ans(i)}>{x}</button>
            ))}
          </>
        )}

        {screen === "end" && (
          <>
            <h1>🏆 Final</h1>
            <h2>{name}</h2>
            <h3>{score} puntos</h3>
            <button style={btn} onClick={()=>setScreen("cats")}>Jugar otra categoría</button>
          </>
        )}

      </div>
    </div>
  );
}
