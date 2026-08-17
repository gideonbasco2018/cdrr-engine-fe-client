// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user?.username || user?.email || "Guest";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="h-14 shrink-0 border-b border-line bg-surface flex items-center justify-between gap-3 px-6">
      <div className="flex items-center gap-2.5 h-full">
        <img
          src="/images/FDALogo.png"
          alt="FDA"
          className="h-full w-auto object-contain shrink-0 py-1"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink/60 hover:bg-ink/5 transition-colors"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-ink/5 transition-colors"
          >
            <span className="w-7 h-7 rounded-full bg-forest text-cream flex items-center justify-center text-xs font-medium shrink-0">
              {initial}
            </span>
            <span className="text-sm text-ink/80 max-w-[10rem] truncate">
              {displayName}
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-md border border-line bg-surface shadow-lg py-1 z-10">
              <button
                type="button"
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-ink/70 hover:bg-ink/5 transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
