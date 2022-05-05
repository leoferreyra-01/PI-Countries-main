import React from "react";
import "./LoadingDetails.scss"
import loading from "../../../img/LoadingDetails.gif";

export default function Loading({ setLoading }) {
  return (
    <div>
      <div className="loading-container">
        <img
          className="loading-image"
          src={loading}
          alt='Loading...'
        />
        <div className="loading-content">
            <p className="loading-content1">Loading...</p>
            <p className="loading-content1">One Second...</p>
        </div>
        {setTimeout(() => {
            setLoading(false);
          }, 1500)}
      </div>
    </div>
  );
}
