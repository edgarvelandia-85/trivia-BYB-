import React, { useEffect, useMemo, useState } from 'react';

const categories = {
  Cultura:[
    {q:'La Gran Muralla China es visible desde el espacio a simple vista.',a:false},
    {q:'Shakespeare escribió Hamlet.',a:true},
    {q:'Australia es a la vez país y continente.',a:true},
  ],
  Diseño:[
    {q:'El formato SVG pierde calidad al ampliar.',a:false},
    {q:'PNG siempre pesa menos que JPG.',a:false},
    {q:'CMYK se usa principalmente para impresión.',a:true},
  ],
  Marketing:[
    {q:'El email marketing sigue siendo útil.',a:true},
    {q:'Más seguidores siempre significan más ventas.',a:false},
    {q:'Una CTA ayuda a convertir.',a:true},
  ],
  Tecnología:[
    {q:'La nube significa que tus archivos están en internet.',a:true},
    {q:'Reiniciar nunca soluciona problemas.',a:false},
    {q:'El modo incógnito te vuelve invisible.',a:false},
  ],
  General:[
    {q:'El lirio de mayo es la flor nacional de Colombia.',a:true},
    {q:'Los murciélagos son ciegos.',a:false},
    {q:'El agua hierve a 100°C al nivel del mar.',a:true},
  ]
};

const defaultPlayers = ['Jugador 1','Jugador 2','Jugador 3'];

