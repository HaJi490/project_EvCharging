import { StationRepository } from "./station.repository";
import {
    StationQueryParams,
    StationResponse,
    StationMarkerDto,
    StationListDto,
    StationRaw
} from '@/types/station';

export class StationService {
    constructor(private repository: StationRepository) {
        console.log('🔧 Service 초기화: Repository 주입 완료');
    };

    // 충전소 목록 조회
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
        // const markers: StationMarkerDto[] = stations.map(stat => ({
        //     statId: stat.statId,
        //     statNm: stat.statNm,
        //     lat: stat.lat,
        //     lng: stat.lng,
        //     chargerCnt: stat.chargeNum,
        // }));

        // const list: StationListDto[] = stations.map(stat => ({
        //     statId: stat.statId,
        //     statNm: stat.statNm,
        //     lat: stat.lat,
        //     lng: stat.lng,
        //     chargerCnt: stat.chargeNum,

        //     addr: stat.addr,
        //     useTime: stat.useTime,
        //     parkingFree: stat.parkingFree,
        //     limitYn: stat.limitYn,
        //     busiNm: stat.busiNm,

        //     totalChargerCnt: stat.totalChargeNum,
        //     totalFastCnt: stat.totalFastNum,
        //     totalSlowCnt: stat.totalSlowNum,
        //     chargerFastCnt: stat.chargeFastNum,
        //     chargerSlowCnt: stat.chargeSlowNum,
        // }));

        // return {markers, list}

        return this.toResponse(stations);
    }

    /**
     * 충전소 상세 조회
     */
    getStationById(id: string): StationListDto | null {
        const station = this.repository.findById(id);
        
        if (!station) {
        return null;
        }

        return this.toStationListDto(station);
    }


    /**
   * 필터 적용
   */
    private applyFilters(
        stations: StationRaw[],
        params: StationQueryParams
    ): StationRaw[] {
        const { lat, lng, radius, canUse, parkingFree, isOpen } = params;

        return stations.filter(station => {
            if (canUse !== undefined) {
                stations = stations.filter(s => s.chargeNum > 0);
            }
            if (parkingFree === true) { // false면 유료,무료 전부
                stations = stations.filter(s => s.parkingFree === parkingFree);
            }
            if (isOpen === true) { // false면 개방,비개방 전부
                stations = stations.filter(s => s.limitYn === isOpen)
            }
            return true;
        });
    }

    /**
     * DTO 변환
     */
    private toResponse(stations: StationRaw[]): StationResponse {
        return {
            markers: stations.map(s => this.toStationMarkerDto(s)),
            list: stations.map(s => this.toStationListDto(s)),
        };
    }

    private toStationMarkerDto(station: StationRaw): StationMarkerDto {
        return {
            statId: station.statId,
            statNm: station.statNm,
            lat: station.lat,
            lng: station.lng,
            chargerCnt: station.chargeNum,
        };
    }

    private toStationListDto(station: StationRaw): StationListDto {
        return {
            statId: station.statId,
            statNm: station.statNm,
            lat: station.lat,
            lng: station.lng,
            chargerCnt: station.chargeNum,
            addr: station.addr,
            useTime: station.useTime,
            parkingFree: station.parkingFree,
            limitYn: station.limitYn,
            busiNm: station.busiNm,
            totalChargerCnt: station.totalChargeNum,
            totalFastCnt: station.totalFastNum,
            totalSlowCnt: station.totalSlowNum,
            chargerFastCnt: station.chargeFastNum,
            chargerSlowCnt: station.chargeSlowNum,
        };
    }
}

const stationRepository = new StationRepository();
export const stationService = new StationService(stationRepository);