import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/useAuthStore";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Profile", to: "/profile" },
];

function AppNavbar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-30">
      <nav
        className="mx-auto max-w-7xl rounded-2xl border border-white/10 px-4 py-2.5 shadow-2xl backdrop-blur-xl sm:px-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,17,23,0.92) 0%, rgba(15,23,42,0.92) 50%, rgba(30,27,75,0.92) 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/home"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white drop-shadow-sm"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-extrabold"
              style={{ background: "#8B5CF6" }}
            >
              R
            </span>
            React App
          </Link>

          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/15 hover:text-white"
              >
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="ml-2 rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div ref={menuRef} className="relative sm:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className={`h-5 w-5 transition-transform duration-200 ${isMenuOpen ? "rotate-90 scale-90" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 z-20 mt-3 w-52 overflow-hidden rounded-2xl bg-white py-1.5 shadow-2xl ring-1 ring-slate-200/80">
                {navLinks.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeMenu}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    {label}
                  </Link>
                ))}
                <div className="my-1 border-t border-slate-100" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AppNavbar;
