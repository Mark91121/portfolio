"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const IconArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);
const IconMessage = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconClose = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSend = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm Mark's assistant. Ask me anything about his work, skills, or experience.",
    },
  ]);
  const [input, setInput] = useState("");

  const quickReplies = ["View projects", "Download CV", "Get in touch"];

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { from: "user", text };
    const botReply = getBotReply(text);
    setMessages((m) => [...m, userMsg, { from: "bot", text: botReply }]);
    setInput("");
  };

  const getBotReply = (q: string): string => {
    const lq = q.toLowerCase();
    if (lq.includes("project"))
      return "Mark has built 5 notable projects ranging from SaaS platforms to CLI tools. Check the Projects page for details!";
    if (lq.includes("cv") || lq.includes("resume") || lq.includes("download"))
      return "You can download Mark's CV using the button on the home page, or I can direct you there!";
    if (lq.includes("contact") || lq.includes("touch") || lq.includes("email"))
      return "Head to the Contact page to reach out — or drop an email at mark.manalo911211@gmail.com.";
    if (lq.includes("skill") || lq.includes("stack") || lq.includes("tech"))
      return "Mark works across the full stack: Next.js, TypeScript, Python, PostgreSQL, Redis, and more.";
    if (lq.includes("experience") || lq.includes("work"))
      return "Mark has experience as a Senior SWE at TechCorp, a Fullstack Engineer at StartupXYZ, and did freelance work before that.";
    return "Great question! For more details, feel free to browse the site or reach out via the Contact page.";
  };

  return (
    <div className="chatbot-bubble">
      <div className={`chatbot-panel ${open ? "open" : ""}`}>
        <div className="chatbot-header">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--accent-glow)",
              border: "1px solid var(--border-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              fontSize: "0.7rem",
              fontFamily: "'DM Mono',monospace",
              fontWeight: 500,
            }}
          >
            MM
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--text-primary)",
                fontWeight: 500,
              }}
            >
              Mark's Assistant
            </p>
            <p
              style={{
                fontSize: "0.68rem",
                color: "var(--green)",
                fontFamily: "'DM Mono',monospace",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                }}
              />
              Online
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: 4,
            }}
          >
            <IconClose />
          </button>
        </div>

        <div className="chatbot-messages" id="chat-msgs">
          {messages.map((m, i) => (
            <div key={i} className={m.from === "bot" ? "msg-bot" : "msg-user"}>
              {m.text}
            </div>
          ))}
        </div>

        {messages.length <= 2 && (
          <div
            style={{
              padding: "0.5rem 1rem 0.75rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
            }}
          >
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  borderRadius: "6px",
                  padding: "0.3rem 0.7rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-dim)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="chatbot-input-row">
          <input
            className="chatbot-input"
            placeholder="Ask me anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
          />
          <button className="chatbot-send" onClick={() => send(input)}>
            <IconSend />
          </button>
        </div>
      </div>

      <button
        className="chatbot-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
      >
        {open ? <IconClose /> : <IconMessage />}
      </button>
    </div>
  );
}

const galleryImages = [
  { src: "/images/gallery/image0.jpg", alt: "Gallery photo 0" },
  { src: "/images/gallery/image1.jpg", alt: "Gallery photo 1" },
  { src: "/images/gallery/image2.jpg", alt: "Gallery photo 2" },
  { src: "/images/gallery/image3.jpg", alt: "Gallery photo 3" },
  { src: "/images/gallery/image4.jpg", alt: "Gallery photo 4" },
  { src: "/images/gallery/image5.jpg", alt: "Gallery photo 5" },
  { src: "/images/gallery/image6.jpeg", alt: "Gallery photo 6" },
  { src: "/images/gallery/image7.jpg", alt: "Gallery photo 7" },
  { src: "/images/gallery/image8.jpg", alt: "Gallery photo 8" },
  { src: "/images/gallery/image9.jpg", alt: "Gallery photo 9" },
  { src: "/images/gallery/image66.jpg", alt: "Gallery photo 6" },
];

