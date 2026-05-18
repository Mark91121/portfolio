"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const pageStyles = `
  

  
  .exp-header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  
  .exp-meta-block {
    text-align: right;
  }
  @media (max-width: 479px) {
    .exp-meta-block {
      text-align: left;
      width: 100%;
    }
  }

  
  .exp-indented {
    margin-left: 50px;
  }
  @media (max-width: 767px) {
    .exp-indented {
      margin-left: 0;
    }
  }

  
  .exp-row-item {
    border-top: 1px solid var(--border);
    padding: 2.25rem 0.75rem;
    margin: 0 -0.75rem;
  }
  @media (max-width: 479px) {
    .exp-row-item {
      padding: 1.5rem 0.5rem;
      margin: 0 -0.5rem;
    }
  }

  
  .edu-row {
    border-top: 1px solid var(--border);
    padding: 2rem 0.75rem;
    margin: 0 -0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
  }
  @media (max-width: 479px) {
    .edu-row {
      padding: 1.5rem 0.5rem;
      margin: 0 -0.5rem;
      flex-direction: column;
      gap: 0.75rem;
    }
  }

  
  .edu-period {
    white-space: nowrap;
  }
  @media (max-width: 479px) {
    .edu-period {
      white-space: normal;
      padding-left: calc(36px + 1rem); 
    }
  }

  
  .exp-page-heading {
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 4rem;
  }
  @media (max-width: 479px) {
    .exp-page-heading {
      margin-bottom: 2.5rem;
    }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    .exp-page-heading {
      margin-bottom: 3rem;
    }
  }

  
  .edu-section {
    margin-top: 5rem;
  }
  @media (max-width: 479px) {
    .edu-section {
      margin-top: 3rem;
    }
  }

  
  .carousel-wrap {
    margin-left: 50px;
    margin-top: 1.25rem;
  }
  @media (max-width: 767px) {
    .carousel-wrap {
      margin-left: 0;
    }
  }

  
  .carousel-main-img {
    width: 200px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border);
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  @media (max-width: 479px) {
    .carousel-main-img {
      width: 100%;
      height: 160px;
    }
  }

  
  .carousel-track {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    overflow: hidden;
    min-width: 0;
  }
  @media (max-width: 479px) {
    .carousel-track {
      flex: 1;
      min-width: 0;
    }
  }

  
  .gallery-arrow-btn {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.15s;
    
  }

  
  .gallery-img-wrapper {
    width: 100%;
    max-height: 78vh;
    object-fit: contain;
    display: block;
  }

  
  .gallery-main-row {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 1.5rem;
    gap: 1rem;
    animation: slideUp 0.25s cubic-bezier(0.16,1,0.3,1) both;
  }

  
  @media (max-width: 767px) {
    
    .gallery-arrow-btn {
      display: none;
    }

    
    .gallery-main-row {
      padding: 0;
      gap: 0;
    }

    
    .gallery-img-wrapper {
      width: 100vw;
      max-height: 75vh;
      object-fit: contain;
    }

    
    .gallery-card-mobile {
      border-radius: 0 !important;
      border-left: none !important;
      border-right: none !important;
    }

    
    .gallery-overlay-prev,
    .gallery-overlay-next {
      display: flex !important;
    }
  }

  
  .gallery-overlay-prev,
  .gallery-overlay-next {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    width: 40px;
    height: 64px;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.32);
    border: none;
    color: rgba(255,255,255,0.85);
    cursor: pointer;
    transition: background 0.2s;
    
  }
  .gallery-overlay-prev {
    left: 0;
    border-radius: 0 8px 8px 0;
  }
  .gallery-overlay-next {
    right: 0;
    border-radius: 8px 0 0 8px;
  }
  .gallery-overlay-prev:hover,
  .gallery-overlay-next:hover {
    background: rgba(0,0,0,0.55);
  }

  
  .gallery-counter-mobile {
    display: none;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 25;
    background: rgba(0,0,0,0.55);
    border-radius: 6px;
    padding: 4px 10px;
    font-family: DM Mono, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: #fff;
  }
  @media (max-width: 767px) {
    .gallery-counter-mobile {
      display: block;
    }
    
    .gallery-counter-desktop {
      display: none;
    }
  }

  
  .exp-desc-text {
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.85;
    max-width: 600px;
    margin-bottom: 1.25rem;
  }
  @media (max-width: 479px) {
    .exp-desc-text {
      font-size: 0.84rem;
    }
  }

  .exp-highlight-text {
    font-size: 0.865rem;
    color: var(--text-secondary);
    line-height: 1.75;
  }
  @media (max-width: 479px) {
    .exp-highlight-text {
      font-size: 0.82rem;
    }
  }

  

  
  .exp-page-inner {
    padding-top: 4rem;
    padding-bottom: 6rem;
  }
  @media (max-width: 479px) {
    .exp-page-inner {
      padding-top: 2.5rem;
      padding-bottom: 4rem;
    }
  }
