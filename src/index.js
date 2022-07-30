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
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMwNGI5ZGNiZmY2OWM1MDMxNWZhODM0MjFhMzRlZTdjMGZlZDJkMzQ0ZGY0YWY2YzJmMGU3NDNhZWNkNTExYTUiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjU4OTkyNjI3LCJzdG9yZSI6IjNHTlBNVTM5WExNVS5HSEFHUjhaRzRQMksiLCJzdWIiOiI0TjJLNVlGVDk0WUMifQ.JTl04yyGLKFNjUCUJAQJb2EOxdSmQxkMqfh6zzbYyc4",
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
