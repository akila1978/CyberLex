/**
 * CyberLex Production Rate Limiting Architecture
 *
 * Designed for hybrid deployment:
 * 1. Distributed Multi-Node Production: Connects via Upstash Redis REST (zero cold-start overhead)
 *    when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in .env.production.
 * 2. Single-Node / Standalone VPS / Local Dev: High-performance in-memory sliding window with
 *    automated garbage collection to prevent memory exhaustion.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const inMemoryStore = new Map<string, RateLimitRecord>();

// Periodic garbage collection every 5 minutes to prevent memory growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of inMemoryStore.entries()) {
      if (now > record.resetTime) {
        inMemoryStore.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  retryAfterSeconds?: number;
}

export async function checkRateLimit(
  key: string,
  limit: number = 10,
  windowMs: number = 60 * 1000
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // 1. Production Distributed Rate Limiting via Upstash Redis (if configured)
  if (upstashUrl && upstashToken) {
    try {
      const windowSeconds = Math.ceil(windowMs / 1000);
      const redisKey = `ratelimit:${key}`;

      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", redisKey],
          ["EXPIRE", redisKey, windowSeconds],
          ["TTL", redisKey],
        ]),
      });

      if (res.ok) {
        const data = await res.json();
        const currentCount = data[0]?.result || 1;
        const ttl = data[2]?.result || windowSeconds;
        const now = Date.now();
        const resetTime = now + ttl * 1000;

        if (currentCount > limit) {
          return {
            success: false,
            remaining: 0,
            resetTime,
            retryAfterSeconds: ttl,
          };
        }

        return {
          success: true,
          remaining: Math.max(0, limit - currentCount),
          resetTime,
        };
      }
    } catch (err) {
      console.warn("Upstash Redis rate limit failed, falling back to memory store:", err);
    }
  }

  // 2. Resilient In-Memory Sliding Window Implementation
  const now = Date.now();
  const record = inMemoryStore.get(key);

  if (!record || now > record.resetTime) {
    const newResetTime = now + windowMs;
    inMemoryStore.set(key, { count: 1, resetTime: newResetTime });
    return {
      success: true,
      remaining: limit - 1,
      resetTime: newResetTime,
    };
  }

  if (record.count >= limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfterSeconds,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  };
}
