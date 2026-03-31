import React, { useState, useEffect } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
    poster:
      "https://imgs.search.brave.com/QXytjCe9WYbYBdo45l_xP2FE9JgLhkqACqb9kBwqr7Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzYxLzQx/L2Q0LzYxNDFkNGQ3/MzI4YjAwZjBkOGU0/OTJmY2UyODlhMmRl/LmpwZw",
  },
  {
    id: 4,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
    genre: "Crime",
    rating: 9.2,
    poster:
      "https://imgs.search.brave.com/CuDfn_0aGiIY293ZS35HNcfy0HdWUwZ0K86_SpNQS5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS8xMS80/MS9uWnVHMmkuanBn",
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
  const Navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("cinevault-user");
    if (user) Navigate("/dashboard");
  }, []);

  const dark = theme === "dark";
  const handleRegister = ({ name, email, password }) => {
    localStorage.setItem(
      "cinevault-user",
      JSON.stringify({ name, email, password }),
    );
    Navigate("/dashboard");
  };

  const handleLogin = ({ email, password }) => {
    const saved = JSON.parse(localStorage.getItem("cinevault-user"));
    if (saved && saved.email === email && saved.password === password) {
      Navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <section
      className={`grid md:grid-cols-2 h-screen w-full transition-colors duration-500 ${
        dark ? "bg-[#0a0a0a]" : "bg-[#eeeae4]"
      }`}
    >
      {/* left panel */}
      <motion.div
        className={`relative flex flex-col min-h-screen w-full justify-center items-center px-6 py-12 md:px-12 lg:px-20 transition-colors duration-500 ${
          dark ? "bg-[#111111]" : "bg-[#f7f4ef]"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* theme toggle */}
        <button
          onClick={toggleTheme}
          className={`absolute top-6 right-6 border text-xs px-3 py-2 rounded-lg transition-all duration-300 ${
            dark
              ? "bg-white/10 border-white/10 text-gray-400 hover:bg-white/15"
              : "bg-[#1a2744]/10 border-[#1a2744]/20 text-[#1a2744] hover:bg-[#1a2744]/15"
          }`}
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* logo */}
        <div className="flex flex-col gap-1 mb-10 w-full max-w-sm">
          <h1
            className={`text-5xl  lg:text-7xl font-cinzel font-bold tracking-widest ${
              dark ? "text-yellow-400" : "text-[#1a2744]"
            }`}
          >
            CINEVAULT
          </h1>
          <p
            className={`ml-1 text-sm sm:text-base font-raleway ${
              dark ? "text-gray-400" : "text-[#1a2744]/60"
            }`}
          >
            Your cinematic universe, organized.
          </p>
        </div>

        {/* toggle */}
        <div
          className={`flex gap-2 w-full max-w-sm px-2 py-2 rounded-2xl mb-8 ${
            dark ? "bg-white/5" : "bg-[#1a2744]/8"
          }`}
        >
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold font-raleway transition-all duration-300 ${
              isLogin
                ? dark
                  ? "bg-yellow-400 text-black"
                  : "bg-[#1a2744] text-white"
                : dark
                  ? "text-gray-400 hover:text-white"
                  : "text-[#1a2744]/50 hover:text-[#1a2744]"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold font-raleway transition-all duration-300 ${
              !isLogin
                ? dark
                  ? "bg-yellow-400 text-black"
                  : "bg-[#1a2744] text-white"
                : dark
                  ? "text-gray-400 hover:text-white"
                  : "text-[#1a2744]/50 hover:text-[#1a2744]"
            }`}
          >
            Register
          </button>
        </div>

        {/* form */}
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: isLogin ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 24 : -24 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isLogin ? (
                <Login dark={dark} onLogin={handleLogin} />
              ) : (
                <Register dark={dark} onRegister={handleRegister} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* right panel — swiper */}
      <div className="hidden md:block relative min-h-screen overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          onSlideChange={(swiper) => setCurrentMovie(swiper.realIndex)}
          className="w-full h-full min-h-screen"
          style={{
            "--swiper-pagination-color": dark ? "#facc15" : "#1a2744",
            "--swiper-pagination-bullet-inactive-color": "#ffffff80",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bottom": "100px",
          }}
        >
          {movies.map((movie, i) => (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-full min-h-screen">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                {/* movie info */}
                <AnimatePresence>
                  {currentMovie === i && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-8"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <h2 className="text-white text-2xl font-bold font-cinzel mb-1 tracking-wide">
                        {movie.title}
                      </h2>
                      <p className="text-gray-300 text-sm font-raleway mb-3">
                        {movie.director} · {movie.year} · {movie.genre}
                      </p>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          dark
                            ? "bg-yellow-400 text-black"
                            : "bg-[#1a2744] text-white"
                        }`}
                      >
                        IMDB {movie.rating}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Auth;
