// src/lib/rate-limit.ts
// Simple in-memory rate limiter — works on serverless (per-instance)

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  maxRequests: number;  // max requests per window
  windowMs: number;     // window in milliseconds
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { maxRequests: 10, windowMs: 60_000 }
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const key = identifier;
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + options.windowMs,
    });
    return {
      success: true,
      remaining: options.maxRequests - 1,
      resetIn: options.windowMs,
    };
  }

  if (entry.count >= options.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  entry.count += 1;
  return {
    success: true,
    remaining: options.maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  };
}

export function getClientIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
