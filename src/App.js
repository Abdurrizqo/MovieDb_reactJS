import "./App.css";
import React from "react";
import MovieList from "./pages/MovieList/MovieList";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Layout from "./pages/Layout/Layout";
import LayoutDetail from "./pages/Layout/LayoutDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MovieList />} />
          <Route path="/all/:page" element={<MovieList />} />
          <Route path="/genres/:genre" element={<MovieList />} />
          <Route path="/genres/:genre/:pages" element={<MovieList />} />
        </Route>
        <Route path="/movie" element={<LayoutDetail />}>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
