import { ApiResponse } from '@/types/api';
import { HTTP_ERRORS, HttpErrorKey } from '../constants/httpErrors'

export function createSuccessResp<T>(data: T, status = 200) {
    return{
            success: true,
            data,
            error: null,
            timestamp: new Date().toISOString(),
        }
        // { status }
}

export function createErrorResp(errorKey: HttpErrorKey) {
    const error = HTTP_ERRORS[errorKey];

    return {
        success: false,
        data: null,
        error: {
            code: error.code,
            message: error.message,
        },
        timestamp: new Date().toISOString(),
    };
    // { status: error.status }
}

// 커스텀 에러 응답 생성
export function createCustomErrorResponse(
    code: string,
    message: string
): ApiResponse<null> {
    return {
        success: false,
        data: null,
        error: {
            code,
            message,
        },
        timestamp: new Date().toISOString(),
    };
}
