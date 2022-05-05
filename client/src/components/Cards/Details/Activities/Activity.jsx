import React from "react";
import "./Activity.scss";

export default function Activity({ name, difficulty, duration, season }) {
  return (
    <div className="activity-container">
      <div className="activity-card">
        <p>
          <strong>Name: </strong>
          {name}
        </p>
        <p>
          <strong>Difficulty: </strong>
          {difficulty}
        </p>
        <p>
          <strong>Duration: </strong>
          {duration}
        </p>
        <p>
          <strong>Season: </strong>
          {season}
        </p>
      </div>    
    </div>
  );
}
