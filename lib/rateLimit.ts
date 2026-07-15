import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(2, '1 m'),
    analytics: true
 })

export const registerRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: true
})

export const apiRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '1 m'),
    analytics: true
})