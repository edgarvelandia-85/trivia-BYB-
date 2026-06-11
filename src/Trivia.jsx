import React, { useEffect, useRef, useState } from "react";

const bank = {
  "💡 Marca Personal": [
    {
      q: "¿Qué es una marca personal?",
      o: [
        "Un logo",
        "La percepción que otros tienen de ti",
        "Una empresa",
        "Una red social"
      ],
      c: 1
    },
    {
      q: "¿Cuál es el objetivo principal de una marca personal sólida?",
      o: [
        "Tener más seguidores",
        "Generar confianza y diferenciación",
        "Publicar más contenido",
        "Tener una página web"
      ],
      c: 1
    },
    {
      q: "¿Qué elemento ayuda a fortalecer una marca personal?",
      o: [
        "Inconsistencia",
        "Improvisación",
        "Propuesta de valor clara",
        "Copiar a otros"
      ],
      c: 2
    },
    {
      q: "¿Qué significa autenticidad en marca personal?",
      o: [
        "Mostrar una imagen falsa",
        "Ser coherente con quién eres y lo que comunicas",
        "Hablar solo de logros",
        "Evitar opiniones"
      ],
      c: 1
    },
    {
      q: "¿Qué herramienta ayuda a aumentar la visibilidad profesional?",
      o: [
        "Networking",
        "Aislamiento",
        "Improvisación",
        "Competencia interna"
      ],
      c: 0
    }
  ],

  "🚀 Emprendimiento": [
    {
      q: "¿Qué caracteriza a un emprendedor?",
      o: [
        "Evitar riesgos",
        "Crear soluciones y oportunidades",
        "Esperar instrucciones",
        "No innovar"
      ],
      c: 1
    },
    {
      q: "¿Qué es una propuesta de valor?",
      o: [
        "Un descuento",
        "Lo que hace única una solución",
        "Un presupuesto",
        "Un logo"
      ],
      c: 1
    },
    {
      q: "¿Cuál es una habilidad clave para emprender?",
      o: [
        "Adaptabilidad",
        "Rigidez",
        "Conformismo",
        "Dependencia"
      ],
      c: 0
    },
    {
      q: "¿Qué significa validar una idea de negocio?",
      o: [
        "Diseñar el logo",
        "Comprobar que existe una necesidad real",
        "Crear redes sociales",
        "Contratar personal"
      ],
      c: 1
    },
    {
      q: "¿Qué suele impulsar el crecimiento de un emprendimiento?",
      o: [
        "Escuchar al cliente",
        "Ignorar comentarios",
        "No medir resultados",
        "Copiar competidores"
      ],
      c: 0
    }
  ],

  "🤝 Networking": [
    {
      q: "¿Qué es networking?",
      o: [
        "Vender productos",
        "Construir relaciones profesionales de valor",
        "Crear publicidad",
        "Diseñar una marca"
      ],
      c: 1
    },
    {
      q: "¿Cuál es el principal beneficio del networking?",
      o: [
        "Más tareas",
        "Nuevas oportunidades y conexiones",
        "Más reuniones",
        "Más correos"
      ],
      c: 1
    },
    {
      q: "¿Qué actitud favorece el networking?",
      o: [
        "Escuchar activamente",
        "Hablar todo el tiempo",
        "Interrumpir",
        "Competir"
      ],
      c: 0
    },
    {
      q: "¿Dónde puede realizarse networking?",
      o: [
        "Solo en eventos",
        "Solo en LinkedIn",
        "En cualquier espacio de interacción profesional",
        "Solo en oficinas"
      ],
      c: 2
    },
    {
      q: "¿Qué fortalece una red de contactos?",
      o: [
        "La confianza",
        "El ego",
        "La presión",
        "El control"
      ],
      c: 0
    }
  ],

  "🎯 Marketing": [
    {
      q: "¿Qué busca el marketing?",
      o: [
        "Conectar productos o servicios con necesidades del cliente",
        "Crear documentos",
        "Diseñar edificios",
        "Gestionar nómina"
      ],
      c: 0
    },
    {
      q: "¿Qué es un público objetivo?",
      o: [
        "Todos los clientes",
        "El grupo específico al que va dirigida una estrategia",
        "Los empleados",
        "Los proveedores"
      ],
      c: 1
    },
    {
      q: "¿Qué significa posicionamiento de marca?",
      o: [
        "El lugar que ocupa una marca en la mente del consumidor",
        "Su dirección física",
        "Su tamaño",
        "Su número de empleados"
      ],
      c: 0
    },
    {
      q: "¿Qué indicador mide interacción en redes sociales?",
      o: [
        "Engagement",
        "Inventario",
        "Facturación",
        "Nómina"
      ],
      c: 0
    },
    {
      q: "¿Qué ayuda a generar confianza en una marca?",
      o: [
        "Coherencia en la comunicación",
        "Cambiar de mensaje constantemente",
        "Ocultar información",
        "Publicar poco"
      ],
      c: 0
    }
  ],

  "🏆 Liderazgo": [
    {
      q: "¿Qué caracteriza a un buen líder?",
      o: [
        "Inspirar y movilizar personas",
        "Dar órdenes constantemente",
        "Evitar escuchar",
        "Trabajar solo"
      ],
      c: 0
    },
    {
      q: "¿Qué habilidad es fundamental para liderar equipos?",
      o: [
        "Comunicación efectiva",
        "Imposición",
        "Autoritarismo",
        "Competencia interna"
      ],
      c: 0
    },
    {
      q: "¿Qué fomenta un líder efectivo?",
      o: [
        "Colaboración",
        "Conflictos",
        "Desmotivación",
        "Aislamiento"
      ],
      c: 0
    },
    {
      q: "¿Qué es la inteligencia emocional?",
      o: [
        "Comprender y gestionar emociones propias y ajenas",
        "Hablar mucho",
        "Tomar decisiones rápidas",
        "Evitar conversaciones"
      ],
      c: 0
    },
    {
      q: "¿Cuál es una característica del liderazgo moderno?",
      o: [
        "Adaptabilidad",
        "Rigidez",
        "Centralización extrema",
        "Resistencia al cambio"
      ],
      c: 0
    }
  ],

  "✨ Be Your Brand": [
    {
      q: "¿Cuál es el propósito principal de Be Your Brand?",
      o: [
        "Impulsar el crecimiento de personas y organizaciones mediante marca y liderazgo",
        "Vender tecnología",
        "Gestionar eventos deportivos",
        "Crear aplicaciones"
      ],
      c: 0
    },
    {
      q: "¿Cuál de estos servicios hace parte de BYB?",
      o: [
        "Diseño de Marca",
        "Manual de Marca",
        "Marketing en Salud",
        "Todos los anteriores"
      ],
      c: 3
    },
    {
      q: "¿Qué busca fortalecer BYB en los equipos?",
      o: [
        "Liderazgo y habilidades humanas",
        "Competencia interna",
        "Individualismo",
        "Dependencia"
      ],
      c: 0
    },
    {
      q: "¿Qué representa una marca bien construida?",
      o: [
        "Claridad, confianza y posicionamiento",
        "Más reuniones",
        "Más documentos",
        "Más gastos"
      ],
      c: 0
    },
    {
      q: "¿Qué servicio ayuda a mantener la coherencia visual de una marca?",
      o: [
        "Manual de Marca",
        "Nómina",
        "Inventario",
        "Contabilidad"
      ],
      c: 0
    }
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
  if(idx < bank[cat].length - 1){

    setIdx(idx + 1);
    setTime(10);

  }else{

    const newUsed = [...usedCats, cat];
    setUsedCats(newUsed);

    localStorage.setItem(
      "triviaScores",
      JSON.stringify(scores)
    );

    if(newUsed.length === categories.length){

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
