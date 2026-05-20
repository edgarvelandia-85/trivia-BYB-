import React, { useEffect, useState } from "react";

/* sonidos sutiles */
const okSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3"
);
okSound.volume = 0.3;

const badSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3"
);
badSound.volume = 0.15;

/* servicios BYB */
const services = [
  { icon: "📈", name: "Marketing en Salud" },
  { icon: "🎯", name: "Estrategia Comercial" },
  { icon: "📱", name: "Redes Sociales" },
  { icon: "🌐", name: "Sitio Web" },
  { icon: "🎨", name: "Diseño de Marca" },
  { icon: "📘", name: "Manual de Marca" },
  { icon: "🧩", name: "Plantillas Personalizadas" },
  { icon: "🧪", name: "Fórmulas Magistrales" }
];

/* mezclar cartas */
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function MemoryBYB() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [screen, setScreen] = useState("login");

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const [turn, setTurn] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [busy, setBusy] = useState(false);

  const [winner, setWinner] = useState("");

  const players = [player1, player2];

  useEffect(() => {
    if (screen !== "game") return;

    if (matched.length === 16) {
      if (scores[0] > scores[1]) {
        setWinner(player1);
      } else if (scores[1] > scores[0]) {
        setWinner(player2);
      } else {
        setWinner("Empate");
      }

      setScreen("result");
    }
  }, [matched]);

  function startGame() {
    if (!player1.trim() || !player2.trim()) return;

    const deck = shuffle(
      [...services, ...services].map((item, index) => ({
        ...item,
        id: index
      }))
    );

    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setScores([0, 0]);
    setTurn(0);
    setWinner("");
    setScreen("game");
  }

  function handleCard(index) {
    if (busy) return;
    if (flipped.includes(index)) return;
    if (matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setBusy(true);

      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first.name === second.name) {
        okSound.currentTime = 0;
        okSound.play();

        setMatched((prev) => [...prev, ...newFlipped]);

        const updatedScores = [...scores];
        updatedScores[turn] += 1;
        setScores(updatedScores);

        setTimeout(() => {
          setFlipped([]);
          setBusy(false);
        }, 700);
      } else {
        badSound.currentTime = 0;
        badSound.play();

        setTimeout(() => {
          setFlipped([]);
          setTurn((prev) => (prev === 0 ? 1 : 0));
          setBusy(false);
        }, 900);
      }
    }
  }

  function resetAll() {
    setPlayer1("");
    setPlayer2("");
    setCards([]);
    setFlipped([]);
    setMatched([]);
    setScores([0, 0]);
    setTurn(0);
    setWinner("");
    setScreen("login");
  }

  const page = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#050816,#0f172a,#111827)",
    color: "white",
    padding: "25px",
    fontFamily: "Arial"
  };

  const cardContainer = {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 0 25px rgba(0,255,255,.1)"
  };

  const btn = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white"
  };

  return (
    <div style={page}>
      <div style={cardContainer}>
        <h1
          style={{
            textAlign: "center",
            color: "#00ffff"
          }}
        >
          🧠 Memory BYB
        </h1>

        {/* LOGIN */}
        {screen === "login" && (
          <>
            <h2>Registrar jugadoras</h2>

            <input
              placeholder="Jugador 1"
              value={player1}
              onChange={(e) =>
                setPlayer1(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px"
              }}
            />

            <input
              placeholder="Jugador 2"
              value={player2}
              onChange={(e) =>
                setPlayer2(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "20px"
              }}
            />

            <button
              onClick={startGame}
              style={{
                ...btn,
                background: "#2563eb"
              }}
            >
              Empezar juego
            </button>
          </>
        )}

        {/* GAME */}
        {screen === "game" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "10px"
              }}
            >
              <div>
                <strong>
                  Turno:
                </strong>{" "}
                {players[turn]}
              </div>

              <div>
                {player1}: {scores[0]} |{" "}
                {player2}: {scores[1]}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4,1fr)",
                gap: "15px"
              }}
            >
              {cards.map((card, index) => {
                const isOpen =
                  flipped.includes(index) ||
                  matched.includes(index);

                return (
                  <button
                    key={index}
                    onClick={() =>
                      handleCard(index)
                    }
                    style={{
                      height: "120px",
                      borderRadius: "18px",
                      border:
                        "1px solid rgba(255,255,255,.08)",
                      background: isOpen
                        ? "rgba(255,255,255,.08)"
                        : "#0f172a",
                      color: "white",
                      cursor: "pointer",
                      boxShadow:
                        "0 0 10px rgba(0,255,255,.08)"
                    }}
                  >
                    {isOpen ? (
                      <>
                        <div
                          style={{
                            fontSize: "30px"
                          }}
                        >
                          {card.icon}
                        </div>

                        <div
                          style={{
                            fontSize: "12px",
                            marginTop: "8px"
                          }}
                        >
                          {card.name}
                        </div>
                      </>
                    ) : (
                      <div
                        style={{
                          fontSize: "28px"
                        }}
                      >
                        ✦
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* RESULTADO */}
        {screen === "result" && (
          <>
            <h2
              style={{
                textAlign: "center"
              }}
            >
              🏆{" "}
              {winner === "Empate"
                ? "Empate"
                : `Ganadora: ${winner}`}
            </h2>

            <p
              style={{
                textAlign: "center"
              }}
            >
              {player1}: {scores[0]}
              <br />
              {player2}: {scores[1]}
            </p>

            <button
              onClick={startGame}
              style={{
                ...btn,
                background: "#16a34a",
                marginBottom: "12px"
              }}
            >
              Jugar otra vez
            </button>

            <button
              onClick={resetAll}
              style={{
                ...btn,
                background: "#dc2626"
              }}
            >
              Reiniciar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
