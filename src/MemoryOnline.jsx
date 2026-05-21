import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
  getDoc
} from "firebase/firestore";

import { db } from "./firebase";

const products = [
  "SEO",
  "BRANDING",
  "WEB",
  "ADS",
  "CRM",
  "IA",
  "SOCIAL",
  "FUNNEL"
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function generateCards() {
  const duplicated = [...products, ...products];

  return shuffle(
    duplicated.map((item, index) => ({
      id: index,
      value: item,
      flipped: false,
      matched: false
    }))
  );
}

export default function MemoryOnline() {
  const [playerName, setPlayerName] = useState("");
  const [roomIdInput, setRoomIdInput] = useState("");

  const [roomId, setRoomId] = useState("");
  const [room, setRoom] = useState(null);

  // HOST CREATE ROOM
  async function createRoom() {
    if (!playerName) return;

    const roomRef = await addDoc(collection(db, "rooms"), {
      host: playerName,

      // HOST NO JUEGA
      players: [],

      turn: 0,

      cards: generateCards(),

      selected: [],

      started: false,

      finished: false,

      winner: ""
    });

    setRoomId(roomRef.id);

    // SOLO OBSERVADOR
    setRoom({
      host: playerName,
      players: [],
      turn: 0,
      cards: [],
      selected: [],
      started: false,
      finished: false,
      winner: ""
    });
  }

  // JOIN ROOM
  async function joinRoom() {
    if (!playerName || !roomIdInput) return;

    const roomRef = doc(db, "rooms", roomIdInput);

    const snap = await getDoc(roomRef);

    if (!snap.exists()) {
      alert("Sala no existe");
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

    setRoomId(roomIdInput);
  }

  // REALTIME
  useEffect(() => {
    if (!roomId) return;

    const unsub = onSnapshot(doc(db, "rooms", roomId), (snap) => {
      if (snap.exists()) {
        setRoom(snap.data());
      }
    });

    return () => unsub();
  }, [roomId]);

  // CARD CLICK
  async function flipCard(card) {
    if (!room) return;

    if (!room.started) return;

    if (card.flipped || card.matched) return;

    if (room.selected.length >= 2) return;

    const roomRef = doc(db, "rooms", roomId);

    const cards = [...room.cards];

    const index = cards.findIndex((c) => c.id === card.id);

    cards[index].flipped = true;

    const selected = [...room.selected, card.id];

    await updateDoc(roomRef, {
      cards,
      selected
    });

    // CHECK PAIR
    if (selected.length === 2) {
      setTimeout(async () => {
        const freshSnap = await getDoc(roomRef);

        const fresh = freshSnap.data();

        const freshCards = [...fresh.cards];

        const [a, b] = fresh.selected;

        const cardA = freshCards.find((c) => c.id === a);
        const cardB = freshCards.find((c) => c.id === b);

        let players = [...fresh.players];

        let turn = fresh.turn;

        if (cardA.value === cardB.value) {
          cardA.matched = true;
          cardB.matched = true;

          players[turn].score += 1;
        } else {
          cardA.flipped = false;
          cardB.flipped = false;

          turn = turn === 0 ? 1 : 0;
        }

        const finished = freshCards.every((c) => c.matched);

        let winner = "";

        if (finished) {
          if (players[0].score > players[1].score) {
            winner = players[0].name;
          } else if (players[1].score > players[0].score) {
            winner = players[1].name;
          } else {
            winner = "Empate";
          }
        }

        await updateDoc(roomRef, {
          cards: freshCards,
          selected: [],
          players,
          turn,
          finished,
          winner
        });
      }, 1000);
    }
  }

  // MENU
  if (!roomId) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>🌐 Memory BYB Online</h1>

          <input
            placeholder="Tu nombre"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={styles.input}
          />

          <button style={styles.createBtn} onClick={createRoom}>
            👑 Crear Sala
          </button>

          <input
            placeholder="Código de sala"
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
            style={styles.input}
          />

          <button style={styles.joinBtn} onClick={joinRoom}>
            🎮 Unirse
          </button>
        </div>
      </div>
    );
  }

  // WAITING
  if (!room || !room.started) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>⏳ Esperando jugadores...</h1>

          <h2 style={{ color: "#fff" }}>
            Código:
            <br />
            {roomId}
          </h2>

          <p style={{ color: "#aaa" }}>
            Comparte este código con las jugadoras
          </p>

          <p style={{ color: "#00ffff" }}>
            Jugadoras conectadas:
            <br />
            {room?.players?.length || 0}/2
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.game}>
        <h1 style={styles.title}>🧠 Memory BYB</h1>

        <div style={styles.info}>
          {room.players.map((p, i) => (
            <div
              key={i}
              style={{
                ...styles.player,
                border:
                  room.turn === i
                    ? "2px solid #00ffff"
                    : "2px solid transparent"
              }}
            >
              <h3>{p.name}</h3>
              <p>{p.score} pts</p>
            </div>
          ))}
        </div>

        {room.finished && (
          <div style={styles.winner}>
            🏆 Ganadora: {room.winner}
          </div>
        )}

        <div style={styles.grid}>
          {room.cards.map((card) => (
            <div
              key={card.id}
              style={{
                ...styles.memoryCard,
                background:
                  card.flipped || card.matched
                    ? "#00ffff"
                    : "#1e293b"
              }}
              onClick={() => flipCard(card)}
            >
              {card.flipped || card.matched ? card.value : "?"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#020617",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  card: {
    background: "#111827",
    padding: 30,
    borderRadius: 25,
    width: 400,
    maxWidth: "95%",
    boxShadow: "0 0 25px rgba(0,255,255,0.2)"
  },

  game: {
    width: 900,
    maxWidth: "100%"
  },

  title: {
    textAlign: "center",
    color: "#00ffff",
    marginBottom: 20
  },

  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    border: "none",
    fontSize: 16
  },

  createBtn: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    border: "none",
    background: "#06b6d4",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
    marginBottom: 20
  },

  joinBtn: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    border: "none",
    background: "#7c3aed",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer"
  },

  info: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20
  },

  player: {
    background: "#111827",
    color: "#fff",
    padding: 15,
    borderRadius: 15,
    minWidth: 140,
    textAlign: "center"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 15
  },

  memoryCard: {
    aspectRatio: "1",
    background: "#1e293b",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 18
  },

  winner: {
    background: "#22c55e",
    padding: 15,
    borderRadius: 15,
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold"
  }
};
