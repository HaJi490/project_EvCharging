export const API_CONFIG = {
    /**
     * 외부 API 사용 여부
     * - false: Next.js Route Handler 사용 (개발)
     * - true: 실제 백엔드 API 사용 (프로덕션)
     */
    USE_EXTERNAL_API: process.env.NEXT_PUBLIC_USE_EXTERNAL_API === 'true',

    /**
     * 외부 백엔드 API URL
     */
    EXTERNAL_API_URL: process.env.NEXT_PUBLIC_API_URL,

    /**
     * 내부 API URL (Next.js)
     */
    INTERNAL_API_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',

    /**
     * 요청 타임아웃 (ms)
     */
    TIMEOUT: 10000,
} as const;