function GalleryLightbox({
  index,
  onClose,
}: {
  index: number;
  onClose: () => void;
}) {
  const [active, setActive] = useState(index);
  const total = galleryImages.length;

  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const scrollY = window.scrollY;

    const style = document.createElement("style");
    style.id = "__lightbox_lock__";
    style.textContent = `
      html.__lb_lock__, html.__lb_lock__ body {
        overflow: hidden !important;
        overscroll-behavior: none !important;
      }
      html.__lb_lock__ body {
        touch-action: none !important;
      }
    `;
    document.head.appendChild(style);
    html.classList.add("__lb_lock__");
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const preventTouch = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.closest?.("[data-lightbox]")) return;
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      html.classList.remove("__lb_lock__");
      document.getElementById("__lightbox_lock__")?.remove();
      body.style.paddingRight = "";
      document.removeEventListener("touchmove", preventTouch);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  return (
    <div
      data-lightbox="true"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        background: "rgba(15,15,13,0.95)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        animation: "fadeIn 0.2s ease both",
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close image"
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 30,
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.background = "rgba(255,255,255,0.2)";
          b.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.background = "rgba(255,255,255,0.1)";
          b.style.color = "rgba(255,255,255,0.75)";
        }}
      >
        <IconClose />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 8px",
          animation: "slideUp 0.25s cubic-bezier(0.16,1,0.3,1) both",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s, transform 0.15s",
            zIndex: 10,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(255,255,255,0.18)";
            b.style.color = "#fff";
            b.style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(255,255,255,0.08)";
            b.style.color = "rgba(255,255,255,0.7)";
            b.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          key={active}
          style={{
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
            animation: "fadeIn 0.18s ease both",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={galleryImages[active].src}
            alt={galleryImages[active].alt}
            width={1200}
            height={900}
            style={{
              width: "100%",
              maxHeight: "85vh",
              objectFit: "contain",
              display: "block",
            }}
            sizes="(max-width: 768px) 98vw, 95vw"
          />
        </div>

        <div
          key={`cap-${active}`}
          style={{ marginTop: "1rem", animation: "fadeIn 0.2s ease both" }}
        >
          <p
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {active + 1} / {total}
          </p>
        </div>

        <button
          onClick={next}
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s, transform 0.15s",
            zIndex: 10,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(255,255,255,0.18)";
            b.style.color = "#fff";
            b.style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(255,255,255,0.08)";
            b.style.color = "rgba(255,255,255,0.7)";
            b.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function GalleryCarousel({
  onOpenLightbox,
}: {
  onOpenLightbox: (i: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const total = galleryImages.length;

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 480) setVisibleCount(1);
      else if (window.innerWidth < 768) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = total - visibleCount;

  const prev = useCallback(() => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  }, [maxIndex]);

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const btn = nextBtnRef.current;
    if (!btn) return;
    btn.addEventListener("click", next, { capture: true });
    return () => btn.removeEventListener("click", next, { capture: true });
  }, [next]);

  useEffect(() => {
    const btn = prevBtnRef.current;
    if (!btn) return;
    btn.addEventListener("click", prev, { capture: true });
    return () => btn.removeEventListener("click", prev, { capture: true });
  }, [prev]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navBtn = (side: "left" | "right"): React.CSSProperties =>
    isMobile
      ? {
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-secondary)",
          boxShadow: "var(--shadow-md)",
          transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s",
          position: "absolute",
          top: "50%",
          [side]: "10px",
          transform: "translateY(-50%)",
          zIndex: 10,
          isolation: "isolate",
          touchAction: "manipulation",
        }
      : {
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-secondary)",
          boxShadow: "var(--shadow-md)",
          transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s",
          position: "absolute",
          top: "50%",
          [side]: 0,
          transform:
            side === "left" ? "translate(-50%, -50%)" : "translate(50%, -50%)",
          zIndex: 10,
          isolation: "isolate",
          touchAction: "manipulation",
        };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: visibleCount === 1 ? "0" : "0.75rem",
              transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
              transform:
                visibleCount === 1
                  ? `translateX(calc(${current} * -100%))`
                  : `translateX(calc(${current} * (-100% / ${visibleCount} - 0.25rem)))`,
              pointerEvents: "auto",
            }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                onClick={() => onOpenLightbox(i)}
                style={{
                  flexShrink: 0,
                  width:
                    visibleCount === 1
                      ? "100%"
                      : `calc(100% / ${visibleCount} - ${((visibleCount - 1) * 0.75) / visibleCount}rem)`,
                  aspectRatio: "4/3",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  cursor: "zoom-in",
                  position: "relative",
                  background: "var(--bg-secondary)",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                  zIndex: 1,
                  pointerEvents: "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 480px) 90vw, (max-width: 768px) 45vw, 30vw"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0)",
                    transition: "background 0.2s",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          ref={prevBtnRef}
          aria-label="Previous"
          style={navBtn("left")}
          onClick={prev}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-dim)";
            e.currentTarget.style.color = "var(--accent)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          ref={nextBtnRef}
          aria-label="Next"
          style={navBtn("right")}
          onClick={next}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-dim)";
            e.currentTarget.style.color = "var(--accent)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.4rem",
          marginTop: "1.25rem",
        }}
      >
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: current === i ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background:
                current === i ? "var(--accent)" : "var(--border-hover)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s, background 0.3s",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

