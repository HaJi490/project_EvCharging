export interface StationQueryParams {
    lat: number;
    lng: number;
    radius: number;
    canUse?: boolean;
    parkingFree?: boolean;
    isOpen?: boolean;
}

export interface StationMarkerDto {
    statId: string
}