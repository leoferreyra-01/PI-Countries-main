import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";
import background from "./img/giphy.gif";

export default function LandingPage() {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate("/countries");
  }
  return (
    <div>
      <div className="landing-container">
        <img
          className="landing-image"
          src={background}
          alt='Background'
        />
        <h2 className="landing-title1">
          LET'S TRAVEL AROUND THE WORLD
        </h2>
        <h1 className="landing-title2">
          WELCOME TO COUNTRIES APP!!
        </h1>

        <button
          onClick={(e) => {
            handleClick(e);
          }}
          className="landing-btn">
          LET THE JOURNEY BEGIN
        </button>
      </div>
    </div>
  );
}
