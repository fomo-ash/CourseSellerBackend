import rateLimiter from "express-rate-limit";

export const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Too many requests from this IP, please try again later."
});