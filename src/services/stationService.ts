// 충전소 관련 api 호출함수
import { ApiResponse } from "@/types/api";
import { StationResponse } from "@/types/station";

interface fetchStationsParams {
    lat: number
    lng: number
    radius: number
    canUse: boolean
    parkingFree: boolean
    isOpen: boolean
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

export async function fetchStations( params: fetchStationsParams ) :Promise<ApiResponse<StationResponse>> {
        const query = new URLSearchParams({
            lat: String(params.lat),
            lng: String(params.lng),
            radius: String(params.radius),
            canUse: String(params.canUse),
            parkingFree: String(params.parkingFree),
            isOpen: String(params.isOpen),
        }).toString();


        const res = await fetch(`${baseUrl}/api/stations${query}`, {
            cache: 'no-store',
        });
        
        return res.json();
}