

// 기본 / 마커표시 (Minimal DTO)
export interface StationMarkerDto {
    statId: string;
    statNm: string;
    lat: number;
    lng: number;
    chargerCnt: number;
}

// 충전소 목록, 상세정보 (Detailed DTO)
export interface StationListDto extends StationMarkerDto {
    addr: string;
    useTime: string;
    parkingFree: boolean;
    limitYn: boolean;
    busiNm: string;

    totalChargerCnt: number;
    totalFastCnt: number;
    totalSlowCnt: number;
    chargerFastCnt: number;
    chargerSlowCnt: number;
}

export interface StationResponse {
    markers: StationMarkerDto[];
    list: StationListDto[];
}