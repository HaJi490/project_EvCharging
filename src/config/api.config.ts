export const API_CONFIG = {
    USE_EXTERNAL_API: process.env.NEXT_PUBLIC_USE_EXTERNAL_API === 'true',
    EXTERNAL_API_URL: process.env.NEXT_PUBLIC_API_URL,
    INTERNAL_API_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
} as const;