export default function App() {
  const [players,setPlayers] = useState(
    () => JSON.parse(localStorage.getItem('mv_players') || 'null') || defaultPlayers
  );

  const [scores,setScores] = useState(
    () => JSON.parse(localStorage.getItem('mv_scores') || '{}')
  );

  const [screen,setScreen] = useState('home');
  const [active,setActive] = useState(null);
  const [cat,setCat] = useState('Diseño');
  const [index,setIndex] = useState(0);
  const [pts,setPts] = useState(0);
  const [done,setDone] = useState(false);
  const [timeLeft,setTimeLeft] = useState(10);

  useEffect(() => {
    localStorage.setItem('mv_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('mv_scores', JSON.stringify(scores));
  }, [scores]);

  const ranking = useMemo(() => {
    return players
      .map(p => ({ name:p, score:scores[p] || 0 }))
      .sort((a,b) => b.score - a.score);
  }, [players,scores]);

  const questions = categories[cat];
  const current = questions[index];

  useEffect(() => {
    if(screen !== 'game') return;

    if(timeLeft <= 0){
      if(index < questions.length - 1){
        setIndex(i => i + 1);
        setTimeLeft(10);
      } else {
        setDone(true);
        setScores({
          ...scores,
          [active]: (scores[active] || 0) + pts
        });
        setScreen('result');
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(v => v - 1);
    },1000);

    return () => clearTimeout(timer);

  }, [screen,timeLeft,index]);

  function updatePlayer(i,val){
    const arr = [...players];
    arr[i] = val;
    setPlayers(arr);
  }

  function start(name){
    setActive(name);
    setCat('Diseño');
    setIndex(0);
    setPts(0);
    setDone(false);
    setTimeLeft(10);
    setScreen('category');
  }

  function choose(ans){
    if(done) return;

    let newPts = pts;

    if(ans === current.a){
      newPts = pts + 10;
      setPts(newPts);
    }

    if(index < questions.length - 1){
      setIndex(i => i + 1);
      setTimeLeft(10);
    } else {
      setDone(true);
      setScores({
        ...scores,
        [active]: (scores[active] || 0) + newPts
      });
      setScreen('result');
    }
  }

  const card = {
    background:'white',
    borderRadius:'20px',
    padding:'30px',
    boxShadow:'0 10px 25px rgba(0,0,0,.08)'
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'#f1f5f9',
      padding:'30px',
      fontFamily:'Arial'
    }}>
      <div style={{
        maxWidth:'900px',
        margin:'0 auto'
      }}>
        <h1 style={{
          textAlign:'center',
          fontSize:'42px'
        }}>
          Mito o Verdad
        </h1>

        {screen === 'home' && (
          <div style={card}>
            <h2>Jugadores registrados</h2>

            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',
              gap:'15px'
            }}>
              {players.map((p,i) => (
                <div key={i} style={{
                  border:'1px solid #ddd',
                  padding:'15px',
                  borderRadius:'15px'
                }}>
                  <input
                    value={p}
                    onChange={e => updatePlayer(i,e.target.value)}
                    style={{
                      width:'100%',
                      padding:'10px',
                      marginBottom:'10px'
                    }}
                  />

                  <button
                    onClick={() => start(p)}
                    style={{
                      width:'100%',
                      padding:'12px',
                      background:'#2563eb',
                      color:'white',
                      border:'none',
                      borderRadius:'10px'
                    }}
                  >
                    Jugar
                  </button>
                </div>
              ))}
            </div>

            <h3 style={{marginTop:'30px'}}>Ranking</h3>

            {ranking.map((r,i) => (
              <div key={r.name} style={{
                display:'flex',
                justifyContent:'space-between',
                padding:'8px 0',
                borderBottom:'1px solid #eee'
              }}>
                <span>{i+1}. {r.name}</span>
                <span>{r.score} pts</span>
              </div>
            ))}
          </div>
        )}

        {screen === 'category' && (
          <div style={card}>
            <h2>Hola {active}</h2>

            <select
              value={cat}
              onChange={e => setCat(e.target.value)}
              style={{
                width:'100%',
                padding:'12px',
                marginBottom:'20px'
              }}
            >
              {Object.keys(categories).map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <p><strong>Categorías disponibles:</strong></p>

            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(2,1fr)',
              gap:'10px',
              marginBottom:'20px'
            }}>
              {Object.keys(categories).map(c => (
                <div key={c} style={{
                  background:'#e2e8f0',
                  padding:'10px',
                  borderRadius:'10px'
                }}>
                  {c}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setTimeLeft(10);
                setScreen('game');
              }}
              style={{
                width:'100%',
                padding:'14px',
                background:'#16a34a',
                color:'white',
                border:'none',
                borderRadius:'12px'
              }}
            >
              Empezar partida
            </button>
          </div>
        )}

        {screen === 'game' && (
          <div style={card}>
            <div style={{
              display:'flex',
              justifyContent:'space-between',
              marginBottom:'20px'
            }}>
              <span>{active}</span>
              <span>{cat}</span>
              <span>{pts} pts</span>
            </div>

            <h2 style={{
              textAlign:'center',
              fontSize:'34px',
              marginBottom:'20px'
            }}>
              ⏱ {timeLeft}s
            </h2>

            <p style={{
              fontSize:'28px',
              fontWeight:'bold',
              marginBottom:'25px'
            }}>
              {current.q}
            </p>

            <div style={{
              display:'grid',
              gridTemplateColumns:'1fr 1fr',
              gap:'15px'
            }}>
              <button
                onClick={() => choose(true)}
                style={{
                  padding:'18px',
                  background:'#059669',
                  color:'white',
                  border:'none',
                  borderRadius:'15px',
                  fontSize:'18px'
                }}
              >
                Verdad
              </button>

              <button
                onClick={() => choose(false)}
                style={{
                  padding:'18px',
                  background:'#e11d48',
                  color:'white',
                  border:'none',
                  borderRadius:'15px',
                  fontSize:'18px'
                }}
              >
                Mito
              </button>
            </div>

            <p style={{
              marginTop:'20px',
              color:'#64748b'
            }}>
              Pregunta {index + 1} de {questions.length}
            </p>
          </div>
        )}

        {screen === 'result' && (
          <div style={card}>
            <h2>Partida terminada</h2>

            <p>
              {active}, sumaste {pts} puntos.
            </p>

            <div style={{
              display:'flex',
              gap:'15px',
              marginTop:'20px'
            }}>
              <button
                onClick={() => setScreen('home')}
                style={{
                  padding:'12px 20px'
                }}
              >
                Inicio
              </button>

              <button
                onClick={() => start(active)}
                style={{
                  padding:'12px 20px'
                }}
              >
                Jugar otra vez
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
