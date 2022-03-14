import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./routes/MovieList";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="movielist" element={<MovieList />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

