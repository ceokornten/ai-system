import rateLimit from 'express-rate-limit';

export function aiRateLimiter() {
  return rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    keyGenerator: (req) => req.user?.id || req.ip,
    message: 'Too many requests, please try again later.'
  });
}
