"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

const IconExternal = () => (
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
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);
const IconGithub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconChevronLeft = () => (
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
);
const IconChevronRight = () => (
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
);
const IconClose = () => (
  <svg
    width="20"
    height="20"
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
const IconExpand = () => (
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
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const IconStar = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

interface TechStackGroup {
  label: string;
  items: string[];
}

interface Project {
  number: string;
  name: string;
  desc: string;
  images: ProjectImage[];
  tags: string[];
  techStack?: TechStackGroup[];
  live?: string;
  github?: string;
  year: string;
  status: "Live" | "OSS" | "WIP";
  category: string;
  featured?: boolean;
  featuredLabel?: string;
  fullWidth?: boolean;
}

const projects: Project[] = [
  {
    number: "01",
    name: "360° Interactive Viewing and Management System for BellaVita Subdivision",
    desc: "Led and single-handedly engineered a full-stack web application for a thesis project, serving as both team leader and sole developer. Built a comprehensive Subdivision Management System designed to digitize and automate manual operations, eliminate repetitive administrative tasks, and streamline communication between potential clients, homeowners and administrators.\n\nIntegrated an immersive 360° virtual tour feature, enabling potential clients to remotely explore the model house, streets, and amenities — empowering the subdivision to expand its reach and attract more prospective buyers through technology-driven marketing.",
    featured: true,
    featuredLabel: "Flagship Project",
    images: [
      {
        src: "/../images/projects/p1_landing_page.png",
        alt: "Landing Page",
        caption:
          "Landing page — designed to attract and engage prospective homeowners — showcasing properties, amenities, send inquiry and an immersive virtual tour to convert visitors into clients.",
      },
      {
        src: "/../images/projects/p1_dashboard.png",
        alt: "Dashboard Overview",
        caption:
          "Main analytics dashboard for the project manager to visualize subdivision information and track ongoing activities within the subdivision.",
      },
      {
        src: "/../images/projects/p1_budget.png",
        alt: "Budget Management",
        caption:
          "Budget module — track subdivision expenses, allocations, and financial summaries.",
      },
      {
        src: "/../images/projects/p1_billing_notices.png",
        alt: "Quarterly Billing",
        caption:
          "Billing notices — automated generate of billing statements and payment reminders sent to all eligible homeowners.",
      },
      {
        src: "/../images/projects/p1_review_report.png",
        alt: "Review Reported Issues",
        caption:
          "Review reported issues and create decisions regarding homeowner's concerns about the subdivision or homeowners.",
      },
      {
        src: "/../images/projects/p1_realtime_chat.png",
        alt: "Homeowner support chat",
        caption:
          "Real-time chat between homeowners and administrators to address homeowner concerns.",
      },
      {
        src: "/../images/projects/p1_listing.png",
        alt: "Property Listing Management",
        caption:
          "To post available units in the subdivision and attract potential buyers.",
      },
      {
        src: "/../images/projects/p1_submit_billing.png",
        alt: "Submit Billing Proof",
        caption:
          "For homeowners to submit proof of payment for their quarterly HOA fee and to track their paid/unpaid quarters.",
      },
      {
        src: "/../images/projects/p1_visitor_qr.png",
        alt: "Visitor QR",
        caption:
          "To generate QR codes for gate entry for the incoming visitors of homeowners.",
      },
      {
        src: "/../images/projects/p1_qr.png",
        alt: "QR Codes",
        caption: "Manage and track the QR codes created by homeowners.",
      },
      {
        src: "/../images/projects/p1_report_issues.png",
        alt: "Report Issues",
        caption:
          "For homeowners to report issues regarding the subdivision, concerns about fellow homeowners, and other related matters.",
      },
      {
        src: "/../images/projects/p1_chatbot.png",
        alt: "Exclusive AI Chatbot",
        caption:
          "Integrated AI chatbot — specifically designed to answer subdivision-related concerns exclusively for homeowners.",
      },
      {
        src: "/../images/projects/p1_amenities.png",
        alt: "Amenities Reservation",
        caption:
          "For homeowners to reserve available amenities offered by the subdivision and manage their reservations.",
      },
      {
        src: "/../images/projects/p1_report_bugs.png",
        alt: "Report Bugs",
        caption:
          "Bug report — internal tool for flagging and tracking system issues.",
      },
      {
        src: "/../images/projects/p1_account.png",
        alt: "Account Settings",
        caption:
          "Account management — homeowners update profile info and passwords.",
      },
      {
        src: "/../images/projects/p1_scan_qr.png",
        alt: "Scan QR",
        caption:
          "QR scanner — guards scan visitor QR codes at the gate for fast, secure entry verification.",
      },
      {
        src: "/../images/projects/p1_guard_schedule.png",
        alt: "Guard Schedule",
        caption:
          "Guard scheduling — manage shifts, assignments, and duty rosters for security staff.",
      },
      {
        src: "/../images/projects/p1_virtual_tour.png",
        alt: "Virtual Tour",
        caption:
          "360° virtual tour — immersive first-person walkthrough of the subdivision.",
      },
      {
        src: "/../images/projects/p1_house.png",
        alt: "Single Detached House",
        caption:
          "Interior tour view — explore room layouts and finishes before visiting in person.",
      },
      {
        src: "/../images/projects/p1_virtual_tour3.png",
        alt: "Virtual Tour Street",
        caption: "360° virtual tour — street view of the subdivision.",
      },
    ],
    tags: [],
    techStack: [
      { label: "Frontend", items: ["HTML", "Tailwind CSS", "JavaScript"] },
      { label: "Backend", items: ["PHP", "Node.js", "Python"] },
      { label: "Database", items: ["MySQL"] },
      {
        label: "APIs & Integrations",
        items: ["OpenAI API", "SMS API(Semaphore)"],
      },
      { label: "Real-time Communication", items: ["WebSocket"] },
      { label: "Task Scheduling / Automation", items: ["Cron Jobs"] },
      { label: "Virtual Tour", items: ["Marzipano"] },
      {
        label: "Libraries & Tools",
        items: [
          "VS Code",
          "PHPMailer",
          "TCPDF",
          "Endroid",
          "Browsershot",
          "PhpSpreadsheet",
        ],
      },
    ],

    year: "",
    status: "Live",
    category: "Web Application",
  },
  {
    number: "02",
    name: "Web-Based POS, Ordering, and Sales Management System for Kyle’s Snacks House",
    desc: "Developed a full-featured web-based Point of Sale, Ordering, and Sales Management System purpose-built for Kyle's Snacks House to streamline day-to-day retail and ordering operations from the ground up. The system handles end-to-end workflows — from snack product catalog management and real-time inventory tracking to fast, intuitive checkout and order processing.\n\nBuilt to minimize friction at the counter, the POS interface allows cashiers to quickly search products and process transactions with ease. Orders are managed seamlessly alongside walk-in sales, giving staff a unified platform to handle both. Inventory updates automatically on every sale and order fulfillment, giving Kyle's Snacks House owners accurate stock visibility at all times.",
    images: [
      {
        src: "/../images/projects/p2_landing_page.png",
        alt: "Landing Page",
        caption:
          "Landing page — overview of the POS system's core features and interface.",
      },
      {
        src: "/../images/projects/p2_products.png",
        alt: "Product Management",
        caption:
          "Product catalog — manage items, categories, pricing, and product details.",
      },
      {
        src: "/../images/projects/p2_inventory.png",
        alt: "Inventory Tracking",
        caption:
          "Inventory module — real-time stock monitoring with low-stock alerts and history.",
      },
      {
        src: "/../images/projects/p2_pos.png",
        alt: "POS Interface",
        caption:
          "Point of Sale interface — fast and intuitive checkout with transaction processing.",
      },
    ],
    tags: [],
    techStack: [
      { label: "Frontend", items: ["HTML", "Tailwind CSS", "JavaScript"] },
      { label: "Backend", items: ["PHP"] },
      { label: "Database", items: ["MySQL"] },
      { label: "APIs & Integrations", items: ["SMS API(Semaphore)"] },
      {
        label: "Libraries & Tools",
        items: [
          "VS Code",
          "PHPMailer",
          "TCPDF",
          "Browsershot",
          "PhpSpreadsheet",
        ],
      },
    ],

    year: "",
    status: "Live",
    category: "Web Application",
    fullWidth: true,
  },
];

function ImageCarousel({
  images,
  onExpand,
}: {
  images: ProjectImage[];
  onExpand: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const go = useCallback(
    (nextIndex: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(nextIndex);
        setAnimating(false);
      }, 320);
    },
    [animating],
  );

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      go((current - 1 + images.length) % images.length, "left");
    },
    [current, images.length, go],
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      go((current + 1) % images.length, "right");
    },
    [current, images.length, go],
  );

  const goTo = useCallback(
    (i: number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (i === current) return;
      go(i, i > current ? "right" : "left");
    },
    [current, go],
  );

  return (
    <div className="carousel-root">
      <div
        className="carousel-frame"
        onClick={() => onExpand(current)}
        title="Click to expand"
      >
        <div
          className={`carousel-slide-wrap${animating ? (direction === "right" ? " slide-out-left" : " slide-out-right") : ""}`}
        >
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="carousel-img"
          />
        </div>

        <div className="carousel-expand-hint">
          <IconExpand />
          <span>Expand</span>
        </div>

        {images.length > 1 && (
          <div className="carousel-counter-badge font-mono">
            {current + 1} / {images.length}
          </div>
        )}
      </div>

      <p className="carousel-caption font-mono">{images[current].caption}</p>

      {images.length > 1 && (
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={prev} aria-label="Previous">
            <IconChevronLeft />
          </button>

          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === current ? " active" : ""}`}
                onClick={(e) => goTo(i, e)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
          <button className="carousel-btn" onClick={next} aria-label="Next">
            <IconChevronRight />
          </button>
        </div>
      )}

      {images.length > 1 && (
        <div className="carousel-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`carousel-thumb${i === current ? " active" : ""}`}
              onClick={(e) => goTo(i, e)}
            >
              <img src={img.src} alt={img.alt} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: ProjectImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const scrollY = window.scrollY;
    const origBodyOverflow = document.body.style.overflow;
    const origBodyPosition = document.body.style.position;
    const origBodyTop = document.body.style.top;
    const origBodyWidth = document.body.style.width;
    const origHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    const preventTouch = (e: TouchEvent) => {
      const el = e.target as HTMLElement;
      if (el?.closest(".lightbox-inner")) return;
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      document.documentElement.style.overflow = origHtmlOverflow;
      document.body.style.overflow = origBodyOverflow;
      document.body.style.width = origBodyWidth;
      document.body.style.top = origBodyTop;
      document.body.style.position = origBodyPosition;
      window.scrollTo({ top: scrollY, behavior: "instant" });
      document.removeEventListener("touchmove", preventTouch);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        go((current - 1 + images.length) % images.length, "left");
      if (e.key === "ArrowRight") go((current + 1) % images.length, "right");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, images.length]);

  const go = (nextIndex: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(nextIndex);
      setAnimating(false);
    }, 320);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    go((current - 1 + images.length) % images.length, "left");
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    go((current + 1) % images.length, "right");
  };

  return (
    <div className="lightbox-overlay">
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-header">
          <span className="font-mono lightbox-counter">
            {current + 1} / {images.length}
          </span>
          <button
            className="lightbox-close"
            onClick={onClose}
            aria-label="Close"
          >
            <IconClose />
          </button>
        </div>

        <div className="lightbox-img-wrap">
          {images.length > 1 && (
            <button className="lightbox-nav left" onClick={prev}>
              <IconChevronLeft />
            </button>
          )}
          <div
            className={`lightbox-slide-wrap${animating ? (direction === "right" ? " lb-slide-out-left" : " lb-slide-out-right") : ""}`}
          >
            <img
              src={images[current].src}
              alt={images[current].alt}
              className="lightbox-img"
            />
          </div>
          {images.length > 1 && (
            <button className="lightbox-nav right" onClick={next}>
              <IconChevronRight />
            </button>
          )}
        </div>

        <div className="lightbox-caption">
          <p className="lightbox-caption-title">{images[current].alt}</p>
          <p className="lightbox-caption-text">{images[current].caption}</p>
        </div>

        {images.length > 1 && (
          <div
            className="carousel-dots"
            style={{ justifyContent: "center", marginTop: "1rem" }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === current ? " active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(i, i > current ? "right" : "left");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [lightbox, setLightbox] = useState<{
    projectIndex: number;
    imageIndex: number;
  } | null>(null);

  return (
    <>
      <style>{`
        
        .carousel-root {
          margin-bottom: 1.75rem;
        }
        .carousel-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
          cursor: zoom-in;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
        }

        
        .carousel-slide-wrap {
          width: 100%;
          height: 100%;
          transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(0);
          opacity: 1;
        }
        .carousel-slide-wrap.slide-out-left {
          transform: translateX(-40px);
          opacity: 0;
        }
        .carousel-slide-wrap.slide-out-right {
          transform: translateX(40px);
          opacity: 0;
        }

        .carousel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
        }
        .carousel-frame:hover .carousel-img {
          transform: scale(1.025);
        }
        .carousel-expand-hint {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-family: "DM Mono", monospace;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: #fff;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          padding: 0.3rem 0.65rem;
          border-radius: 100px;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s, transform 0.2s;
          pointer-events: none;
        }
        .carousel-frame:hover .carousel-expand-hint {
          opacity: 1;
          transform: translateY(0);
        }
        .carousel-counter-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.85);
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(6px);
          padding: 0.25rem 0.6rem;
          border-radius: 100px;
          pointer-events: none;
        }
        .carousel-caption {
          font-size: 0.68rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          line-height: 1.6;
          margin-top: 0.6rem;
          margin-bottom: 0.75rem;
          padding: 0 0.25rem;
        }
        .carousel-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .carousel-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .carousel-btn:hover {
          border-color: var(--accent-dim);
          color: var(--accent);
          background: var(--accent-glow);
        }
        .carousel-dots {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex: 1;
          justify-content: center;
          flex-wrap: wrap;
        }
        .carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: none;
          background: var(--border-hover);
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, transform 0.2s, width 0.2s;
        }
        .carousel-dot.active {
          background: var(--accent);
          width: 18px;
          border-radius: 100px;
        }
        .carousel-thumbs {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 4px;
          scroll-behavior: smooth;
        }
        .carousel-thumbs::-webkit-scrollbar { height: 2px; }
        .carousel-thumbs::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 1px; }
        .carousel-thumb {
          flex-shrink: 0;
          width: 56px;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          border: 1.5px solid var(--border);
          background: var(--bg-secondary);
          cursor: pointer;
          padding: 0;
          transition: border-color 0.2s, opacity 0.2s;
        }
        .carousel-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .carousel-thumb.active {
          border-color: var(--accent);
        }
        .carousel-thumb:not(.active) {
          opacity: 0.65;
        }
        .carousel-thumb:hover:not(.active) {
          border-color: var(--accent-dim);
          opacity: 1;
        }

        
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(10, 10, 9, 0.92);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
          animation: fadeIn 0.2s ease both;
          overflow: hidden;
          touch-action: none;
        }
        .lightbox-inner {
          width: 100%;
          max-width: 920px;
          max-height: calc(100svh - 2rem);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
          margin: auto;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior: contain;
          touch-action: pan-y;
        }
        .lightbox-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          flex-shrink: 0;
        }
        .lightbox-counter {
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.45);
        }
        .lightbox-close {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .lightbox-close:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
        .lightbox-img-wrap {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          max-height: calc(100svh - 12rem);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        
        .lightbox-slide-wrap {
          width: 100%;
          transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(0);
          opacity: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-slide-wrap.lb-slide-out-left {
          transform: translateX(-50px);
          opacity: 0;
        }
        .lightbox-slide-wrap.lb-slide-out-right {
          transform: translateX(50px);
          opacity: 0;
        }

        .lightbox-img {
          width: 100%;
          height: auto;
          max-height: calc(100svh - 12rem);
          object-fit: contain;
          display: block;
        }
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          z-index: 2;
          flex-shrink: 0;
        }
        .lightbox-nav.left { left: 0.75rem; }
        .lightbox-nav.right { right: 0.75rem; }
        .lightbox-nav:hover {
          background: rgba(0,0,0,0.65);
          color: #fff;
        }
        .lightbox-caption {
          margin-top: 0.75rem;
          text-align: center;
          flex-shrink: 0;
        }
        .lightbox-caption-title {
          font-family: "DM Mono", monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.25rem;
          text-transform: uppercase;
        }
        .lightbox-caption-text {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          max-width: 560px;
          margin: 0 auto;
        }

        
        .featured-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: "DM Mono", monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: #fff;
          background: var(--accent);
          padding: 0.2rem 0.65rem 0.2rem 0.5rem;
          border-radius: 100px;
          text-transform: uppercase;
        }

        
        .project-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg-card);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .project-card:hover {
          border-color: var(--border-accent);
          box-shadow: var(--shadow-md);
        }
        .project-card-body {
          padding: 1.75rem;
        }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .project-meta {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .category-pill {
          font-family: "DM Mono", monospace;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--accent-dim);
          background: var(--accent-glow);
          border: 1px solid rgba(155,111,60,0.18);
          padding: 0.2rem 0.65rem;
          border-radius: 100px;
          text-transform: uppercase;
        }
        .project-links {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .project-title {
          font-size: clamp(1.0rem, 2vw, 1.2rem);
          font-weight: 400;
          color: var(--text-primary);
          letter-spacing: -0.015em;
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }
        .project-title-featured {
          font-size: clamp(1.15rem, 2.2vw, 1.4rem);
        }
        .project-number {
          font-family: "DM Mono", monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        
        @media (min-width: 480px) {
          .projects-grid {
            gap: 1.5rem;
          }
        }

        
        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1.75rem;
          }
          .projects-grid .project-featured,
          .projects-grid .project-fullwidth {
            grid-column: 1 / -1;
          }
        }

        
        @media (min-width: 1024px) {
          .projects-grid {
            gap: 2rem;
          }
        }

        
        
        @media (max-width: 479px) {
          .project-card-body {
            padding: 1.1rem 1rem;
          }
          .project-card > div:first-child {
            padding: 0.85rem 0.85rem 0;
          }
        }

        
        @media (min-width: 480px) and (max-width: 767px) {
          .project-card-body {
            padding: 1.35rem 1.25rem;
          }
        }

        
        
        @media (max-width: 479px) {
          .project-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .project-meta {
            gap: 0.4rem;
          }
        }

        
        .tech-stack-block {
          margin-bottom: 1.25rem;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
        }
        .tech-stack-heading {
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 0.55rem 1rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }
        .tech-stack-rows {
          display: flex;
          flex-direction: column;
        }
        .tech-stack-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.55rem 1rem;
          border-bottom: 1px solid var(--border);
          transition: background 0.15s;
        }
        .tech-stack-row:last-child {
          border-bottom: none;
        }
        .tech-stack-row:hover {
          background: var(--bg-card-hover);
        }
        .tech-stack-label {
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          color: var(--accent-dim);
          white-space: nowrap;
          min-width: 160px;
          padding-top: 0.18rem;
          flex-shrink: 0;
        }
        .tech-stack-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }

        
        @media (max-width: 560px) {
          .tech-stack-label {
            min-width: unset;
            width: 100%;
            font-size: 0.6rem;
          }
          .tech-stack-row {
            flex-direction: column;
            gap: 0.4rem;
            padding: 0.5rem 0.85rem;
          }
          .tech-stack-heading {
            padding: 0.5rem 0.85rem;
          }
        }

        
        .projects-header-row h1 {
          flex: 1;
          text-align: left !important;
        }
        .projects-count {
          flex-shrink: 0;
          margin-left: 1rem;
          align-self: flex-end;
        }

        
        
        @media (max-width: 479px) {
          .carousel-thumb {
            width: 44px;
            height: 32px;
          }
          .carousel-btn {
            width: 28px;
            height: 28px;
          }
          .carousel-caption {
            font-size: 0.64rem;
          }
        }

        
        
        @media (max-width: 600px) {
          .lightbox-overlay {
            padding: 0.5rem;
            align-items: flex-start;
            padding-top: 0.75rem;
          }
          .lightbox-inner {
            max-height: calc(100svh - 1rem);
          }
          .lightbox-nav {
            width: 32px;
            height: 32px;
            border-radius: 8px;
          }
          .lightbox-nav.left { left: 0.3rem; }
          .lightbox-nav.right { right: 0.3rem; }
          .lightbox-caption-text {
            font-size: 0.78rem;
          }
          .lightbox-caption-title {
            font-size: 0.65rem;
          }
          .lightbox-img-wrap {
            max-height: calc(100svh - 10rem);
          }
          .lightbox-img {
            max-height: calc(100svh - 10rem);
          }
        }

        
        @media (max-width: 380px) {
          .lightbox-overlay {
            padding: 0.35rem;
            padding-top: 0.5rem;
          }
          .lightbox-caption-text {
            font-size: 0.72rem;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh" }}>
        <div
          className="page-container"
          style={{ paddingTop: "4rem", paddingBottom: "6rem" }}
        >
          <p
            className="animate-fade-up font-mono"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              color: "var(--text-muted)",
              marginBottom: "0.75rem",
            }}
          >
            — PROJECTS
          </p>

          <div
            className="projects-header-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "1rem",
            }}
          >
            <h1
              className="font-display animate-fade-up delay-100"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                textAlign: "left",
                flex: 1,
              }}
            >
              Selected Work
            </h1>
          </div>

          <p
            className="animate-fade-up delay-200"
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              marginBottom: "3.5rem",
              maxWidth: "440px",
              lineHeight: 1.8,
            }}
          >
            A collection of projects I&apos;ve built — from school projects to
            personal side projects.
          </p>

          <div className="projects-grid">
            {projects.map((p, pi) => (
              <div
                key={p.name}
                className={`project-card animate-fade-up delay-${(pi + 1) * 100}${pi === 0 ? " project-featured" : ""}${p.fullWidth ? " project-fullwidth" : ""}`}
              >
                <div style={{ padding: "1.25rem 1.25rem 0" }}>
                  <ImageCarousel
                    images={p.images}
                    onExpand={(imgIndex) =>
                      setLightbox({ projectIndex: pi, imageIndex: imgIndex })
                    }
                  />
                </div>

                <div className="project-card-body">
                  <div className="project-header">
                    <div>
                      <span className="project-number">{p.number}</span>
                      <h2
                        className={`project-title${p.featured ? " project-title-featured" : ""}`}
                      >
                        {p.name}
                      </h2>
                    </div>
                    <div className="project-meta">
                      {p.featured && p.featuredLabel && (
                        <span className="featured-badge">
                          <IconStar />
                          {p.featuredLabel}
                        </span>
                      )}
                      <span className="category-pill">{p.category}</span>

                      <span
                        className="font-mono"
                        style={{
                          fontSize: "0.68rem",
                          color: "var(--text-muted)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {p.year}
                      </span>
                    </div>
                  </div>

                  {p.desc.includes("\n\n") ? (
                    <div style={{ marginBottom: "1.25rem" }}>
                      {p.desc.split("\n\n").map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.85,
                            marginBottom:
                              i < p.desc.split("\n\n").length - 1
                                ? "0.85rem"
                                : 0,
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.85,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {p.desc}
                    </p>
                  )}

                  {p.techStack ? (
                    <div className="tech-stack-block">
                      <p className="tech-stack-heading font-mono">Tech stack</p>
                      <div className="tech-stack-rows">
                        {p.techStack.map((group) => (
                          <div key={group.label} className="tech-stack-row">
                            <span className="tech-stack-label font-mono">
                              {group.label}
                            </span>
                            <div className="tech-stack-items">
                              {group.items.map((item) => (
                                <span key={item} className="tag">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.35rem",
                        flexWrap: "wrap",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {p.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-links"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={projects[lightbox.projectIndex].images}
          startIndex={lightbox.imageIndex}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