`;

const IconGrad = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const IconChevronLeft = () => (
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
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight = () => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconExpand = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const IconArrowLeft = () => (
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
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconImages = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

interface GalleryState {
  companyKey: string;
  images: { label: string; src?: string }[];
  role: string;
  period: string;
  startIndex: number;
}

function ExperienceImage({
  src,
  seed,
  label,
  index,
}: {
  src?: string;
  seed: string;
  label: string;
  index: number;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }
  return <PlaceholderImage seed={seed} label={label} index={index} />;
}

function PlaceholderImage({
  seed,
  label,
  index,
}: {
  seed: string;
  label: string;
  index: number;
}) {
  const palettes = [
    ["#e8ddd0", "#c4a882", "#8b6f47"],
    ["#d4dce8", "#8fa8c8", "#4a6fa5"],
    ["#d8e8d4", "#8fc48a", "#4a8a4f"],
    ["#e8d4dc", "#c88fa8", "#a54a70"],
    ["#e8e4d4", "#c4ba82", "#8b7a3a"],
    ["#d4e8e8", "#82c4c4", "#3a8a8a"],
  ];
  const palette = palettes[(seed.charCodeAt(0) + index) % palettes.length];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 60%, ${palette[2]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconImages />
      </div>
      <span
        style={{
          fontSize: "0.65rem",
          fontFamily: "DM Mono, monospace",
          color: palette[2],
          letterSpacing: "0.06em",
          opacity: 0.8,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function GalleryPage({
  gallery,
  onBack,
}: {
  gallery: GalleryState;
  onBack: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(gallery.startIndex);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const prev = useCallback(() => {
    setActiveIdx(
      (c) => (c - 1 + gallery.images.length) % gallery.images.length,
    );
  }, [gallery.images.length]);

  const next = useCallback(() => {
    setActiveIdx((c) => (c + 1) % gallery.images.length);
  }, [gallery.images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onBack]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        background: "rgba(15, 15, 13, 0.95)",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.2s ease both",
      }}
    >
      <button
        onClick={onBack}
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
          transition: "background 0.2s, color 0.2s",
          zIndex: 30,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.2)";
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.1)";
          (e.currentTarget as HTMLButtonElement).style.color =
            "rgba(255,255,255,0.75)";
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div
        key={`mob-counter-${activeIdx}`}
        className="gallery-counter-mobile"
        style={{ animation: "fadeIn 0.18s ease both" }}
      >
        {activeIdx + 1} / {gallery.images.length}
      </div>

      <button
        className="gallery-overlay-prev"
        onClick={prev}
        aria-label="Previous"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="gallery-overlay-next" onClick={next} aria-label="Next">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="gallery-main-row">
        <button
          onClick={prev}
          className="gallery-arrow-btn"
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(255,255,255,0.18)";
            b.style.color = "#fff";
            b.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(255,255,255,0.08)";
            b.style.color = "rgba(255,255,255,0.7)";
            b.style.transform = "scale(1)";
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
          style={{
            flex: 1,
            minWidth: 0,
            maxWidth: "860px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            key={activeIdx}
            className="gallery-card-mobile"
            style={{
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
              animation: "fadeIn 0.18s ease both",
              background: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {gallery.images[activeIdx].src ? (
              <img
                src={gallery.images[activeIdx].src}
                alt={gallery.images[activeIdx].label}
                className="gallery-img-wrapper"
              />
            ) : (
              <div style={{ width: "100%", aspectRatio: "4 / 3" }}>
                <ExperienceImage
                  src={undefined}
                  seed={gallery.companyKey}
                  label={gallery.images[activeIdx].label}
                  index={activeIdx}
                />
              </div>
            )}
          </div>

          <div
            key={`cap-${activeIdx}`}
            className="gallery-counter-desktop"
            style={{
              marginTop: "1rem",
              textAlign: "center",
              animation: "fadeIn 0.2s ease both",
            }}
          >
            <p
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {activeIdx + 1} / {gallery.images.length}
            </p>
          </div>
        </div>

        <button
          onClick={next}
          className="gallery-arrow-btn"
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(255,255,255,0.18)";
            b.style.color = "#fff";
            b.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(255,255,255,0.08)";
            b.style.color = "rgba(255,255,255,0.7)";
            b.style.transform = "scale(1)";
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

function ExperienceCarousel({
  images,
  companyKey,
  onExpand,
}: {
  images: { label: string; src?: string }[];
  companyKey: string;
  onExpand: (startIndex: number) => void;
}) {
  const [current, setCurrent] = useState(0);

  const arrowBtn: React.CSSProperties = {
    width: "26px",
    height: "26px",
    minWidth: "26px",
    minHeight: "26px",
    borderRadius: "50%",
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    color: "var(--text-muted)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    padding: 0,
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s, color 0.2s",
  };

  const onArrowEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = "var(--accent-dim)";
    e.currentTarget.style.color = "var(--accent)";
  };
  const onArrowLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.color = "var(--text-muted)";
  };

  return (
    <div className="carousel-wrap">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          marginBottom: "0.6rem",
        }}
      >
        <span style={{ color: "var(--text-muted)" }}>
          <IconImages />
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: "0.63rem",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
          }}
        >
          PHOTOS · {images.length}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((c) => (c - 1 + images.length) % images.length);
          }}
          style={{ ...arrowBtn }}
          onMouseEnter={onArrowEnter}
          onMouseLeave={onArrowLeave}
        >
          <IconChevronLeft />
        </button>

        <div className="carousel-track">
          <div
            className="carousel-main-img"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--border-accent)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "var(--shadow-sm)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--border)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
            onClick={() => onExpand(current)}
          >
            <ExperienceImage
              src={images[current].src}
              seed={companyKey}
              label={images[current].label}
              index={current}
            />

            <div
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(4px)",
                borderRadius: "5px",
                padding: "3px 7px",
                color: "#fff",
              }}
            >
              <IconExpand />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                VIEW ALL
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "6px",
                left: "6px",
                background: "rgba(0,0,0,0.4)",
                borderRadius: "4px",
                padding: "1px 6px",
                fontFamily: "DM Mono, monospace",
                fontSize: "0.6rem",
                color: "#fff",
                letterSpacing: "0.06em",
                backdropFilter: "blur(4px)",
              }}
            >
              {current + 1} / {images.length}
            </div>
          </div>

          {images.map((img, idx) => {
            if (idx === current) return null;
            return (
              <div
                key={idx}
                onClick={() => setCurrent(idx)}
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "7px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  flexShrink: 0,
                  opacity: 0.7,
                  transition: "opacity 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = "1";
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--accent-dim)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = "0.7";
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--border)";
                }}
              >
                <ExperienceImage
                  src={img.src}
                  seed={companyKey}
                  label={img.label}
                  index={idx}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((c) => (c + 1) % images.length);
          }}
          style={{ ...arrowBtn }}
          onMouseEnter={onArrowEnter}
          onMouseLeave={onArrowLeave}
        >
          <IconChevronRight />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.3rem",
          marginTop: "0.6rem",
          paddingLeft: "34px",
        }}
      >
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: idx === current ? "16px" : "5px",
              height: "5px",
              borderRadius: "3px",
              background:
                idx === current ? "var(--accent)" : "var(--border-hover)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.25s ease, background 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const experience = [
  {
    company: "NEECO II - AREA 2 Main Office",
    role: "OJT Intern",
    period: "January 2026",
    location: "San Leonardo NE",
    desc: "Completed an on-the-job training program at NEECO II - AREA 2 Main Office under the CITET Department, contributing as a full-stack developer, IT support specialist, and network technician. Supported the development of an internal web application for company employees while maintaining day-to-day IT operations across the organization.",
    highlights: [
      "Developed a new internal web application designed to streamline workflows for company employees.",
      "Provided hands-on IT support by diagnosing and resolving technical issues reported across departments.",
      "Performed basic networking tasks, including cable management, configuration, and hardware maintenance within the company.",
      "Assisted in the setup and maintenance of the CCTV surveillance system.",
      "Handled data encoding and document processing tasks using Microsoft Office and the company's own software.",
    ],
    tags: [
      "Full-Stack Development",
      "IT Support",
      "Networking",
      "Microsoft Office",
    ],
    images: [
      { label: "NEECO", src: "/../images/experience/image1.jpg" },
      { label: "Intern", src: "/../images/experience/image2.jpg" },
      { label: "Coding", src: "/../images/experience/image3.jpg" },
      { label: "Monitoring Room", src: "/../images/experience/image4.jpg" },
    ],
  },
  {
    company: "Holy Cross College",
    role: "Technical Support",
    period: "2024 - 2025",
    location: "Sta. Rosa NE",
    desc: "As an officer of The Coders' Society, volunteered as election technical support for both the Student Government Officers (SGO) and Pupil Government Officers (PGO) elections at Holy Cross College Sta. Rosa. Guided voters on how to use the electronic voting system, monitored the process in real time, and resolved technical issues to ensure a smooth, reliable, and orderly election experience.",
    highlights: [
      "Assisted students and pupils in navigating the electronic voting software used to collect and process votes.",
      "Identified and resolved technical issues on-site to prevent disruptions during the voting process.",
      "Ensured the integrity and accuracy of the voting system throughout both election events.",
      "Coordinated with fellow officers to maintain an organized and efficient voting environment.",
      "Provided tech guidance to elementary students during the PGO election, adapting communication for younger users.",
    ],
    tags: [
      "Technical Support",
      "Hardware & Software Troubleshooting",
      "Basic Networking",
      "Computer Setup and Configuration",
      "Communication Skills",
    ],
    images: [
      { label: "Technical Support", src: "/../images/experience/image5.jpg" },
      { label: "Technical Support", src: "/../images/experience/image6.jpg" },
      { label: "Technical Support", src: "/../images/experience/image7.jpg" },
      { label: "Technical Support", src: "/../images/experience/image8.jpg" },
      { label: "Technical Support", src: "/../images/experience/image9.jpg" },
      { label: "Technical Support", src: "/../images/experience/image10.jpg" },
      { label: "Technical Support", src: "/../images/experience/image11.jpg" },
      { label: "Technical Support", src: "/../images/experience/image12.jpg" },
    ],
  },
];

const education = [
  {
    school: "Holy Cross College Sta. Rosa, Nueva Ecija, Inc.",
    degree: "B.S. Computer Science",
    period: "2022 — 2026",
    note: "Fresh graduate. Focused on growth, learning new things, and software engineering.",
  },
];

export default function Experience() {
  const [gallery, setGallery] = useState<GalleryState | null>(null);

  const openGallery = (
    exp: (typeof experience)[number],
    startIndex: number,
  ) => {
    setGallery({
      companyKey: exp.company,
      images: exp.images,
      role: exp.role,
      period: exp.period,
      startIndex,
    });
  };

  const closeGallery = () => {
    setGallery(null);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      {gallery && <GalleryPage gallery={gallery} onBack={closeGallery} />}

      <div style={{ minHeight: "100vh" }}>
        <div className="page-container exp-page-inner">
          <p
            className="animate-fade-up font-mono"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              color: "var(--text-muted)",
              marginBottom: "0.75rem",
            }}
          >
            — EXPERIENCE
          </p>

          <h1 className="font-display animate-fade-up delay-100 exp-page-heading">
            Experience History
          </h1>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((e, i) => (
              <div
                key={`${e.company}-${i}`}
                className={`row-hover animate-fade-up delay-${(i + 1) * 100} exp-row-item`}
              >
                <div className="exp-header-row">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div className="num-circle">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p
                        className="font-mono"
                        style={{
                          fontSize: "0.66rem",
                          letterSpacing: "0.1em",
                          color: "var(--text-muted)",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {e.company}
                      </p>
                      <h2
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 400,
                          color: "var(--text-primary)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {e.role}
                      </h2>
                    </div>
                  </div>

                  <div className="exp-meta-block">
                    <p
                      className="font-mono"
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-secondary)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {e.period}
                    </p>
                    <p
                      className="font-mono"
                      style={{
                        fontSize: "0.66rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.04em",
                        marginTop: "0.2rem",
                      }}
                    >
                      {e.location}
                    </p>
                  </div>
                </div>

                <p className="exp-desc-text exp-indented">{e.desc}</p>

                <div
                  className="exp-indented"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {e.highlights.map((h) => (
                    <div
                      key={h}
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "var(--accent-dim)",
                          marginTop: "0.55rem",
                          flexShrink: 0,
                        }}
                      />
                      <span className="exp-highlight-text">{h}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="exp-indented"
                  style={{
                    display: "flex",
                    gap: "0.35rem",
                    flexWrap: "wrap",
                    marginBottom: "0.25rem",
                  }}
                >
                  {e.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>

                <ExperienceCarousel
                  images={e.images}
                  companyKey={e.company}
                  onExpand={(startIndex) => openGallery(e, startIndex)}
                />
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>

          <div className="edu-section">
            <div className="section-line animate-fade-up">
              <span
                className="font-mono"
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.16em",
                  color: "var(--text-muted)",
                }}
              >
                EDUCATION
              </span>
            </div>

            {education.map((e) => (
              <div
                key={e.school}
                className="row-hover animate-fade-up delay-100 edu-row"
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "var(--green-bg)",
                      border: "1px solid rgba(74,222,128,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--green)",
                      flexShrink: 0,
                    }}
                  >
                    <IconGrad />
                  </div>
                  <div>
                    <p
                      className="font-mono"
                      style={{
                        fontSize: "0.66rem",
                        letterSpacing: "0.1em",
                        color: "var(--text-muted)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {e.school}
                    </p>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 400,
                        color: "var(--text-primary)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {e.degree}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {e.note}
                    </p>
                  </div>
                </div>

                <span
                  className="font-mono edu-period"
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {e.period}
                </span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>
      </div>
    </>
  );
}
