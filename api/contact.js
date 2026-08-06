import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin (uses VERCEL_FIREBASE_* env vars or service account)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

// Simple in-memory rate limiter (resets on cold start)
const rateLimitMap = new Map();
const RATE_LIMIT = 3; // max submissions
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getRateLimitKey(ip) {
  return `contact:${ip}`;
}

function checkRateLimit(ip) {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.start > WINDOW_MS) {
    rateLimitMap.set(key, { start: now, count: 1 });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((record.start + WINDOW_MS - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap) {
    if (now - record.start > WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", process.env.VERCEL_URL || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get client IP
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  // Rate limit check
  const { allowed, remaining, retryAfter } = checkRateLimit(ip);
  res.setHeader("X-RateLimit-Remaining", remaining);

  if (!allowed) {
    return res.status(429).json({
      error: "Too many submissions. Please try again later.",
      retryAfter,
    });
  }

  // Validate body
  const { name, email, message } = req.body || {};
  const errors = [];

  if (!name?.trim()) errors.push("Name is required.");
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.");
  if (!message?.trim() || message.length < 10) errors.push("Message must be at least 10 characters.");
  if (message && message.length > 1000) errors.push("Message must be under 1000 characters.");

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(" ") });
  }

  try {
    await db.collection("contacts").add({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      submittedAt: new Date(),
      ip,
    });

    return res.status(200).json({ success: true, remaining });
  } catch (error) {
    console.error("Firestore error:", error);
    return res.status(500).json({ error: "Failed to submit. Please try again." });
  }
}
