import React from "react";
import styles from "../styles";

export default function QuestionCard({
  question,
  questionIndex,
  total,
  answer,
}) {
  return (
    <div style={styles.question}>

      <h2>
        Pregunta {questionIndex + 1} de {total}
      </h2>

      <h3
        style={{
          marginTop:20,
          marginBottom:30,
          lineHeight:1.5
        }}
      >
        {question.question}
      </h3>

      {question.options.map((option,index)=>(

        <button
          key={index}
          style={styles.option}
          onClick={()=>answer(index)}
        >
          {option}
        </button>

      ))}

    </div>
  );
}
