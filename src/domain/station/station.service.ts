import { StationRepository } from "./station.repository";
import {
    StationQueryParams,
    StationResponse,
    StationMarkerDto,
    StationListDto,
} from '@/types/station';

export class StationService {
    constructor(private repository: StationRepository) {};

    getStations(params: StationQueryParams): StationResponse {
        const { lat, lng, radius, canUse, parkingFree, isOpen } = params;

        // 1. 지역 기반 필터링
        let stations = this.repository.findByArea(lat, lng, radius);

        // 2. 추가 필터 적용
        if (canUse !== undefined) {
            stations = stations.filter(s => s.chargeNum > 0);
        }
        if (parkingFree === true) { // false면 유료,무료 전부
            stations = stations.filter(s => s.parkingFree === parkingFree);
        }
        if (isOpen === true) { // false면 개방,비개방 전부
            stations = stations.filter(s => s.limitYn === isOpen)
        }

        // 3. DTO 변환
        const markers: StationMarkerDto[] = stations.map(stat => ({
            statId: stat.statId,
            statNm: stat.statNm,
            lat: stat.lat,
            lng: stat.lng,
            chargerCnt: stat.chargeNum,
        }));

        const list: StationListDto[] = stations.map(stat => ({
            statId: stat.statId,
            statNm: stat.statNm,
            lat: stat.lat,
            lng: stat.lng,
            chargerCnt: stat.chargeNum,

            addr: stat.addr,
            useTime: stat.useTime,
            parkingFree: stat.parkingFree,
            limitYn: stat.limitYn,
            busiNm: stat.busiNm,

            totalChargerCnt: stat.totalChargeNum,
            totalFastCnt: stat.totalFastNum,
            totalSlowCnt: stat.totalSlowNum,
            chargerFastCnt: stat.chargeFastNum,
            chargerSlowCnt: stat.chargeSlowNum,
        }));

        return {markers, list}
    }
}

const stationRepository = new StationRepository();
export const stationService = new StationService(stationRepository);