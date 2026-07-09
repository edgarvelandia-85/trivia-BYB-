import React from "react";
import styles from "../styles";

export default function Welcome({
  player,
  setPlayer,
  onStart,
}) {
  return (
    <div style={styles.background}>
      <div style={styles.welcomeCard}>
        <h1 style={styles.title}>
          🚀 BYB BUSINESS SIMULATOR
        </h1>

        <p style={styles.subtitle}>
          Construye la mejor estrategia utilizando los servicios de Be Your Brand.
        </p>

        <input
          style={styles.input}
          placeholder="Nombre del participante"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={onStart}
        >
          COMENZAR
        </button>
      </div>
    </div>
  );
}
