import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import CineAI from "./pages/CineAI";
import MovieDetails from "./pages/MovieDetails";
import Recommendations from "./pages/Recommendations";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cineai" element={<CineAI />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
