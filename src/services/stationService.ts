// 충전소 관련 api 호출함수
import { ApiResponse } from "@/types/api";
import { StationResponse } from "@/types/station";

interface fetchStationsProps {
    lat: number
    lng: number
    radius: number
    canUse: boolean
    parkingFree: boolean
    open: boolean
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

export async function fetchStations({
    lat, lng, radius, canUse, parkingFree, open
}: fetchStationsProps)
: Promise<ApiResponse<StationResponse>> {
        const param = `?lat=${lat}&lng=${lng}&radius=${radius}
                        &canUse=${canUse}&parkingFree=${parkingFree}&open=${open}`
        const res = await fetch(`${baseUrl}/api/stations${param}`, {
            cache: 'no-store',
        });
        
        const data = res.json();
        return data;
}