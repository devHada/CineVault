import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/layout/PageTransition";
import { useWatchlist } from "../context/WatchlistContext";

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

// ─── Skeleton ────────────────────────────────────────────────────────────────
const SkeletonBox = ({ className = "" }) => (
  <div
    className={`rounded-md animate-pulse ${className}`}
    style={{ background: "var(--border)", opacity: 0.6 }}
  />
);

const DetailSkeleton = () => (
  <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
    <div className="relative w-full" style={{ height: "520px" }}>
      <SkeletonBox className="absolute inset-0 rounded-none" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--bg-primary) 35%, transparent 70%)",
        }}
      />
      <div className="absolute bottom-10 left-10 flex gap-8 items-end">
        <SkeletonBox className="w-44 h-64 rounded-xl flex-shrink-0" />
        <div className="flex flex-col gap-4 pb-2">
          <SkeletonBox className="w-72 h-8" />
          <SkeletonBox className="w-48 h-4" />
          <SkeletonBox className="w-40 h-4" />
          <div className="flex gap-2 mt-2">
            {[1, 2, 3].map((i) => (
              <SkeletonBox key={i} className="w-20 h-7 rounded-full" />
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <SkeletonBox className="w-36 h-11 rounded-full" />
            <SkeletonBox className="w-36 h-11 rounded-full" />
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-5xl mx-auto px-8 py-10 flex flex-col gap-6">
      <SkeletonBox className="w-full h-4" />
      <SkeletonBox className="w-5/6 h-4" />
      <SkeletonBox className="w-4/6 h-4" />
      <div className="grid grid-cols-4 gap-4 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBox key={i} className="h-20 rounded-xl" />
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 flex-shrink-0"
          >
            <SkeletonBox className="w-20 h-20 rounded-full" />
            <SkeletonBox className="w-16 h-3" />
            <SkeletonBox className="w-12 h-3" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon }) => (
  <div
    className="flex flex-col gap-1 px-5 py-4 rounded-2xl"
    style={{
      background: "var(--bg-surface)",
      border: "1px solid var(--border)",
    }}
  >
    <span
      className="text-xs uppercase tracking-widest"
      style={{ color: "var(--text-secondary)" }}
    >
      {icon} {label}
    </span>
    <span
      className="text-lg font-semibold"
      style={{ color: "var(--text-primary)", fontFamily: "var(--font-cinzel)" }}
    >
      {value}
    </span>
  </div>
);

// ─── Trailer Modal ────────────────────────────────────────────────────────────
const TrailerModal = ({ videoKey, onClose }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
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
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="Trailer"
          allow="autoplay; fullscreen"
          className="w-full h-full"
          style={{ border: "none" }}
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-all"
          style={{
            background: "var(--bg-surface)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
          }}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ─── Cast Card ────────────────────────────────────────────────────────────────
const CastCard = ({ actor, index }) => (
  <motion.div
    className="flex flex-col items-center gap-2 flex-shrink-0 w-24"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 + index * 0.05 }}
  >
    <div
      className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
      style={{ border: "2px solid var(--border)" }}
    >
      {actor.profile_path ? (
        <img
          src={`${IMG_BASE}/w185${actor.profile_path}`}
          alt={actor.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-2xl"
          style={{ background: "var(--bg-surface)" }}
        >
          🎭
        </div>
      )}
    </div>
    <div className="text-center">
      <p
        className="text-xs font-semibold leading-tight"
        style={{
          color: "var(--text-primary)",
          fontFamily: "var(--font-raleway)",
        }}
      >
        {actor.name}
      </p>
      <p
        className="text-xs mt-0.5 leading-tight"
        style={{
          color: "var(--text-secondary)",
          fontFamily: "var(--font-raleway)",
        }}
      >
        {actor.character}
      </p>
    </div>
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const Details = () => {
  const { type, id } = useParams(); // type = "movie" | "tv"
  const navigate = useNavigate();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const [data, setData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const isInWatchlist = watchlist.some((m) => m.id === Number(id));

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const [detailRes, videoRes, creditsRes] = await Promise.all([
          fetch(
            `${TMDB_BASE}/${type}/${id}?api_key=${TMDB_KEY}&language=en-US`,
          ),
          fetch(
            `${TMDB_BASE}/${type}/${id}/videos?api_key=${TMDB_KEY}&language=en-US`,
          ),
          fetch(
            `${TMDB_BASE}/${type}/${id}/credits?api_key=${TMDB_KEY}&language=en-US`,
          ),
        ]);
        const detail = await detailRes.json();
        const videos = await videoRes.json();
        const credits = await creditsRes.json();

        setData(detail);
        setCast(credits.cast?.slice(0, 15) || []);

        const trailer = videos.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube",
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Failed to fetch details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [type, id]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const handleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(Number(id));
      showToast("Removed from Watchlist");
    } else {
      addToWatchlist({
        id: data.id,
        title: data.title || data.name,
        poster_path: data.poster_path,
        vote_average: data.vote_average,
        release_date: data.release_date || data.first_air_date,
        media_type: type,
      });
      showToast("Added to Watchlist ✓");
    }
  };

  if (loading) return <DetailSkeleton />;
  if (!data)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ color: "var(--text-secondary)" }}
      >
        Not found.
      </div>
    );

  // normalize movie vs tv fields
  const title = data.title || data.name;
  const year =
    (data.release_date || data.first_air_date)?.split("-")[0] || "N/A";
  const backdropUrl = data.backdrop_path
    ? `${IMG_BASE}/original${data.backdrop_path}`
    : null;
  const posterUrl = data.poster_path
    ? `${IMG_BASE}/w500${data.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";
  const rating = data.vote_average?.toFixed(1) || "N/A";
  const language = data.original_language?.toUpperCase() || "N/A";
  const popularity = data.popularity?.toFixed(0) || "N/A";
  const genres = data.genres?.map((g) => g.name) || [];

  // movie-only
  const runtime = data.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : null;
  // tv-only
  const seasons = data.number_of_seasons
    ? `${data.number_of_seasons} Season${data.number_of_seasons > 1 ? "s" : ""}`
    : null;
  const episodes = data.number_of_episodes
    ? `${data.number_of_episodes} Episodes`
    : null;

  return (
    <PageTransition>
      <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
        {/* Toast */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl"
              style={{
                background: "var(--accent)",
                color: "#0a0a0a",
                fontFamily: "var(--font-raleway)",
              }}
              initial={{ opacity: 0, y: -16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.92 }}
            >
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trailer Modal */}
        {showTrailer && trailerKey && (
          <TrailerModal
            videoKey={trailerKey}
            onClose={() => setShowTrailer(false)}
          />
        )}

        {/* Hero */}
        <div
          className="relative w-full overflow-hidden"
          style={{ minHeight: "540px" }}
        >
          {backdropUrl && (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.06, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <img
                src={backdropUrl}
                alt="backdrop"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.45)" }}
              />
            </motion.div>
          )}
          <div
            className="absolute inset-0"
            style={{
              background: backdropUrl
                ? "linear-gradient(to right, var(--bg-primary) 30%, transparent 65%, var(--bg-primary) 100%), linear-gradient(to top, var(--bg-primary) 0%, transparent 50%)"
                : "var(--bg-primary)",
            }}
          />

          {/* Back */}
          <motion.button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 z-20 flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: "var(--bg-surface)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-raleway)",
            }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            ← Back
          </motion.button>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-end px-8 md:px-14 pb-12 pt-28">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <img
                src={posterUrl}
                alt={title}
                className="w-44 md:w-52 rounded-2xl shadow-2xl object-cover"
                style={{ border: "2px solid var(--border)" }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-3 pb-1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              {/* TV badge */}
              {type === "tv" && (
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full w-fit"
                  style={{
                    background: "var(--accent)",
                    color: "#0a0a0a",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  TV Series
                </span>
              )}
              <h1
                className="text-3xl md:text-5xl font-bold leading-tight"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-cinzel)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.6)",
                }}
              >
                {title}
              </h1>
              {data.tagline && (
                <p
                  className="text-sm italic"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  "{data.tagline}"
                </p>
              )}
              <div
                className="flex flex-wrap items-center gap-3 text-sm"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-raleway)",
                }}
              >
                <span>{year}</span>
                <span style={{ color: "var(--border)" }}>•</span>
                {runtime && (
                  <>
                    <span>{runtime}</span>
                    <span style={{ color: "var(--border)" }}>•</span>
                  </>
                )}
                {seasons && (
                  <>
                    <span>{seasons}</span>
                    <span style={{ color: "var(--border)" }}>•</span>
                  </>
                )}
                <span className="flex items-center gap-1">
                  ⭐{" "}
                  <strong style={{ color: "var(--accent)" }}>{rating}</strong>
                  <span style={{ fontSize: "0.7rem" }}>/10</span>
                </span>
                <span style={{ color: "var(--border)" }}>•</span>
                <span>{language}</span>
              </div>
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {genres.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "var(--bg-surface)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border)",
                        fontFamily: "var(--font-raleway)",
                      }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3 mt-3">
                {trailerKey && (
                  <motion.button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                    style={{
                      background: "var(--accent)",
                      color: "#0a0a0a",
                      fontFamily: "var(--font-raleway)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    ▶ Watch Trailer
                  </motion.button>
                )}
                <motion.button
                  onClick={handleWatchlist}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                  style={{
                    background: isInWatchlist
                      ? "var(--bg-surface)"
                      : "transparent",
                    color: isInWatchlist
                      ? "var(--accent)"
                      : "var(--text-primary)",
                    border: `1.5px solid ${isInWatchlist ? "var(--accent)" : "var(--border)"}`,
                    fontFamily: "var(--font-raleway)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {isInWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-5xl mx-auto px-8 md:px-14 py-10 flex flex-col gap-10">
          {/* Overview */}
          {data.overview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2
                className="text-xs uppercase tracking-widest mb-3"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-raleway)",
                }}
              >
                Overview
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-raleway)",
                  maxWidth: "72ch",
                }}
              >
                {data.overview}
              </p>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <StatCard label="Rating" value={`${rating} / 10`} icon="⭐" />
            <StatCard label="Popularity" value={`#${popularity}`} icon="🔥" />
            {type === "movie" && runtime && (
              <StatCard label="Runtime" value={runtime} icon="🕐" />
            )}
            {type === "tv" && seasons && (
              <StatCard label="Seasons" value={seasons} icon="📺" />
            )}
            {type === "tv" && episodes && (
              <StatCard label="Episodes" value={episodes} icon="🎬" />
            )}
            <StatCard label="Language" value={language} icon="🌐" />
          </motion.div>

          {/* Cast */}
          {cast.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <h2
                className="text-xs uppercase tracking-widest mb-5"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-raleway)",
                }}
              >
                Cast
              </h2>
              <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
                {cast.map((actor, index) => (
                  <CastCard key={actor.id} actor={actor} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Extra */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {data.production_companies?.length > 0 && (
              <div>
                <h2
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  Production
                </h2>
                <p
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-raleway)",
                    fontSize: "0.9rem",
                  }}
                >
                  {data.production_companies.map((c) => c.name).join(", ")}
                </p>
              </div>
            )}
            {data.budget > 0 && (
              <div>
                <h2
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  Budget
                </h2>
                <p
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-raleway)",
                    fontSize: "0.9rem",
                  }}
                >
                  ${data.budget.toLocaleString()}
                </p>
              </div>
            )}
            {data.revenue > 0 && (
              <div>
                <h2
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  Revenue
                </h2>
                <p
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-raleway)",
                    fontSize: "0.9rem",
                  }}
                >
                  ${data.revenue.toLocaleString()}
                </p>
              </div>
            )}
            {data.status && (
              <div>
                <h2
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  Status
                </h2>
                <p
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-raleway)",
                    fontSize: "0.9rem",
                  }}
                >
                  {data.status}
                </p>
              </div>
            )}
            {type === "tv" && data.networks?.length > 0 && (
              <div>
                <h2
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-raleway)",
                  }}
                >
                  Network
                </h2>
                <p
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-raleway)",
                    fontSize: "0.9rem",
                  }}
                >
                  {data.networks.map((n) => n.name).join(", ")}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Details;
