import React from "react";
import styles from "../styles";
import { SERVICES } from "../data";

export default function ProgressPanel({
  company,
  player,
  score,
  levels,
}) {
  return (
    <div style={styles.left}>

      <div style={styles.panel}>

        <h2>
          {company.icon} {company.company}
        </h2>

        <p>
          👤 <b>{player}</b>
        </p>

        <p>
          💰 Presupuesto:
          <br />
          ${company.budget.toLocaleString()}
        </p>

        <p>
          🎯 {company.objective}
        </p>

      </div>

      <div style={styles.panel}>

        <h2>Puntaje</h2>

        <div style={styles.score}>
          {score} pts
        </div>

      </div>

      <div style={styles.panel}>

        <h2>Servicios BYB</h2>

        {SERVICES.map((service) => (

          <div
            key={service.id}
            style={{ marginBottom: 18 }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <span>
                {service.icon} {service.name}
              </span>

              <span>
                {levels[service.id]}%
              </span>
            </div>

            <div style={styles.bar}>

              <div
                style={{
                  ...styles.fill,
                  width: `${levels[service.id]}%`,
                  background: service.color,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
