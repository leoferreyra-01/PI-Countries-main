import React from "react";
import classNames from "classnames";
import "./Loading.scss"
import loading from "../../img/Loading.gif";

export default function Loading({ setLoading }) {
  return (
    <div>
      <div className={classNames("loading-container")}>
        <img
          className={classNames("loading-image")}
          src={loading}
          alt='Loading...'
        />
        <div className={classNames("loading-content")}>
            <p className={classNames("loading-content1")}>Loading...</p>
            <p className={classNames("loading-content1")}>One Second...</p>
        </div>
        {setTimeout(() => {
            setLoading(false);
          }, 1600)}
      </div>
    </div>
  );
}
