import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const YOUR_EMAIL = "mark.manalo911211@gmail.com";

type RateLimitEntry = { count: number; resetAt: number };
const ipStore = new Map<string, RateLimitEntry>();
const emailStore = new Map<string, RateLimitEntry>();

const IP_LIMIT = 3;
const IP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const EMAIL_LIMIT = 5;
const EMAIL_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(
  store: Map<string, RateLimitEntry>,
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSecs: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSecs: 0 };
  }

  if (entry.count >= limit) {
    const retryAfterSecs = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSecs };
  }

  entry.count++;
  return { allowed: true, retryAfterSecs: 0 };
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    // --- Rate limit by IP ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const ipCheck = checkRateLimit(ipStore, ip, IP_LIMIT, IP_WINDOW_MS);
    if (!ipCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please wait ${Math.ceil(ipCheck.retryAfterSecs / 60)} minute(s) before trying again.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(ipCheck.retryAfterSecs) },
        },
      );
    }

    const { name, email, subject, message } = await req.json();

    // --- Basic validation ---
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // --- Rate limit by sender email ---
    const emailCheck = checkRateLimit(
      emailStore,
      email.toLowerCase(),
      EMAIL_LIMIT,
      EMAIL_WINDOW_MS,
    );
    if (!emailCheck.allowed) {
      return NextResponse.json(
        {
          error: `This email has been used too many times. Please try again in ${Math.ceil(emailCheck.retryAfterSecs / 60)} minute(s).`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(emailCheck.retryAfterSecs) },
        },
      );
    }

    // --- Map subject value to readable label ---
    const subjectLabels: Record<string, string> = {
      fulltime: "Full-time opportunity",
      freelance: "Freelance project",
      collab: "Collaboration",
      other: "Others",
    };
    const subjectLabel = subjectLabels[subject] || subject;

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: YOUR_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subjectLabel} — from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem;">
            New message from your portfolio contact form
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr>
              <td style="padding: 8px 0; color: #555; width: 80px;"><strong>Name</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555;"><strong>Email</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555;"><strong>Topic</strong></td>
              <td style="padding: 8px 0;">${subjectLabel}</td>
            </tr>
          </table>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 1rem 1.25rem; white-space: pre-wrap; line-height: 1.7;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
          <p style="font-size: 0.75rem; color: #999; margin-top: 1.5rem;">
            Sent via markmanalo.dev contact form · Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
