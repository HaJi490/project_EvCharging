import { HttpResponse } from 'msw'
import { HTTP_ERRORS, HttpErrorKey } from '../constants/httpErrors'

export function createErrorResp(type: HttpErrorKey) {
    const error = HTTP_ERRORS[type]

    return HttpResponse.json(
        {
            data: null,
            error: {
                code: error.code,
                message: error.message,
            },
        },
        { status: error.status }
    )
}