import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrending, getTopRated, getMoviesByGenre } from "../api/tmdb";
import MovieCard from "../components/ui/MovieCard";
import PageTransition from "../components/layout/PageTransition";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Play, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const genres = [
  { id: 28, name: "Action" },
  { id: 27, name: "Horror" },
  { id: 35, name: "Comedy" },
  { id: 878, name: "Sci-Fi" },
  { id: 16, name: "Anime" },
  { id: 18, name: "Drama" },
  { id: 12, name: "Adventure" },
];

// type field = "movie" | "tv" — controls /details/:type/:id routing
const heroMovies = [
  {
    id: 245891,
    type: "movie",
    title: "John Wick",
    genre: "Action",
    overview:
      "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.",
    backdrop_path: "/fSwYa5q2xRkBoOOjueLpkLf3N1m.jpg",
    trailerKey: "2AUmvWm5ZDQ",
  },
  {
    id: 19025,
    type: "movie",
    title: "Bhool Bhulaiyaa",
    genre: "Comedy",
    overview:
      "A couple returns to the husband's ancestral home, disregarding warnings of a curse and paranormal phenomena.",
    backdrop_path: "/sRNFXlwXN441His0KxAeR62zRtj.jpg",
    trailerKey: "L9bGFumFtPI",
  },
  {
    id: 138843,
    type: "movie",
    title: "The Conjuring",
    genre: "Horror",
    overview:
      "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    backdrop_path: "/kHZaX0vuhZdbuq0WKU3BpA9WIQ0.jpg",
    trailerKey: "k10ETZ41q5o",
  },
  {
    id: 1429,
    type: "tv",
    title: "Attack on Titan",
    genre: "Anime",
    overview:
      "Humanity fights for survival against giant humanoid creatures that have driven them behind massive walls.",
    backdrop_path: "/nB6IR9XfdRpVRKCz85uT97EjgwB.jpg",
    trailerKey: "MGRm3WHqqQo",
  },
  {
    id: 157336,
    type: "movie",
    title: "Interstellar",
    genre: "Sci-Fi",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    backdrop_path: "/2ssWTSVklAEc98frZUQhgtGHx7s.jpg",
    trailerKey: "zSWdZVtXT7E",
  },
  {
    id: 284053,
    type: "movie",
    title: "Doctor Strange",
    genre: "Magic",
    overview:
      "A former neurosurgeon embarks on a journey of healing only to be drawn into the world of the mystic arts.",
    backdrop_path: "/3zvZ699gMW2RhWc0GisIukzq0Ls.jpg",
    trailerKey: "HSzx-zryEgM",
  },
];

