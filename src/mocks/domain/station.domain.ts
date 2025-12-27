import rawData from '../data/fetchStations.json';
import { StationRaw } from '../types/stationRaw';
import {
    StationMarkerDto,
    StationListDto,
} from '@/types/station';

export function getStaions() {
    const stations = rawData as unknown as StationRaw[]; //? as inknown as

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

    return {
        markers,
        list, //? 왜 station으로 한번더 감쌈?>
    }
}