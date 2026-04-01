import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
import CineAI from "./pages/CineAI";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <Layout>
              <MovieDetails />
            </Layout>
          }
        />
        <Route
          path="/watchlist"
          element={
            <Layout>
              <Watchlist />
            </Layout>
          }
        />
        <Route
          path="/recommendations"
          element={
            <Layout>
              <Recommendations />
            </Layout>
          }
        />
        <Route
          path="/cineai"
          element={
            <Layout>
              <CineAI />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