const TrailerModal = ({ trailerKey, onClose }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ aspectRatio: "16/9", border: "1px solid var(--border)" }}
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Trailer"
          allow="autoplay; fullscreen"
          className="w-full h-full"
          style={{ border: "none" }}
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{
            background: "var(--bg-surface)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
          }}
        >
          <X size={16} />
        </button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const Dashboard = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, topRatedRes] = await Promise.all([
          getTrending(),
          getTopRated(),
        ]);
        setTrending(trendingRes.data.results); // keeps movies + TV, media_type is on each item
        setTopRated(topRatedRes.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchByGenre = async () => {
      setLoadingMore(true);
      try {
        const res = activeGenre
          ? await getMoviesByGenre(activeGenre, 1)
          : await getTopRated();
        setTopRated(res.data.results);
        setPage(1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMore(false);
      }
    };
    fetchByGenre();
  }, [activeGenre]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = activeGenre
        ? await getMoviesByGenre(activeGenre, nextPage)
        : await getTopRated(nextPage);
      setTopRated((prev) => [...prev, ...res.data.results]);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "var(--bg-primary)" }}
      >
        <p
          style={{ color: "var(--accent)" }}
          className="font-cinzel text-2xl animate-pulse"
        >
          CINEVAULT
        </p>
      </div>
    );
  }

  return (
    <PageTransition>
      {activeTrailer && (
        <TrailerModal
          trailerKey={activeTrailer}
          onClose={() => setActiveTrailer(null)}
        />
      )}

      <section style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        {/* Hero */}
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          effect="fade"
        >
          {heroMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-[85vh] overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-10 md:p-16 max-w-2xl">
                  <span
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg-primary)",
                    }}
                    className="font-raleway text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block"
                  >
                    {movie.genre}
                  </span>
                  <h1 className="font-cinzel font-bold text-4xl md:text-6xl text-white mb-4">
                    {movie.title}
                  </h1>
                  <p className="font-raleway text-gray-300 text-sm md:text-base line-clamp-3 mb-6">
                    {movie.overview}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        navigate(`/details/${movie.type}/${movie.id}`)
                      }
                      style={{
                        background: "var(--accent)",
                        color: "var(--bg-primary)",
                      }}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-raleway font-bold text-sm hover:opacity-90 transition-all duration-300"
                    >
                      <Info size={16} /> View Details
                    </button>
                    <button
                      onClick={() => setActiveTrailer(movie.trailerKey)}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "white",
                      }}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-raleway font-bold text-sm hover:bg-white/20 transition-all duration-300"
                    >
                      <Play size={16} /> Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="px-6 md:px-12 py-10 flex flex-col gap-12">
          {/* Trending — movies + TV from API */}
          <div>
            <h2
              style={{ color: "var(--text-primary)" }}
              className="font-cinzel font-bold text-2xl mb-6"
            >
              Trending Now
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trending.map((item) => (
                <div key={item.id} className="min-w-45">
                  <MovieCard
                    id={item.id}
                    title={item.title || item.name}
                    poster={item.poster_path}
                    rating={item.vote_average}
                    year={
                      (item.release_date || item.first_air_date)?.split("-")[0]
                    }
                    description={item.overview}
                    mediaType={item.media_type}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Top Rated + Genre filter */}
          <div>
            <h2
              style={{ color: "var(--text-primary)" }}
              className="font-cinzel font-bold text-2xl mb-6"
            >
              Top Rated
            </h2>
            <div className="flex gap-3 flex-wrap mb-8">
              <button
                onClick={() => setActiveGenre(null)}
                style={{
                  background:
                    activeGenre === null
                      ? "var(--accent)"
                      : "var(--bg-surface)",
                  color:
                    activeGenre === null
                      ? "var(--bg-primary)"
                      : "var(--text-secondary)",
                  border: "1px solid var(--border)",
                }}
                className="px-4 py-2 rounded-full font-raleway text-sm font-semibold transition-all duration-300"
              >
                All
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() =>
                    setActiveGenre(activeGenre === genre.id ? null : genre.id)
                  }
                  style={{
                    background:
                      activeGenre === genre.id
                        ? "var(--accent)"
                        : "var(--bg-surface)",
                    color:
                      activeGenre === genre.id
                        ? "var(--bg-primary)"
                        : "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }}
                  className="px-4 py-2 rounded-full font-raleway text-sm font-semibold transition-all duration-300"
                >
                  {genre.name}
                </button>
              ))}
            </div>

            {loadingMore && topRated.length === 0 ? (
              <p
                style={{ color: "var(--accent)" }}
                className="font-cinzel animate-pulse"
              >
                Loading...
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {topRated.map((item) => (
                    <MovieCard
                      key={item.id}
                      id={item.id}
                      title={item.title || item.name}
                      poster={item.poster_path}
                      rating={item.vote_average}
                      year={
                        (item.release_date || item.first_air_date)?.split(
                          "-",
                        )[0]
                      }
                      description={item.overview}
                      mediaType={item.media_type || "movie"}
                    />
                  ))}
                </div>
                <div className="flex justify-center mt-10">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    style={{
                      border: "1px solid var(--accent)",
                      color: "var(--accent)",
                      background: "transparent",
                    }}
                    className="px-8 py-3 rounded-xl font-raleway font-bold text-sm transition-all duration-300 hover:opacity-80 disabled:opacity-40"
                  >
                    {loadingMore ? "Loading..." : "Load More"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Dashboard;
