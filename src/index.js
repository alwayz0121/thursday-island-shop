import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import clayful from "clayful/client-js";

import axios from "axios";
import "./css/auth.css";

//clayful에 리액트를 연동시키기
clayful.config({
  client:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImRlNjgwNTg5NmE4NjhiMTViNWYwZDJkZjdlYzllNzdjOTlkZjYyYTM5OWJiYmNkNDM2NGUxMzBhNTU3MGVkZWYiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjYyMTY3MjA0LCJzdG9yZSI6IjNHTlBNVTM5WExNVS5CTkM0R1VVOTI1WUciLCJzdWIiOiJXOVdXUTJIUlU1WFcifQ.MYia7EK7yYLfHw3zMBzLd_i5T9ICEFgMuGHNNKOteYU",
});
clayful.install("request", require("clayful/plugins/request-axios")(axios));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
