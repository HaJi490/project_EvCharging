export const HTTP_ERRORS = {
    INVALID_PARAMS: {
        status: 400,
        code: 'INVALID_PARAMS',
        message: '잘못된 요청 파라미터입니다.',
    },
    NOT_FOUND: {
        status: 404,
        code: 'NOT_FOUND',
        message: '요청된 데이터를 찾을 수 없습니다.',
    },
    UNAUTHORIZED: {
        status: 401,
        code: 'UNAUTHORIZED',
        message: '인증이 필요합니다.',
    },
    FORBIDDEN: {
        status: 403,
        code: 'FORBIDDEN',
        message: '접근 권한이 없습니다.',
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: '서버 오류가 발생했습니다.',
    },
} as const

export type HttpErrorKey = keyof typeof HTTP_ERRORS