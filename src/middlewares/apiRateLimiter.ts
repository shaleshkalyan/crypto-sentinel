import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    responseStatus: 'error',
    message: 'Too many requests, please try again later.',
  },
});
