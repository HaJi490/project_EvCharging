import { API_CONFIG } from "@/config/api.config";
import { stationService } from '@/server/domain/station/station.service';
import {
    StationQueryParams,
    StationResponse
} from '@/types/station';

export class StationApiClient {
    /**
     * 충전소 목록 조회
     * 
     * @param params - 검색 파라미터
     * @param option - 요청 옵션
     * @returns 충전소 데이터
     */

    async getStations(
        params: StationQueryParams,
        options?: {
            forceHttp?: boolean; // 강제로 http 요청 사용
        }
    ): Promise<StationResponse> {
        const isServer = typeof window === 'undefined';
        const shouldUseHttp = options?.forceHttp || !isServer || API_CONFIG.USE_EXTERNAL_API;

        // 1. CSR: HTTP 요청
        if (shouldUseHttp) {
            return this.fetchViaHttp(params);
        }

        // 2. SSR: 서버 요청
        return this.fetchDirect(params);
    }

    /**
     * HTTP를 통한 데이터 요청
     * - 클라이언트에서 항상 사용
     * - 외부 API 연결 시 사용
     */

    private async fetchViaHttp(params: StationQueryParams): Promise<StationResponse>{
        const baseUrl = API_CONFIG.USE_EXTERNAL_API
            ? API_CONFIG.EXTERNAL_API_URL
            : API_CONFIG.INTERNAL_API_URL;
    
        const query = new URLSearchParams({
            lat: String(params.lat),
        lng: String(params.lng),
        radius: String(params.radius),
        canUse: String(params.canUse ?? false),
        parkingFree: String(params.parkingFree ?? false),
        isOpen: String(params.isOpen ?? false)
        }).toString();

        const res = await fetch(`${baseUrl}/api/stations?${query}`,{
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                // 외부 API 사용 시 인증 토큰 추가 가능
                ...(API_CONFIG.USE_EXTERNAL_API && {
                'Authorization': `Bearer ${process.env.API_TOKEN}`, // FIXME API TOKEN이 있나..?
                }),
            }
        });

        if(!res.ok) {
            throw new Error(`API 요청 실패: ${res.status}`);
        }

        const result = await res.json();

        if(!result.success) {
            throw new Error(result.error || '데이터를 불러올 수 없습니다.');
        }

        return result.data;
    }

    /**
     * 직접 domain 로직 호출 (SSR 최적화)
     * - 네트워크 오버헤드 없음
     * - Next.js 권장방식
     */
    private async fetchDirect(params: StationQueryParams): Promise<StationResponse> {
        // 동일한 인터페이스 유지
        return stationService.getStations(params);
    }
}

// 싱글톤 인스턴스
export const stationApiClient = new StationApiClient();
