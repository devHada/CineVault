import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Profile from "../../pages/Profile";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const navLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "Recommendations", path: "/recommendations" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "CineAI", path: "/cineai" },
  ];
  const goProfile = () => {
    navigate("/profile");
  };

  const stored = JSON.parse(localStorage.getItem("cinevault-user") || "{}");
  const [username, setUsername] = useState(stored.username || "CineFan");

  return (
    <nav
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
      }}
      className="fixed top-0 left-0 right-0 z-50 h-16"
    >
      <div className="flex items-center justify-between h-full px-6 md:px-10">
        {/* logo */}
        <NavLink to="/dashboard">
          <h1
            style={{ color: "var(--accent)" }}
            className="font-cinzel font-bold text-xl tracking-widest"
          >
            CINEVAULT
          </h1>
        </NavLink>

        {/* nav links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path}>
              {({ isActive }) => (
                <div style={{ position: "relative", paddingBottom: "4px" }}>
                  <span
                    style={{
                      color: isActive
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                    }}
                    className="font-raleway text-sm font-semibold"
                  >
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="active-link"
                      style={{
                        background: "var(--accent)",
                        height: "2px",
                        borderRadius: "2px",
                      }}
                      className="absolute bottom-0 left-0 right-0"
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* right side desktop */}
        <div className="hidden md:flex items-center gap-3">
          <div
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--border)",
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
          >
            <Search size={14} style={{ color: "var(--text-secondary)" }} />
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                outline: "none",
                fontSize: "13px",
                width: "160px",
              }}
              className="placeholder:text-gray-500 font-raleway"
            />
          </div>
          <button
            onClick={toggleTheme}
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
            className="px-3 py-2 rounded-lg text-xs font-raleway transition-all duration-300"
          >
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
          </button>
          <div
            onClick={goProfile}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <span
              className="font-cinzel font-bold text-sm"
              style={{ color: "#0a0a0a" }}
            >
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* mobile right */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
            className="px-3 py-2 rounded-lg text-xs"
          >
            {theme === "dark" ? "☀" : "🌙"}
          </button>
          <div
            onClick={goProfile}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <span
              className="font-cinzel font-bold text-sm"
              style={{ color: "#0a0a0a" }}
            >
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--text-primary)" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* mobile menu with FM */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              background: "var(--bg-surface)",
              borderBottom: "1px solid var(--border)",
              overflow: "hidden",
            }}
            className="md:hidden flex flex-col px-6 py-4 gap-4"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  })}
                  className="font-raleway text-sm font-semibold"
                >
                  {link.name}
                </NavLink>
              </motion.div>
            ))}
            <div
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--border)",
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
            >
              <Search size={14} style={{ color: "var(--text-secondary)" }} />
              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "transparent",
                  color: "var(--text-primary)",
                  outline: "none",
                  fontSize: "13px",
                  width: "100%",
                }}
                className="placeholder:text-gray-500 font-raleway"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
