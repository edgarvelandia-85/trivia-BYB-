import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";

import { db } from "./firebase";

const services = [
  "📈 Marketing",
  "🎯 Estrategia",
  "🎨 Branding",
  "📱 Redes",
  "🌐 Web",
  "📘 Manual",
  "🧩 Plantillas",
  "🧪 Fórmulas"
];

/* mezclar cartas */
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/* crear tablero */
function generateCards() {
  return shuffle(
    [...services, ...services].map((item, index) => ({
      id: index,
      name: item,
      flipped: false,
      matched: false
    }))
  );
}

export default function MemoryOnline() {
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [room, setRoom] = useState(null);

  const [loading, setLoading] = useState(false);

  /* =========================
     CREAR SALA (HOST)
  ========================= */

  async function createRoom() {
    if (!playerName.trim()) return;

    const roomRef = await addDoc(
      collection(db, "rooms"),
      {
        host: playerName,

        players: [],

        turn: 0,

        cards: generateCards(),

        selected: [],

        started: false,

        finished: false,

        winner: ""
      }
    );

    setRoomId(roomRef.id);
  }

  /* =========================
     UNIRSE
  ========================= */

  async function joinRoom() {
    if (!playerName.trim()) return;
    if (!joinCode.trim()) return;

    const roomRef = doc(db, "rooms", joinCode);

    const snap = await getDoc(roomRef);

    if (!snap.exists()) {
      alert("Sala no encontrada");
      return;
    }

    const data = snap.data();

    if (data.players.length >= 2) {
      alert("Sala llena");
      return;
    }

    const updatedPlayers = [
      ...data.players,
      {
        name: playerName,
        score: 0
      }
    ];

    await updateDoc(roomRef, {
      players: updatedPlayers,
      started: updatedPlayers.length === 2
    });

    setRoomId(joinCode);
  }

  /* =========================
     ESCUCHAR CAMBIOS
  ========================= */

  useEffect(() => {
    if (!roomId) return;

    const unsub = onSnapshot(
      doc(db, "rooms", roomId),
      (snap) => {
        if (snap.exists()) {
          setRoom({
            id: snap.id,
            ...snap.data()
          });
        }
      }
    );

    return () => unsub();
  }, [roomId]);

  /* =========================
     VOLTEAR CARTAS
  ========================= */

  async function flipCard(index) {
    if (!room) return;

    if (loading) return;

    if (!room.started) return;

    if (room.finished) return;

    const cards = [...room.cards];

    if (cards[index].flipped) return;

    if (cards[index].matched) return;

    if (room.selected.length >= 2) return;

    cards[index].flipped = true;

    const selected = [...room.selected, index];

    await updateDoc(doc(db, "rooms", roomId), {
      cards,
      selected
    });

    /* comparar */

    if (selected.length === 2) {
      setLoading(true);

      setTimeout(async () => {
        const roomRef = doc(db, "rooms", roomId);

        const snap = await getDoc(roomRef);

        const updated = snap.data();

        const updatedCards = [...updated.cards];

        const players = [...updated.players];

        const [a, b] = updated.selected;

        const match =
          updatedCards[a].name ===
          updatedCards[b].name;

        if (match) {
          updatedCards[a].matched = true;
          updatedCards[b].matched = true;

          players[updated.turn].score += 1;
        } else {
          updatedCards[a].flipped = false;
          updatedCards[b].flipped = false;
        }

        const finished = updatedCards.every(
          (c) => c.matched
        );

        let winner = "";

        if (finished) {
          if (players[0].score > players[1].score) {
            winner = players[0].name;
          } else if (
            players[1].score > players[0].score
          ) {
            winner = players[1].name;
          } else {
            winner = "Empate";
          }
        }

        await updateDoc(roomRef, {
          cards: updatedCards,

          selected: [],

          players,

          turn: match
            ? updated.turn
            : updated.turn === 0
            ? 1
            : 0,

          finished,

          winner
        });

        setLoading(false);
      }, 1200);
    }
  }

  /* =========================
     ESTILOS
  ========================= */

  const page = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",
    color: "white",
    padding: "20px",
    fontFamily: "Arial"
  };

  const panel = {
    background: "rgba(255,255,255,.05)",
    border:
      "1px solid rgba(255,255,255,.08)",
    borderRadius: "24px",
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto",
    boxShadow:
      "0 0 25px rgba(0,255,255,.08)"
  };

  /* =========================
     LOGIN
  ========================= */

  if (!roomId) {
    return (
      <div style={page}>
        <div style={panel}>
          <h1
            style={{
              textAlign: "center",
              color: "#00ffff"
            }}
          >
            🌐 Memory BYB Online
          </h1>

          <input
            placeholder="Tu nombre"
            value={playerName}
            onChange={(e) =>
              setPlayerName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              marginBottom: "15px"
            }}
          />

          <button
            onClick={createRoom}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#06b6d4",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "25px"
            }}
          >
            👑 Crear Sala
          </button>

          <input
            placeholder="Código de sala"
            value={joinCode}
            onChange={(e) =>
              setJoinCode(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              marginBottom: "15px"
            }}
          />

          <button
            onClick={joinRoom}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#7c3aed",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🎮 Unirse
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     ESPERANDO JUGADORES
  ========================= */

  if (!room || !room.started) {
    return (
      <div style={page}>
        <div style={panel}>
          <h1
            style={{
              textAlign: "center",
              color: "#00ffff"
            }}
          >
            👑 Sala creada
          </h1>

          <h2
            style={{
              textAlign: "center",
              marginTop: "20px"
            }}
          >
            Código:
          </h2>

          <h1
            style={{
              textAlign: "center",
              color: "#00ffff",
              letterSpacing: "3px"
            }}
          >
            {roomId}
          </h1>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px"
            }}
          >
            Esperando 2 jugadoras...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     JUEGO
  ========================= */

  return (
    <div style={page}>
      <div style={panel}>
        <h1
          style={{
            textAlign: "center",
            color: "#00ffff"
          }}
        >
          🌐 Memory BYB Online
        </h1>

        {/* HOST */}
        <p
          style={{
            textAlign: "center",
            opacity: 0.8
          }}
        >
          👑 Host: {room.host}
        </p>

        {/* SCORE */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            marginTop: "25px",
            marginBottom: "30px",
            flexWrap: "wrap"
          }}
        >
          {room.players.map((p, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                minWidth: "180px",
                background:
                  room.turn === i
                    ? "#06b6d4"
                    : "rgba(255,255,255,.06)",
                padding: "16px",
                borderRadius: "16px",
                textAlign: "center"
              }}
            >
              <h3>{p.name}</h3>

              <p>{p.score} parejas</p>

              {room.turn === i && (
                <strong>🎯 Turno</strong>
              )}
            </div>
          ))}
        </div>

        {/* TABLERO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: "12px"
          }}
        >
          {room.cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() =>
                !loading && flipCard(index)
              }
              style={{
                height: "110px",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                padding: "10px",
                fontWeight: "bold",
                transition: "0.3s",
                background:
                  card.flipped || card.matched
                    ? "#06b6d4"
                    : "#1e293b"
              }}
            >
              {card.flipped || card.matched
                ? card.name
                : "✦"}
            </div>
          ))}
        </div>

        {/* FINAL */}
        {room.finished && (
          <div
            style={{
              textAlign: "center",
              marginTop: "35px"
            }}
          >
            <h1>🏆</h1>

            <h2
              style={{
                color: "#00ffff"
              }}
            >
              {room.winner === "Empate"
                ? "Empate"
                : `Ganó ${room.winner}`}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
