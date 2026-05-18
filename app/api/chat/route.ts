import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/knowledge-base";

const MODEL = "gpt-4o-mini";
const MAX_TOKENS = 100; // keep responses concise
const MAX_HISTORY = 10; // max message pairs kept in context
const MAX_INPUT_CHARS = 300; // hard cap on user input length

// Rate limit: per unique IP
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 5; // max 8 messages per minute per IP

type RateLimitEntry = { count: number; windowStart: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): {
  limited: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return {
      limited: false,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetIn: RATE_LIMIT_WINDOW_MS,
    };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    const resetIn = RATE_LIMIT_WINDOW_MS - (now - entry.windowStart);
    return { limited: true, remaining: 0, resetIn };
  }

  entry.count += 1;
  return {
    limited: false,
    remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
    resetIn: RATE_LIMIT_WINDOW_MS - (now - entry.windowStart),
  };
}

function pruneRateLimitStore() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitStore.delete(ip);
    }
  }
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type RequestBody = {
  message: string;
  history?: ChatMessage[];
};

export async function POST(req: NextRequest) {
  pruneRateLimitStore();

  // 1. Rate limiting
  const ip = getClientIp(req);
  const rateCheck = isRateLimited(ip);

  if (rateCheck.limited) {
    return NextResponse.json(
      {
        error: "Too many messages. Please wait a moment before trying again.",
        resetIn: Math.ceil(rateCheck.resetIn / 1000),
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rateCheck.resetIn / 1000)),
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  // 2. Parse & validate body
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { message, history = [] } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 },
    );
  }

  // 3. Sanitize input
  const sanitized = message.trim().slice(0, MAX_INPUT_CHARS);
  if (!sanitized) {
    return NextResponse.json(
      { error: "Message cannot be empty." },
      { status: 400 },
    );
  }

  // 4. Validate & trim history
  const safeHistory: ChatMessage[] = Array.isArray(history)
    ? history
        .filter(
          (m) =>
            m &&
            typeof m === "object" &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string",
        )
        .slice(-MAX_HISTORY * 2)
        .map((m) => ({
          role: m.role,
          content: m.content.slice(0, MAX_INPUT_CHARS),
        }))
    : [];

  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          temperature: 0.7,
          messages: [
            { role: "system", content: buildSystemPrompt() },
            ...safeHistory,
            { role: "user", content: sanitized },
          ],
        }),
      },
    );

    if (!openaiRes.ok) {
      const errData = await openaiRes.json().catch(() => ({}));
      console.error("[ChatAPI] OpenAI error:", openaiRes.status, errData);

      if (openaiRes.status === 429) {
        return NextResponse.json(
          {
            error: "The assistant is busy right now. Please try again shortly.",
          },
          { status: 503 },
        );
      }
      if (openaiRes.status === 401) {
        return NextResponse.json(
          { error: "API key error. Please contact the site owner." },
          { status: 500 },
        );
      }
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    const json = await openaiRes.json();
    const reply =
      json.choices?.[0]?.message?.content?.trim() ??
      "Sorry, I couldn't generate a response.";

    return NextResponse.json(
      { reply },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
          "X-RateLimit-Remaining": String(rateCheck.remaining),
        },
      },
    );
  } catch (err: unknown) {
    console.error("[ChatAPI] Network error:", err);
    return NextResponse.json(
      { error: "Could not reach the assistant. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
