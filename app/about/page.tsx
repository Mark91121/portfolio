import Image from "next/image";
import Link from "next/link";

const IconArrow = () => (
  <svg
    width="13"
    height="13"
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
const IconMapPin = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconBriefcase = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
);
const IconCal = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const skills = {
  Frontend: ["JavaScript", "Next.js", "Tailwind CSS", "React"],
  Backend: ["PHP", "Node.js", "MySQL", "REST API's"],
  Tools: ["Git", "Github", "Vercel", "VS Code"],
};

const facts = [
  { label: "Based in", value: "Nueva Ecija, PH", icon: <IconMapPin /> },
  { label: "Status", value: "Open to work", icon: <IconBriefcase /> },
  { label: "Graduated", value: "2026", icon: <IconCal /> },
];

export default function About() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <style>{`
        

        .about-hero-grid {
          display: flex;
          flex-direction: column; 
          gap: 2rem;
          margin-bottom: 3.5rem;
        }

        
        .about-photo-col {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          order: -1; 
        }

        .about-photo-wrap {
          width: 100%;
          max-width: 320px;
          aspect-ratio: 3/4;
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          position: relative;
        }

        .about-photo-caption {
          font-family: "DM Mono", monospace;
          font-size: 0.66rem;
          color: var(--text-muted);
          margin-top: 0.75rem;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        
        .about-text-col {
          width: 100%;
          text-align: center;
        }

        .about-text-col h1 {
          font-size: clamp(1.9rem, 7vw, 3.4rem);
          line-height: 1.06;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .about-body-text {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          max-width: 100%;
        }

        .about-body-text p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.9;
        }

        
        .about-facts {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-top: 2rem;
          justify-content: center;
        }

        
        .about-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 2rem;
        }

        
        .animate-fade-up,
        .animate-fade-in {
          animation-fill-mode: both !important;
          animation-iteration-count: 1 !important;
        }

        
        .cta-strip {
          transition: background 0.25s ease, border-color 0.25s ease,
            box-shadow 0.25s ease, color 0.25s ease !important;
        }

        
        @keyframes ctaFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .cta-strip-visible {
          animation: ctaFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
          animation-iteration-count: 1;
        }

        
        @media (min-width: 480px) {
          .about-photo-wrap {
            max-width: 280px;
          }
        }

        
        @media (min-width: 768px) {
          .about-hero-grid {
            display: grid;
            grid-template-columns: 1fr 240px;
            gap: 3.5rem;
            align-items: flex-start;
            margin-bottom: 5rem;
          }

          .about-photo-col {
            order: 0; 
            align-items: flex-start;
            width: 100%;
          }

          .about-photo-wrap {
            max-width: 100%;
            width: 100%;
          }

          .about-text-col {
            text-align: left;
          }

          .about-facts {
            justify-content: flex-start;
            gap: 2rem;
          }

          .about-body-text {
            max-width: 520px;
          }
        }

        
        @media (min-width: 1024px) {
          .about-hero-grid {
            grid-template-columns: 1fr 260px;
            gap: 4rem;
          }
        }

        
        @media (min-width: 1280px) {
          .about-hero-grid {
            grid-template-columns: 1fr 280px;
          }
        }
      `}</style>

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
          — ABOUT
        </p>

        <div className="about-hero-grid">
          <div className="about-text-col">
            <h1 className="font-display animate-fade-up delay-100">
              Building things
              <br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                that matter.
              </span>
            </h1>

            <div className="about-body-text">
              {[
                "I'm Mark Manalo, a fresh Computer Science graduate from the Philippines passionate about building digital experiences that blend functionality with thoughtful design. From backend logic to frontend polish, I enjoy crafting applications that not only solve problems but also feel good to interact with.",
                "What started as curiosity became a deep appreciation for the craft of development — the balance between clean code, user experience, and visual detail. Whether I'm designing systems, refining interfaces, or experimenting with new technologies, I'm always driven by the idea of building something genuinely useful.",
                "Outside the screen, I spend my time reading books, watching podcasts, documentaries, and films that expand the way I think and create. I'm especially fascinated by science and space exploration — subjects that constantly inspire my curiosity, creativity, and perspective on technology.",
              ].map((text, i) => (
                <p key={i} className={`animate-fade-up delay-${(i + 2) * 100}`}>
                  {text}
                </p>
              ))}
            </div>

            <div className="about-facts animate-fade-up delay-500">
              {facts.map((f) => (
                <div key={f.label}>
                  <p
                    className="font-mono"
                    style={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {f.label.toUpperCase()}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-primary)",
                      fontWeight: 400,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <span style={{ color: "var(--accent)" }}>{f.icon}</span>
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-photo-col animate-fade-in delay-300">
            <div className="about-photo-wrap">
              <Image
                src="/images/IMG_9010.JPG"
                alt="Mark Manalo"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <p className="about-photo-caption font-mono">
              <IconMapPin /> Nueva Ecija, Philippines
            </p>
          </div>
        </div>

        <div
          style={{ borderTop: "1px solid var(--border)", marginBottom: "4rem" }}
        />

        <div className="animate-fade-up delay-200">
          <div className="section-line">
            <span
              className="font-mono"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.16em",
                color: "var(--text-muted)",
              }}
            >
              TECH STACK
            </span>
          </div>

          <div className="about-skills-grid">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <p
                  className="font-mono"
                  style={{
                    fontSize: "0.66rem",
                    letterSpacing: "0.14em",
                    color: "var(--accent-dim)",
                    fontWeight: 500,
                    marginBottom: "1.1rem",
                  }}
                >
                  {cat.toUpperCase()}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.55rem",
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={item}
                      className="skill-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div className="skill-dot" />
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-secondary)",
                          transition: "color 0.2s",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-strip cta-strip-visible">
          <div>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "0.3rem",
              }}
            >
              Want to work together?
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              I&apos;m actively looking for my first full-time role or freelance
              projects.
            </p>
          </div>
          <Link href="/contact" className="btn-primary">
            Get in Touch <IconArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
