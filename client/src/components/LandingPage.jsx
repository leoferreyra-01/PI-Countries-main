import classNames from "classnames";
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
      <div className={classNames("landing-container")}>
        <img
          className={classNames("landing-image")}
          src={background}
          alt='Background'
        />
        <h2 className={classNames("landing-title1")}>
          LET'S TRAVEL AROUND THE WORLD
        </h2>
        <h1 className={classNames("landing-title2")}>
          WELCOME TO COUNTRIES APP!!
        </h1>

        <button
          onClick={(e) => {
            handleClick(e);
          }}
          className={classNames("landing-btn")}>
          LET THE JOURNEY BEGIN
        </button>
      </div>
    </div>
  );
}
