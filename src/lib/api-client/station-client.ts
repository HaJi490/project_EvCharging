import { API_CONFIG } from "@/config/api.config";
import { stationService } from '@/server/domain/station/station.service';
import {
    StationQueryParams,
    StationResponse
} from '@/types/station';

export class StationApiClient {
    /**
     * 
     */

    async getStations(params: StationQueryParams): Promise<StationResponse> {
        const isServer = typeof window === 'undefined';

        if (isServer && !API_CONFIG.USE_EXTERNAL_API) {
            // SSR 직접 호출
            console.log('lib/api-client/ SSR 직접호출');
            return stationService.getStations(params);
        }

        // CSR: HTTP 요청
        return this.fetchViaHttp(params);
    }
}