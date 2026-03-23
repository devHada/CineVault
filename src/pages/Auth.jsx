import React, { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    id: 2,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lZtvSDaohTsQ.jpg",
  },
  {
    id: 4,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
    genre: "Crime",
    rating: 9.2,
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLegHQDPINYC.jpg",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: 1994,
    genre: "Crime",
    rating: 8.9,
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentMovie, setCurrentMovie] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <section
      className={`grid md:grid-cols-2 min-h-screen w-full transition-colors duration-500 ${
        dark ? "bg-[#0a0a0a]" : "bg-[#f5f0e8]"
      }`}
    >
      {/* left panel */}
      <div
        className={`relative flex flex-col min-h-screen w-full justify-center items-center px-6 py-12 md:px-12 lg:px-20 transition-colors duration-500 ${
          dark ? "bg-[#111111]" : "bg-white"
        }`}
      >
        {/* theme toggle */}
        <button
          onClick={toggleTheme}
          className={`absolute top-6 right-6 border text-xs px-3 py-2 rounded-lg transition-all duration-300 ${
            dark
              ? "bg-white/10 border-white/10 text-gray-400 hover:bg-white/15"
              : "bg-black/5 border-black/10 text-gray-500 hover:bg-black/10"
          }`}
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* logo */}
        <div className="flex flex-col gap-1 mb-10 w-full max-w-sm">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-yellow-400 font-cinzel font-bold tracking-widest">
            CINEVAULT
          </h1>
          <p
            className={`ml-1 text-sm sm:text-base font-raleway ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Your cinematic universe, organized.
          </p>
        </div>

        {/* toggle */}
        <div
          className={`flex gap-2 w-full max-w-sm px-2 py-2 rounded-2xl mb-8 ${
            dark ? "bg-white/5" : "bg-black/5"
          }`}
        >
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold font-raleway transition-all duration-300 ${
              isLogin
                ? "bg-yellow-400 text-black"
                : dark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold font-raleway transition-all duration-300 ${
              !isLogin
                ? "bg-yellow-400 text-black"
                : dark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
            }`}
          >
            Register
          </button>
        </div>

        {/* form with FM animation */}
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.25 }}
            >
              {isLogin ? <Login dark={dark} /> : <Register dark={dark} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* right panel */}
      <div className="hidden md:flex relative min-h-screen">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentMovie}
            src={movies[currentMovie].poster}
            alt={movies[currentMovie].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMovie}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-white text-xl font-bold font-raleway mb-1">
                {movies[currentMovie].title}
              </h2>
              <p className="text-gray-400 text-sm font-raleway mb-3">
                {movies[currentMovie].director} · {movies[currentMovie].year} ·{" "}
                {movies[currentMovie].genre}
              </p>
              <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                IMDB {movies[currentMovie].rating}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* dots */}
          <div className="flex gap-2 mt-4">
            {movies.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentMovie(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentMovie ? "bg-yellow-400 w-5" : "bg-white/30 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
