import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./Store/Store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store = {store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
