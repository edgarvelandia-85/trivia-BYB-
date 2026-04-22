import React, { useState } from "react";

export default function App() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  return (
    <div style={{
      fontFamily:"Arial",
      minHeight:"100vh",
      background:"linear-gradient(135deg,#111,#222)",
      color:"#fff",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding:"20px"
    }}>
      <div style={{
        background:"#ffffff10",
        padding:"30px",
        borderRadius:"20px",
        width:"100%",
        maxWidth:"500px",
        textAlign:"center"
      }}>
        <h1>🏆 Trivia BYB PRO</h1>

        {!role && (
          <>
            <button onClick={() => setRole("host")} style={btn}>Crear Sala</button>
            <button onClick={() => setRole("player")} style={btn}>Unirse</button>
          </>
        )}

        {role === "host" && (
          <>
            <h2>🎮 Host</h2>
            <p>Comparte el código: <b>BYB25</b></p>
            <button style={btn}>Iniciar Juego</button>
          </>
        )}

        {role === "player" && (
          <>
            <h2>📱 Jugador</h2>
            <input
              placeholder="Tu nombre"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              style={input}
            />
            <button style={btn}>Entrar</button>
          </>
        )}
      </div>
    </div>
  );
}

const btn = {
  padding:"12px",
  margin:"10px",
  width:"100%",
  border:"none",
  borderRadius:"10px",
  background:"#00c896",
  color:"#fff",
  fontWeight:"bold",
  cursor:"pointer"
};

const input = {
  padding:"12px",
  width:"100%",
  borderRadius:"10px",
  border:"none",
  marginBottom:"10px"
};