export default function Home() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      {lightbox !== null && (
        <GalleryLightbox index={lightbox} onClose={() => setLightbox(null)} />
      )}
      <div style={{ minHeight: "100vh" }}>
        <section
          style={{
            paddingTop: "clamp(3rem, 6vw, 5rem)",
            paddingBottom: "clamp(3rem, 6vw, 5rem)",
            position: "relative",
          }}
        >
          <div className="hero-glow" />

          <div
            className="page-container"
            style={{ position: "relative", zIndex: 0 }}
          >
            <div className="hero-layout">
              {}
              <div className="animate-fade-in delay-300 hero-photo-col">
                <div className="hero-photo-ring">
                  <Image
                    src="/images/profile.jpg"
                    alt="Mark Manalo"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    sizes="(max-width: 480px) 320px, (max-width: 767px) 360px, (max-width: 1023px) 340px, 400px"
                  />
                </div>

                <div className="animate-float hero-badge">
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "6px",
                      background: "var(--green-bg)",
                      border: "1px solid rgba(74,222,128,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--green)",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.62rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      B.S. Computer Science
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.72rem",
                        color: "var(--accent)",
                        fontWeight: 500,
                      }}
                    >
                      Class of 2026
                    </p>
                  </div>
                </div>
              </div>

              <div className="hero-text">
                <div
                  className="animate-fade-up badge-live"
                  style={{ display: "inline-flex", marginBottom: "1.5rem" }}
                >
                  Open to opportunities
                </div>

                <h1
                  className="font-display animate-fade-up delay-100"
                  style={{
                    fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    marginBottom: "1rem",
                  }}
                >
                  Mark Manalo
                </h1>

                <p
                  className="animate-fade-up delay-200"
                  style={{
                    fontSize: "clamp(0.95rem, 2.5vw, 1.35rem)",
                    color: "var(--text-secondary)",
                    marginBottom: "1.5rem",
                    fontWeight: 300,
                    letterSpacing: "0.01em",
                  }}
                >
                  Fresh CS Graduate &amp;{" "}
                  <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                    Aspiring Software Engineer
                  </span>
                </p>

                <p
                  className="animate-fade-up delay-300"
                  style={{
                    fontSize: "clamp(0.875rem, 1.5vw, 0.95rem)",
                    color: "var(--text-secondary)",
                    maxWidth: "500px",
                    lineHeight: 1.85,
                    marginBottom: "2rem",
                  }}
                >
                  I'm a Computer Science graduate with a passion for building
                  clean, functional software experiences. I specialize in
                  full-stack development, and I'm actively looking for
                  opportunities where I can contribute, grow, and turn ideas
                  into real products.
                </p>

                <div
                  className="animate-fade-up delay-400 hero-cta"
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    marginBottom: "2rem",
                  }}
                >
                  <Link href="/projects" className="btn-primary">
                    View My Work <IconArrow />
                  </Link>
                </div>

                <div
                  className="animate-fade-up delay-500 hero-social"
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href="https://github.com/Mark91121"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="GitHub"
                  >
                    <IconGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mark-manalo-552435409/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="LinkedIn"
                  >
                    <IconLinkedIn />
                  </a>
                  <a
                    href="https://www.facebook.com/mark.lapuzmanalo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Facebook"
                  >
                    <IconFacebook />
                  </a>
                  <span
                    style={{
                      width: 1,
                      height: 20,
                      background: "var(--border)",
                      margin: "0 0.25rem",
                    }}
                  />
                  <a
                    href="mailto:mark.manalo911211@gmail.com"
                    className="highlight-link"
                  >
                    mark.manalo911211@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
          <div className="page-container">
            <div className="section-line animate-fade-up">
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  color: "var(--text-muted)",
                }}
              >
                GALLERY
              </span>
            </div>
            <GalleryCarousel onOpenLightbox={setLightbox} />
          </div>
        </section>
      </div>

      <Chatbot />
    </>
  );
}
