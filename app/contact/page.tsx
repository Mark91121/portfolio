"use client";
import { useState } from "react";
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
const IconMail = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);
const IconLinkedIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconGithub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconFacebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const IconMapPin = () => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconClock = () => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconCheck = () => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const contactLinks = [
  {
    label: "Email",
    value: "mark.manalo911211@gmail.com",
    href: "mailto:mark.manalo911211@gmail.com",
    icon: <IconMail />,
    desc: "Best way to reach me",
  },
  {
    label: "LinkedIn",
    value: "Mark Manalo",
    href: "https://www.linkedin.com/in/mark-manalo-552435409/?skipRedirect=true",
    icon: <IconLinkedIn />,
    desc: "Let's connect professionally",
  },
  {
    label: "GitHub",
    value: "Mark911211",
    href: "https://github.com/Mark91121",
    icon: <IconGithub />,
    desc: "See my open source work",
  },
  {
    label: "Facebook",
    value: "Mark Manalo",
    href: "https://www.facebook.com/mark.lapuzmanalo",
    icon: <IconFacebook />,
    desc: "Connect on Facebook",
  },
  {
    label: "Instagram",
    value: "@its_maki_not_maki",
    href: "https://www.instagram.com/its_maki_not_maki/",
    icon: <IconInstagram />,
    desc: "Follow my updates",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      setFormState("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send message. Please try again.");
      setFormState("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
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
          — CONTACT
        </p>

        <div style={{ marginBottom: "4rem" }}>
          <h1
            className="font-display animate-fade-up delay-100"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
            }}
          >
            Let's work{" "}
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
              together.
            </span>
          </h1>
          <p
            className="animate-fade-up delay-200"
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              maxWidth: "460px",
              lineHeight: 1.85,
            }}
          >
            I'm actively looking for my first full-time role or interesting
            freelance projects. Whether you have an opportunity or just want to
            chat — my inbox is open.
          </p>

          <div
            className="animate-fade-up delay-300"
            style={{
              display: "flex",
              gap: "1.75rem",
              marginTop: "1.75rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <IconMapPin />, text: "Nueva Ecija, PH" },
              { icon: <IconClock />, text: "Replies within 24 hours" },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.04em",
                }}
              >
                <span style={{ color: "var(--accent-dim)" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="contact-page-grid">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <p
              className="font-mono"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                marginBottom: "0.25rem",
              }}
            >
              REACH ME AT
            </p>
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                <span
                  className="contact-card-icon"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    flexShrink: 0,
                    transition:
                      "background 0.2s, border-color 0.2s, color 0.2s",
                  }}
                >
                  {link.icon}
                </span>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      marginBottom: "0.1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.value}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {link.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div>
            <p
              className="font-mono"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              SEND A MESSAGE
            </p>

            {formState === "success" ? (
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
                className="animate-slide-up"
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--green-bg)",
                    border: "1px solid rgba(45,138,78,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--green)",
                  }}
                >
                  <IconCheck />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Message sent!
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    Thanks for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFormState("idle");
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="btn-outline"
                  style={{ marginTop: "0.5rem" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {formState === "error" && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      background: "rgba(220, 38, 38, 0.08)",
                      border: "1px solid rgba(220, 38, 38, 0.2)",
                      borderRadius: "8px",
                      fontSize: "0.82rem",
                      color: "#ef4444",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    ⚠ {errorMsg}
                  </div>
                )}

                <div className="contact-name-email-row">
                  <div>
                    <label className="contact-label" htmlFor="name">
                      NAME
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="contact-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="contact-label" htmlFor="email">
                      EMAIL
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="contact-input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="contact-label" htmlFor="subject">
                    SUBJECT
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="contact-input"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    style={{ appearance: "none", cursor: "pointer" }}
                  >
                    <option value="" disabled>
                      Select a topic…
                    </option>
                    <option value="fulltime">Full-time opportunity</option>
                    <option value="freelance">Freelance project</option>
                    <option value="collab">Collaboration</option>
                    <option value="other">Others</option>
                  </select>
                </div>

                <div>
                  <label className="contact-label" htmlFor="message">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact-input"
                    placeholder="Tell me a bit about your project or what you have in mind…"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={formState === "loading"}
                  style={{
                    justifyContent: "center",
                    opacity: formState === "loading" ? 0.7 : 1,
                    cursor: formState === "loading" ? "not-allowed" : "pointer",
                  }}
                >
                  {formState === "loading" ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ animation: "spin-slow 1s linear infinite" }}
                      >
                        <line x1="12" y1="2" x2="12" y2="6" />
                        <line x1="12" y1="18" x2="12" y2="22" />
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                        <line x1="2" y1="12" x2="6" y2="12" />
                        <line x1="18" y1="12" x2="22" y2="12" />
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message <IconArrow />
                    </>
                  )}
                </button>

                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    textAlign: "center",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.04em",
                  }}
                >
                  No spam. I read every message.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        
        
        .contact-page-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: flex-start;
        }

        
        @media (min-width: 768px) {
          .contact-page-grid {
            grid-template-columns: 1fr 1.5fr;
            gap: 3rem;
          }
        }

        
        
        .contact-name-email-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        
        @media (min-width: 480px) {
          .contact-name-email-row {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        }

        
        
        @media (max-width: 479px) {
          .contact-page-grid form {
            padding: 1.25rem 1rem;
            gap: 1rem;
          }

          .contact-page-grid .animate-slide-up {
            padding: 2rem 1rem;
          }
        }

        
        
        @media (max-width: 479px) {
          .contact-page-grid + div,
          .page-container > div:first-of-type {
            margin-bottom: 2.5rem;
          }
        }

        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        
        .contact-card:hover .contact-card-icon {
          background: var(--accent-glow) !important;
          border-color: var(--border-accent) !important;
          color: var(--accent) !important;
        }
      `}</style>
    </div>
  );
}
