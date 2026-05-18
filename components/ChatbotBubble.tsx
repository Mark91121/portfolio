"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const IconChat = () => (
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
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconClose = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSend = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const TypingDots = () => (
  <span
    style={{
      display: "inline-flex",
      gap: "4px",
      alignItems: "center",
      padding: "2px 0",
    }}
  >
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--cb-accent)",
          opacity: 0.5,
          display: "inline-block",
          animation: "cb-bounce 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.18}s`,
        }}
      />
    ))}
  </span>
);

type Message = { role: "user" | "bot"; text: string; error?: boolean };
type ApiMessage = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi there! I'm Mark's assistant. Ask me anything about his work, skills, or how to get in touch.";
const QUICK_REPLIES = [
  "What's your tech stack?",
  "Are you open to work?",
  "Tell me about yourself",
  "How can I contact you?",
];
const API_ENDPOINT = "/api/chat";

export default function ChatbotBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rateLimitTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    if (rateLimited === null) return;
    if (rateLimited <= 0) {
      setRateLimited(null);
      return;
    }
    rateLimitTimer.current = setInterval(() => {
      setRateLimited((prev) => (prev !== null && prev > 1 ? prev - 1 : null));
    }, 1000);
    return () => {
      if (rateLimitTimer.current) clearInterval(rateLimitTimer.current);
    };
  }, [rateLimited]);

  const buildHistory = useCallback((msgs: Message[]): ApiMessage[] => {
    return msgs
      .slice(1)
      .filter((m) => !m.error)
      .map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));
  }, []);

  const send = async (text?: string) => {
    if (loading || rateLimited !== null) return;
    const msg = (text ?? input).trim();
    if (!msg) return;

    setInput("");
    const userMessage: Message = { role: "user", text: msg };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history: buildHistory(nextMessages),
        }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setRateLimited(data.resetIn ?? 30);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `Slow down a bit! You can send another message in ${data.resetIn ?? 30}s.`,
            error: true,
          },
        ]);
        return;
      }
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: errorMsg, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || rateLimited !== null;
  const showQuickReplies = messages.length === 1 && !loading;

  return (
    <>
      <style>{`
        
        @keyframes cb-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes cb-panel-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cb-msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cb-pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.55); opacity: 0; }
        }

        
        .cb-root {
          --cb-accent:     var(--accent, #9b6f3c);
          --cb-accent-2:   var(--accent-dim, #c4955a);
          --cb-bg:         var(--bg, #fafaf8);
          --cb-bg2:        var(--bg-secondary, #f3f2ef);
          --cb-bg3:        var(--bg-card, #ffffff);
          --cb-border:     var(--border, #e4e2dc);
          --cb-text:       var(--text-primary, #1a1a18);
          --cb-text-muted: var(--text-muted, #a0a099);
          --cb-green:      var(--green, #2d8a4e);
          --cb-shadow:     var(--shadow-lg, 0 12px 40px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06));
          --cb-radius:     18px;
          --cb-radius-sm:  12px;
          --cb-font-mono:  'DM Mono', 'JetBrains Mono', ui-monospace, monospace;
        }

        
        .cb-root {
          position: fixed;
          
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          font-family: var(--font-sans, system-ui, sans-serif);
          
          pointer-events: none;
        }
        
        @media (max-width: 480px) {
          .cb-root { bottom: 16px; right: 16px; }
        }

        
        .cb-panel {
          width: 360px;
          height: 500px;
          max-height: 80vh;
          background: var(--cb-bg);
          border: 1px solid var(--cb-border);
          border-radius: var(--cb-radius);
          box-shadow: var(--cb-shadow);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transform: translateY(12px) scale(0.97);
          transition:
            opacity 0.22s ease,
            transform 0.22s cubic-bezier(.34,1.56,.64,1),
            pointer-events 0s 0.22s;
        }
        .cb-panel.cb-open {
          opacity: 1;
          pointer-events: auto; 
          transform: translateY(0) scale(1);
          transition:
            opacity 0.22s ease,
            transform 0.22s cubic-bezier(.34,1.56,.64,1);
          animation: cb-panel-in 0.25s cubic-bezier(.34,1.56,.64,1) both;
        }

        
        @media (max-width: 480px) {
          .cb-panel {
            position: fixed;
            bottom: 80px;
            right: 16px;
            left: 16px;
            width: auto;
            height: 70vh;
            max-height: 70vh;
            border-radius: var(--cb-radius);
          }
        }
        
        @media (min-width: 481px) and (max-width: 767px) {
          .cb-panel {
            width: 320px;
            height: 480px;
          }
        }
        

        
        .cb-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--cb-border);
          background: var(--cb-bg2);
          flex-shrink: 0;
        }
        .cb-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--cb-accent), var(--cb-accent-2));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(155,111,60,0.35);
        }
        .cb-header-info { flex: 1; min-width: 0; }
        .cb-header-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--cb-text);
          line-height: 1.2;
          white-space: nowrap;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cb-header-status {
          font-size: 0.66rem;
          color: var(--cb-green);
          font-family: var(--cb-font-mono);
          letter-spacing: 0.06em;
          margin-top: 1px;
        }
        .cb-header-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .cb-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--cb-text-muted);
          
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s, background 0.15s;
          line-height: 0;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          min-width: 36px;
          min-height: 36px;
        }
        .cb-icon-btn:hover {
          color: var(--cb-text);
          background: var(--cb-bg3);
        }

        
        .cb-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: var(--cb-bg3) transparent;
        }
        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-thumb { background: var(--cb-bg3); border-radius: 4px; }

        
        .cb-msg {
          max-width: 86%;
          padding: 9px 13px;
          border-radius: 14px;
          font-size: 0.82rem;
          line-height: 1.55;
          animation: cb-msg-in 0.2s ease both;
          word-break: break-word;
        }
        .cb-msg-bot {
          align-self: flex-start;
          background: var(--cb-bg2);
          color: var(--cb-text);
          border: 1px solid var(--cb-border);
          border-bottom-left-radius: 4px;
        }
        .cb-msg-user {
          align-self: flex-end;
          background: linear-gradient(135deg, var(--cb-accent), var(--cb-accent-2));
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 2px 8px rgba(155,111,60,0.25);
        }
        .cb-msg-error {
          background: rgba(220, 80, 80, 0.12);
          border-color: rgba(220, 80, 80, 0.25);
          color: #e07070;
        }

        
        .cb-quick-replies {
          padding: 0 14px 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .cb-quick-btn {
          font-family: var(--cb-font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.03em;
          color: var(--cb-accent);
          background: rgba(155,111,60,0.08);
          border: 1px solid rgba(155,111,60,0.25);
          border-radius: 10px;
          padding: 6px 8px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, transform 0.12s;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          white-space: normal;
          word-break: break-word;
          text-align: center;
          line-height: 1.4;
          
          min-height: 36px;
        }
        .cb-quick-btn:hover {
          background: rgba(155,111,60,0.18);
          border-color: rgba(155,111,60,0.45);
          transform: translateY(-1px);
        }
        .cb-quick-btn:active { transform: translateY(0); }

        
        @media (max-width: 480px) {
          .cb-quick-btn { font-size: 0.62rem; padding: 5px 10px; }
        }

        
        .cb-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-top: 1px solid var(--cb-border);
          background: var(--cb-bg2);
          flex-shrink: 0;
        }
        .cb-input {
          flex: 1;
          background: var(--cb-bg3);
          border: 1px solid var(--cb-border);
          border-radius: 10px;
          padding: 8px 12px;
          
          font-size: max(0.82rem, 16px);
          color: var(--cb-text);
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          min-width: 0;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .cb-input::placeholder { color: var(--cb-text-muted); }
        .cb-input:focus {
          border-color: rgba(155,111,60,0.4);
          box-shadow: 0 0 0 3px rgba(155,111,60,0.08);
        }
        .cb-input:disabled { opacity: 0.5; cursor: not-allowed; }

        .cb-send {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--cb-accent), var(--cb-accent-2));
          border: none;
          cursor: pointer;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.12s, box-shadow 0.15s;
          box-shadow: 0 2px 8px rgba(155,111,60,0.3);
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          
          min-width: 44px;
          min-height: 44px;
        }
        .cb-send:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(155,111,60,0.4);
        }
        .cb-send:active:not(:disabled) { transform: translateY(0); }
        .cb-send:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

        
        .cb-rate-bar {
          font-family: var(--cb-font-mono);
          font-size: 0.64rem;
          color: var(--cb-text-muted);
          text-align: center;
          padding: 6px;
          background: rgba(220,80,80,0.06);
          border-top: 1px solid rgba(220,80,80,0.15);
          letter-spacing: 0.04em;
        }

        
        .cb-trigger {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--cb-accent), var(--cb-accent-2));
          border: none;
          cursor: pointer;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(155,111,60,0.45);
          transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s;
          position: relative;
          flex-shrink: 0;
          pointer-events: auto; 
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          
          min-width: 52px;
          min-height: 52px;
        }
        .cb-trigger:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 28px rgba(155,111,60,0.55);
        }
        .cb-trigger:active { transform: scale(0.96); }
        .cb-trigger:not(.cb-trigger-open)::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--cb-accent);
          animation: cb-pulse-ring 2.2s ease-out infinite;
          z-index: -1;
        }

        
        @media (max-width: 480px) {
          .cb-trigger { width: 48px; height: 48px; }
        }
      `}</style>

      <div className="cb-root">
        <div
          className={`cb-panel${open ? " cb-open" : ""}`}
          role="dialog"
          aria-label="Chat with Mark's assistant"
          aria-modal="true"
        >
          <div className="cb-header">
            <div className="cb-avatar">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div className="cb-header-info">
              <p className="cb-header-name">Mark's Assistant</p>
              <p className="cb-header-status">● Online</p>
            </div>
            <div className="cb-header-actions">
              <button
                className="cb-icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <IconClose />
              </button>
            </div>
          </div>

          <div className="cb-messages" role="log" aria-live="polite">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`cb-msg ${m.role === "bot" ? "cb-msg-bot" : "cb-msg-user"}${m.error ? " cb-msg-error" : ""}`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="cb-msg cb-msg-bot">
                <TypingDots />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showQuickReplies && (
            <div
              className="cb-quick-replies"
              role="group"
              aria-label="Quick reply options"
            >
              {QUICK_REPLIES.map((r) => (
                <button
                  key={r}
                  className="cb-quick-btn"
                  onClick={() => send(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {rateLimited !== null && (
            <div className="cb-rate-bar">
              ⏱ Please wait {rateLimited}s before sending another message
            </div>
          )}

          <div className="cb-input-row">
            <input
              ref={inputRef}
              className="cb-input"
              placeholder={
                isDisabled && !loading
                  ? `Wait ${rateLimited}s…`
                  : "Ask me anything…"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              disabled={isDisabled}
              maxLength={500}
              aria-label="Chat input"
            />
            <button
              className="cb-send"
              onClick={() => send()}
              disabled={isDisabled || !input.trim()}
              aria-label="Send message"
            >
              <IconSend />
            </button>
          </div>
        </div>

        <button
          className={`cb-trigger${open ? " cb-trigger-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close chat" : "Open chat"}
          aria-expanded={open}
        >
          {open ? <IconClose /> : <IconChat />}
        </button>
      </div>
    </>
  );
}
