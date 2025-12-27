export const HTTP_ERRORS = {
    NOT_FOUND: {
        status: 404,
        code: 404,
        message: 'Not Found',
    },
    UNAUTHORIZED: {
        status: 401,
        code: 401,
        message: 'Unauthorized',
    },
    FORBIDDEN: {
        status: 403,
        code: 403,
        message: 'Forbidden',
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        code: 500,
        message: 'Internal Server Error',
    },
} as const

export type HttpErrorKey = keyof typeof HTTP_ERRORS