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
  "Branding",
  "Marketing",
  "Diseño",
  "Contenido",
  "Redes",
  "Publicidad",
  "Estrategia",
  "SEO"
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

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
  const [currentRoom, setCurrentRoom] = useState(null);
  const [joinRoom, setJoinRoom] = useState("");
  const [loading, setLoading] = useState(false);

  // CREAR SALA
  const createRoom = async () => {
    if (!playerName) return;

    const room = await addDoc(collection(db, "rooms"), {
      players: [
        {
          name: playerName,
          score: 0
        }
      ],
      turn: 0,
      cards: generateCards(),
      selected: [],
      started: false,
      winner: "",
      finished: false
    });

    setRoomId(room.id);
  };

  // UNIRSE
  const enterRoom = async () => {
    if (!playerName || !joinRoom) return;

    const roomRef = doc(db, "rooms", joinRoom);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      alert("Sala no encontrada");
      return;
    }

    const data = roomSnap.data();

    if (data.players.length >= 2) {
      alert("Sala llena");
      return;
    }

    await updateDoc(roomRef, {
      players: [
        ...data.players,
        {
          name: playerName,
          score: 0
        }
      ],
      started: true
    });

    setRoomId(joinRoom);
  };

  // ESCUCHAR CAMBIOS
  useEffect(() => {
    if (!roomId) return;

    const unsub = onSnapshot(doc(db, "rooms", roomId), (snap) => {
      if (snap.exists()) {
        setCurrentRoom({
          id: snap.id,
          ...snap.data()
        });
      }
    });

    return () => unsub();
  }, [roomId]);

  // VOLTEAR CARTA
  const flipCard = async (index) => {
    if (!currentRoom) return;

    if (currentRoom.finished) return;

    const cards = [...currentRoom.cards];

    if (cards[index].flipped || cards[index].matched) return;

    if (currentRoom.selected.length >= 2) return;

    cards[index].flipped = true;

    const selected = [...currentRoom.selected, index];

    await updateDoc(doc(db, "rooms", roomId), {
      cards,
      selected
    });

    // VALIDAR
    if (selected.length === 2) {
      setLoading(true);

      setTimeout(async () => {
        const roomRef = doc(db, "rooms", roomId);
        const snap = await getDoc(roomRef);

        const updated = snap.data();

        const updatedCards = [...updated.cards];

        const [a, b] = updated.selected;

        const players = [...updated.players];

        if (
          updatedCards[a].name === updatedCards[b].name
        ) {
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
          turn:
            updatedCards[a].name === updatedCards[b].name
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
  };

  // PANTALLA INICIAL
  if (!roomId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#020617,#0f172a,#111827)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          fontFamily: "Arial"
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "35px",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "420px",
            border:
              "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#00ffff",
              marginBottom: "25px"
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
              borderRadius: "10px",
              border: "none",
              marginBottom: "15px"
            }}
          />

          <button
            onClick={createRoom}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#06b6d4",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "25px"
            }}
          >
            Crear Sala
          </button>

          <input
            placeholder="Código de sala"
            value={joinRoom}
            onChange={(e) =>
              setJoinRoom(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              marginBottom: "15px"
            }}
          />

          <button
            onClick={enterRoom}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#7c3aed",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Unirse
          </button>
        </div>
      </div>
    );
  }

  // ESPERANDO
  if (!currentRoom || !currentRoom.started) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "Arial"
        }}
      >
        <h1>🎮 Sala creada</h1>

        <h2
          style={{
            color: "#00ffff"
          }}
        >
          {roomId}
        </h2>

        <p>Esperando segundo jugador...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#111827)",
        color: "white",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#00ffff"
        }}
      >
        🌐 Memory BYB Online
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "700px",
          margin: "20px auto"
        }}
      >
        {currentRoom.players.map((p, i) => (
          <div
            key={i}
            style={{
              background:
                currentRoom.turn === i
                  ? "#06b6d4"
                  : "rgba(255,255,255,0.08)",
              padding: "12px 18px",
              borderRadius: "12px"
            }}
          >
            <strong>{p.name}</strong>
            <div>{p.score} parejas</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "12px",
          maxWidth: "700px",
          margin: "30px auto"
        }}
      >
        {currentRoom.cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() =>
              !loading && flipCard(index)
            }
            style={{
              height: "110px",
              borderRadius: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              textAlign: "center",
              padding: "10px",
              transition: "0.3s",
              background:
                card.flipped || card.matched
                  ? "#06b6d4"
                  : "#1e293b"
            }}
          >
            {card.flipped || card.matched
              ? card.name
              : "?"}
          </div>
        ))}
      </div>

      {currentRoom.finished && (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px"
          }}
        >
          <h1>🏆</h1>

          <h2
            style={{
              color: "#00ffff"
            }}
          >
            {currentRoom.winner === "Empate"
              ? "Empate"
              : `Ganó ${currentRoom.winner}`}
          </h2>
        </div>
      )}
    </div>
  );
}
