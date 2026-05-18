"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const ThemePill = ({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) => {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: "52px",
        height: "28px",
        borderRadius: "100px",
        border: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        cursor: "pointer",
        padding: "3px",
        position: "relative",
        transition: "border-color 0.2s, background 0.2s",
        flexShrink: 0,
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        zIndex: 200,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "7px",
          color: isDark ? "var(--text-secondary)" : "var(--accent)",
          display: "flex",
          transition: "color 0.2s",
          zIndex: 201,
          pointerEvents: "none",
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>

      <span
        style={{
          position: "absolute",
          right: "7px",
          color: isDark ? "#ffffff" : "var(--text-muted)",
          display: "flex",
          transition: "color 0.2s",
          zIndex: 201,
          pointerEvents: "none",
        }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </span>

      <span
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "var(--bg-card)",
          border: "1px solid var(--border-hover)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          position: "absolute",
          top: "3px",
          left: isDark ? "27px" : "3px",
          transition: "left 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 202,
          pointerEvents: "none",
        }}
      />
    </button>
  );
};

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{ pointerEvents: "none", overflow: "visible" }}
  >
    <line
      x1="2"
      y1="6"
      x2="16"
      y2="6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{
        transformOrigin: "9px 6px",
        transition:
          "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
        transform: open ? "translateY(3px) rotate(45deg)" : "none",
      }}
    />

    <line
      x1="2"
      y1="9"
      x2="16"
      y2="9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{
        transformOrigin: "9px 9px",
        transition:
          "opacity 0.18s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: open ? 0 : 1,
        transform: open ? "scaleX(0.4)" : "none",
      }}
    />

    <line
      x1="2"
      y1="12"
      x2="16"
      y2="12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{
        transformOrigin: "9px 12px",
        transition:
          "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
        transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
      }}
    />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle: handleToggle } = useTheme();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    handleClose();
  }, [pathname]);

  const handleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setVisible(true);
    requestAnimationFrame(() => setOpen(true));
  };

  const handleClose = () => {
    setOpen(false);
    closeTimer.current = setTimeout(() => setVisible(false), 320);
  };

  const handleBurger = () => {
    if (open) handleClose();
    else handleOpen();
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? "rgba(var(--bg-nav-rgb, 250, 250, 248), 0.97)"
          : "rgba(var(--bg-nav-rgb, 250, 250, 248), 0.85)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.04)" : "none",
        transition:
          "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div
        className="page-container"
        style={{
          display: "flex",
          alignItems: "center",
          height: "68px",
          position: "relative",
          zIndex: 101,
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            marginRight: "auto",
            position: "relative",
            zIndex: 102,
          }}
        >
          <span
            className="font-mono"
            style={{
              color: "var(--accent)",
              fontSize: "0.82rem",
              letterSpacing: "0.12em",
            }}
          >
            Maki<span style={{ color: "var(--text-muted)" }}>.dev</span>
          </span>
        </Link>

        <div
          id="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            position: "relative",
            zIndex: 102,
          }}
        >
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <span
                key={link.href}
                style={{ display: "flex", alignItems: "center" }}
              >
                {i > 0 && (
                  <span
                    className="pipe-sep"
                    style={{ margin: "0 0.65rem", fontSize: "0.65rem" }}
                  >
                    |
                  </span>
                )}
                <Link
                  href={link.href}
                  className="link-underline"
                  style={{
                    textDecoration: "none",
                    fontSize: "0.78rem",
                    letterSpacing: "0.07em",
                    color: active ? "var(--accent)" : "var(--text-secondary)",
                    fontFamily: "'DM Mono', monospace",
                    transition: "color 0.2s",
                    position: "relative",
                  }}
                >
                  {link.label}
                </Link>
              </span>
            );
          })}

          <span
            className="pipe-sep"
            style={{ margin: "0 0.65rem", fontSize: "0.65rem" }}
          >
            |
          </span>
          <ThemePill theme={theme} onToggle={handleToggle} />
        </div>

        <div
          className="mobile-right"
          style={{
            alignItems: "center",
            gap: "0.5rem",
            position: "relative",
            zIndex: 102,
          }}
        >
          <ThemePill theme={theme} onToggle={handleToggle} />

          <button
            onClick={handleBurger}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              cursor: "pointer",

              color: "var(--text-primary, var(--text-secondary))",
              padding: "6px 8px",
              transition: "border-color 0.2s, background 0.2s, color 0.2s",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              minWidth: "44px",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 102,
            }}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {visible && (
        <div
          className="mobile-nav-menu"
          style={{
            background: "rgba(var(--bg-nav-rgb, 250, 250, 248), 0.99)",
            borderBottom: "1px solid var(--border)",
            padding: "1.25rem 1.5rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            position: "relative",
            zIndex: 101,
            overflow: "hidden",

            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-10px)",
            transition:
              "opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClose}
                style={{
                  textDecoration: "none",
                  fontSize: "0.88rem",
                  letterSpacing: "0.08em",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  fontFamily: "'DM Mono', monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",

                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(-6px)",
                  transition: `opacity 0.24s ease ${0.05 + i * 0.04}s, transform 0.24s ease ${0.05 + i * 0.04}s`,
                }}
              >
                {active && (
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        #desktop-nav     { display: flex; }
        .mobile-right    { display: none; }

        @media (min-width: 768px) {
          #desktop-nav  { display: flex !important; }
          .mobile-right { display: none !important; }
        }
        @media (max-width: 767px) {
          #desktop-nav  { display: none !important; }
          .mobile-right { display: flex !important; }
        }

        [data-theme="dark"] nav {
          background: ${
            scrolled ? "rgba(17,17,16,0.97)" : "rgba(17,17,16,0.85)"
          } !important;
        }
        [data-theme="dark"] .mobile-nav-menu {
          background: rgba(17,17,16,0.99) !important;
        }
      `}</style>
    </nav>
  );
}
