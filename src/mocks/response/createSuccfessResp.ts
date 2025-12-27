import { HttpResponse } from 'msw'

export function createSuccessResp<T>(data: T, status = 200) {
    return HttpResponse.json(
        {
            data,
            error: null,
        },
        { status }
    )
}