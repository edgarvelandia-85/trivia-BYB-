import React from "react";
import styles from "../styles";
import { SERVICES } from "../data";

export default function ResultScreen({
  score,
  levels,
  player,
}) {

  const best = SERVICES.reduce((a,b)=>
    levels[a.id] > levels[b.id] ? a : b
  );

  return (
    <div style={styles.background}>

      <div style={styles.result}>

        <h1>🏆 Simulación Finalizada</h1>

        <h2>{player}</h2>

        <h3>Puntaje Final</h3>

        <div style={styles.finalScore}>
          {score} pts
        </div>

        <h2 style={{marginTop:30}}>
          Servicio recomendado
        </h2>

        <h1>
          {best.icon} {best.name}
        </h1>

      </div>

    </div>
  );
}
