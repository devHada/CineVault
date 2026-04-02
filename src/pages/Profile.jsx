import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Film, Eye, Star, LogOut, Edit3, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/layout/PageTransition";
import { useWatchlist } from "../context/WatchlistContext";

const Profile = () => {
  const navigate = useNavigate();
  const { watchlist, watched, cineRatings } = useWatchlist();

  // Pull user from localStorage (set during Auth)
  const stored = JSON.parse(localStorage.getItem("cinevault-user") || "{}");
  const [username, setUsername] = useState(stored.username || "CineFan");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(username);

  const email = stored.email || "user@cinevault.com";
  const joinDate =
    stored.joinDate ||
    new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const totalRatings = Object.keys(cineRatings || {}).length;
  const avgRating =
    totalRatings > 0
      ? (
          Object.values(cineRatings).reduce((a, b) => a + b, 0) / totalRatings
        ).toFixed(1)
      : "—";

  const handleSaveName = () => {
    const updated = { ...stored, username: tempName };
    localStorage.setItem("cinevault-user", JSON.stringify(updated));
    setUsername(tempName);
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("cinevault-user");
    navigate("/");
  };

  const stats = [
    { icon: <Film size={20} />, label: "Watchlist", value: watchlist.length },
    { icon: <Eye size={20} />, label: "Watched", value: watched.length },
    { icon: <Star size={20} />, label: "Rated", value: totalRatings },
    {
      icon: <Star size={20} fill="currentColor" />,
      label: "Avg Rating",
      value: avgRating,
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <PageTransition>
      <section
        className="min-h-screen px-4 py-16"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* Cinematic background glow */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background:
              "radial-gradient(ellipse at top, rgba(245,197,24,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Header */}
            <motion.div variants={itemVariants}>
              <p
                className="font-cinzel text-xs tracking-widest uppercase mb-1"
                style={{ color: "var(--accent)" }}
              >
                Your Profile
              </p>
              <h1
                className="font-cinzel text-4xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                CINEVAULT
              </h1>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              variants={itemVariants}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "28px",
              }}
            >
              <div className="flex items-start gap-5">
                {/* Avatar */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="font-cinzel font-bold text-2xl"
                    style={{ color: "#0a0a0a" }}
                  >
                    {username.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Username edit */}
                  {editing ? (
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="font-cinzel text-xl font-bold bg-transparent border-b outline-none"
                        style={{
                          color: "var(--text-primary)",
                          borderColor: "var(--accent)",
                          width: "160px",
                        }}
                        autoFocus
                      />
                      <button onClick={handleSaveName}>
                        <Check size={16} style={{ color: "var(--accent)" }} />
                      </button>
                      <button
                        onClick={() => {
                          setEditing(false);
                          setTempName(username);
                        }}
                      >
                        <X
                          size={16}
                          style={{ color: "var(--text-secondary)" }}
                        />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mb-1">
                      <h2
                        className="font-cinzel text-xl font-bold truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {username}
                      </h2>
                      <button onClick={() => setEditing(true)}>
                        <Edit3
                          size={14}
                          style={{ color: "var(--text-secondary)" }}
                        />
                      </button>
                    </div>
                  )}

                  <p
                    className="font-raleway text-sm mb-2 truncate"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {email}
                  </p>
                  <p
                    className="font-raleway text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Member since {joinDate}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants}>
              <p
                className="font-cinzel text-xs tracking-widest uppercase mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Your Stats
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "20px",
                    }}
                  >
                    <div className="mb-3" style={{ color: "var(--accent)" }}>
                      {stat.icon}
                    </div>
                    <p
                      className="font-cinzel text-3xl font-bold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="font-raleway text-xs uppercase tracking-widest"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recently Watched */}
            {watched.length > 0 && (
              <motion.div variants={itemVariants}>
                <p
                  className="font-cinzel text-xs tracking-widest uppercase mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Recently Watched
                </p>
                <div
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  {watched.slice(0, 4).map((movie, i) => (
                    <div
                      key={movie.id}
                      className="flex items-center gap-3 px-4 py-3"
                      style={{
                        borderBottom:
                          i < Math.min(watched.length, 4) - 1
                            ? "1px solid var(--border)"
                            : "none",
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster}`}
                        alt={movie.title}
                        style={{
                          width: 36,
                          height: 54,
                          borderRadius: 4,
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-raleway text-sm font-semibold truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {movie.title}
                        </p>
                        {cineRatings[movie.id] && (
                          <p
                            className="font-raleway text-xs"
                            style={{ color: "var(--accent)" }}
                          >
                            {"★".repeat(cineRatings[movie.id])} Your rating
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Logout */}
            <motion.div variants={itemVariants}>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 font-raleway text-sm px-5 py-3 rounded-xl transition-all"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  width: "100%",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#e53935";
                  e.currentTarget.style.color = "#e53935";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Profile;
