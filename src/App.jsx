import React, { useEffect, useState } from "react";

const categories = ["🇨🇴 Colombia", "🌎 Cultura General", "🎵 Música", "🔬 Ciencia"];

export default function App() {
  const [mode, setMode] = useState("");
  const [screen, setScreen] = useState("home");
  const [name, setName] = useState("");
  const [code, setCode] = useState("BYB25");
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});
  const [usedCats, setUsedCats] = useState([]);

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

  const joinPlayer = () => {
    if (!name) return;
    if (!players.includes(name)) {
      setPlayers([...players, name]);
      setScores({ ...scores, [name]: 0 });
    }
    setScreen("cats");
  };

  const simulateFinish = (cat) => {
    const pts = Math.floor(Math.random() * 300) + 100;
    setScores({ ...scores, [name]: (scores[name] || 0) + pts });
    setUsedCats([...usedCats, cat]);

    const remaining = categories.filter(c => !usedCats.includes(c) && c !== cat);

    if (remaining.length === 0) {
      setScreen("done");
    } else {
      setScreen("cats");
    }
  };

  const ranking = Object.entries(scores).sort((a,b)=>b[1]-a[1]);

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

        {screen === "home" && (
          <>
            <h1>🏆 Trivia BYB</h1>
            <button style={btn} onClick={()=>{setMode("player");setScreen("join");}}>🎮 Soy Jugador</button>
            <button style={btn} onClick={()=>{setMode("host");setScreen("host");}}>🧑‍💼 Soy Host</button>
          </>
        )}

        {screen === "join" && (
          <>
            <h2>Ingreso Jugador</h2>
            <input style={input} placeholder="Tu nombre" value={name} onChange={(e)=>setName(e.target.value)} />
            <input style={input} value={code} onChange={(e)=>setCode(e.target.value)} />
            <button style={btn} onClick={joinPlayer}>Entrar</button>
          </>
        )}

        {screen === "cats" && (
          <>
            <h2>Elige Categoría</h2>
            {categories.filter(c=>!usedCats.includes(c)).map((cat)=>(
              <button key={cat} style={btn} onClick={()=>simulateFinish(cat)}>
                {cat}
              </button>
            ))}
          </>
        )}

        {screen === "done" && (
          <>
            <h2>🏆 Juego Terminado</h2>
            <p>{name}</p>
            <p>{scores[name]} puntos</p>
          </>
        )}

        {screen === "host" && (
          <>
            <h2>🧑‍💼 Panel Host</h2>
            <p>Código Sala:</p>
            <h1>{code}</h1>
            <h3>Jugadores</h3>
            {players.length === 0 && <p>Sin jugadores aún</p>}
            {players.map((p)=><p key={p}>{p}</p>)}

            <hr style={{margin:"15px 0",opacity:.3}} />

            <h3>Ranking Final</h3>
            {ranking.length===0 && <p>Sin resultados</p>}
            {ranking.map((r,i)=>(
              <p key={r[0]}>
                {i+1}. {r[0]} - {r[1]} pts
              </p>
            ))}
          </>
        )}

      </div>
    </div>
  );
}
