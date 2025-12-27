// 원본 API 데이터 (mock json 기준)
export interface ChargerInfoRaw {
    statNm: string;
    statId: string;
    chgerId: string;
    chgerType: string;
    addr: string;
    lat: number;
    lng: number;
    useTime: string;
    location: string;
    startUpdatetime: string | null;
    stat: string;            // 상태 코드
    statUpdDt: string;
    lastTsdt: string;
    lastTedt: string;
    nowTsdt: string;
    output: string;
    method: string;
    kind: string;
    kindDetail: string;
    parkingFree: string;
    note: string;
    limitYn: string;
    limitDetail: string;
    delYn: string;
    busiId: string;
    busiNm: string;
    deliveredKwh: number;
    requestKwh: number;
    minuteEv: number;
}

export interface StationRaw {
    statNm: string;
    statId: string;
    addr: string;
    useTime: string;

    lat: number;
    lng: number;

    parkingFree: boolean;
    limitYn: boolean;

    busiId: string;
    busiNm: string;

    totalChargeNum: number;
    totalFastNum: number;
    totalSlowNum: number;
    totalMidNum: number;
    totalNacsNum: number;

    chargeFastNum: number;
    chargeSlowNum: number;
    chargeMidNum: number;

    chargeNum: number;          // 사용 가능 충전기 수
    chargingDemand: number;

    enabledCharger: string[];

    chargerInfo: Record<string, ChargerInfoRaw>;

    // ❗ 실제 데이터에 있으나 당장 안 쓰는 것들
    minute: number;
    predTag: string | null;
    bestChoice: string | null;
    leastDis: number;
    leashTime: number;
    canLongUse: boolean | null;
}