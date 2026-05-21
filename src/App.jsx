import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

const products = [
  "✨ Branding",
  "📱 Redes",
  "🎥 Reels",
  "📸 Foto",
  "💡 Marketing",
  "🧠 Estrategia",
  "🌐 Web",
  "🚀 Publicidad",
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createCards() {
  const duplicated = [...products, ...products];

  return shuffle(
    duplicated.map((item, index) => ({
      id: index,
      value: item,
      flipped: false,
      matched: false,
    }))
  );
}

export default function App() {
  const [game, setGame] = useState(null);

  return (
    <div style={styles.app}>
      {!game && <Menu setGame={setGame} />}

      {game === "memoryOnline" && (
        <MemoryOnline onBack={() => setGame(null)} />
      )}
    </div>
  );
}

function Menu({ setGame }) {
  return (
    <div style={styles.card}>
      <h1 style={styles.title}>🎮 BYB Games</h1>

      <button
        style={button("#10b981")}
        onClick={() => setGame("memoryOnline")}
      >
        🌐 Memory Online
      </button>
    </div>
  );
}

function MemoryOnline({ onBack }) {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    const unsub = onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
      if (snapshot.exists()) {
        setRoomData(snapshot.data());
      }
    });

    return () => unsub();
  }, [roomId]);

  async function createRoom() {
    if (!name) return alert("Escribe tu nombre");

    const code = Math.random().toString(36).substring(2, 7).toUpperCase();

    const cards = createCards();

    const room = await addDoc(collection(db, "rooms"), {
      code,
      players: [name],
      turn: 0,
      scores: {
        [name]: 0,
      },
      cards,
      selected: [],
      winner: null,
    });

    setRoomId(room.id);
    setRoomCode(code);
  }

  async function joinRoom() {
    if (!name || !roomCode)
      return alert("Completa nombre y código");

    const q = query(
      collection(db, "rooms"),
      where("code", "==", roomCode.toUpperCase())
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return alert("Sala no encontrada");
    }

    const roomDoc = snapshot.docs[0];
    const data = roomDoc.data();

    if (
      data.players.length >= 2 &&
      !data.players.includes(name)
    ) {
      return alert("Sala llena");
    }

    let players = data.players;

    if (!players.includes(name)) {
      players = [...players, name];
    }

    await updateDoc(doc(db, "rooms", roomDoc.id), {
      players,
      scores: {
        ...data.scores,
        [name]: data.scores[name] || 0,
      },
    });

    setRoomId(roomDoc.id);
  }

  async function flipCard(card) {
    if (!roomData) return;

    const currentPlayer =
      roomData.players[roomData.turn];

    if (currentPlayer !== name) {
      return alert("No es tu turno");
    }

    if (card.flipped || card.matched) return;

    let cards = [...roomData.cards];

    cards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );

    let selected = [...roomData.selected, card.id];

    await updateDoc(doc(db, "rooms", roomId), {
      cards,
      selected,
    });

    if (selected.length === 2) {
      setTimeout(async () => {
        const updatedCards = [...cards];

        const first = updatedCards.find(
          (c) => c.id === selected[0]
        );

        const second = updatedCards.find(
          (c) => c.id === selected[1]
        );

        let turn = roomData.turn;
        let scores = { ...roomData.scores };

        if (first.value === second.value) {
          updatedCards.forEach((c) => {
            if (
              c.id === first.id ||
              c.id === second.id
            ) {
              c.matched = true;
            }
          });

          scores[name] += 1;
        } else {
          updatedCards.forEach((c) => {
            if (
              c.id === first.id ||
              c.id === second.id
            ) {
              c.flipped = false;
            }
          });

          turn =
            roomData.turn === 0 ? 1 : 0;
        }

        const finished = updatedCards.every(
          (c) => c.matched
        );

        let winner = null;

        if (finished) {
          const p1 = roomData.players[0];
          const p2 = roomData.players[1];

          if (scores[p1] > scores[p2]) {
            winner = p1;
          } else if (scores[p2] > scores[p1]) {
            winner = p2;
          } else {
            winner = "Empate";
          }
        }

        await updateDoc(doc(db, "rooms", roomId), {
          cards: updatedCards,
          selected: [],
          turn,
          scores,
          winner,
        });
      }, 1000);
    }
  }

  if (!roomData) {
    return (
      <div style={styles.card}>
        <h1 style={styles.title}>
          🌐 Memory BYB Online
        </h1>

        <input
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <button
          style={button("#06b6d4")}
          onClick={createRoom}
        >
          👑 Crear Sala
        </button>

        <input
          placeholder="Código de sala"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          style={styles.input}
        />

        <button
          style={button("#7c3aed")}
          onClick={joinRoom}
        >
          🎮 Unirse
        </button>

        <button
          style={button("#ef4444")}
          onClick={onBack}
        >
          ⬅ Volver
        </button>
      </div>
    );
  }

  const currentPlayer =
    roomData.players[roomData.turn];

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>
        🧩 Sala: {roomData.code}
      </h1>

      <h2>
        Turno:
        {" "}
        {currentPlayer}
      </h2>

      <div style={{ marginBottom: 20 }}>
        {roomData.players.map((p) => (
          <div key={p}>
            {p}: {roomData.scores[p]}
          </div>
        ))}
      </div>

      {roomData.winner && (
        <h2>
          🏆 Ganador:
          {" "}
          {roomData.winner}
        </h2>
      )}

      <div style={styles.grid}>
        {roomData.cards.map((card) => (
          <div
            key={card.id}
            style={{
              ...styles.cardItem,
              background:
                card.flipped || card.matched
                  ? "#06b6d4"
                  : "#1e293b",
            }}
            onClick={() => flipCard(card)}
          >
            {card.flipped || card.matched
              ? card.value
              : "?"}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#020617",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    color: "white",
    fontFamily: "Arial",
  },

  card: {
    background: "#0f172a",
    padding: 30,
    borderRadius: 20,
    width: "100%",
    maxWidth: 900,
    textAlign: "center",
    boxShadow: "0 0 30px rgba(0,255,255,.2)",
  },

  title: {
    color: "#00ffff",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    border: "none",
    marginBottom: 15,
    fontSize: 16,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 10,
  },

  cardItem: {
    height: 100,
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 18,
  },
};

function button(color) {
  return {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    border: "none",
    borderRadius: 12,
    background: color,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
  };
}
