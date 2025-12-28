// 충전소 관련 api 호출함수
import { ApiResponse } from "@/types/api";
import { StationResponse } from "@/types/station";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

export async function fetchStations(): Promise<ApiResponse<StationResponse>> {
        const res = await fetch(`${baseUrl}/api/stations`, {
            cache: 'no-store',
        });
        
        const data = res.json();
        return data;
}