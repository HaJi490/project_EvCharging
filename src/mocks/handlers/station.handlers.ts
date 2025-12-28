import { http, HttpHandler } from 'msw';
import { createSuccessResp } from '../response/createSuccfessResp';
import { createErrorResp } from '../response/createErrorResp';
import { getStaions } from '../domain/station.domain';

const statHandlers: HttpHandler[] = [ //FIXME 타입설정
    // 충전소 정보
    http.get('/api/stations', ({request}) => {
        const mode = new URL(request.url).searchParams.get('mode');

        if(mode === 'notfound') {
            return createErrorResp('NOT_FOUND');
        }
        
        if(mode === 'unauthorized') {
            return createErrorResp('UNAUTHORIZED');
        }
        
        return createSuccessResp(getStaions());
    }),

]

export const handlers: HttpHandler[] = [
    ...statHandlers,
]
