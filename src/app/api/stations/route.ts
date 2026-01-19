import { NextRequest, NextResponse } from "next/server";
import { stationService } from "@/server/domain/station/station.service";
import { StationQueryParams } from "@/types/station";

export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url);

    const params: StationQueryParams = {
        lat: Number(searchParams.get('lat')) || 35.18,
        lng: Number(searchParams.get('lng')) || 129.06,
        radius: Number(searchParams.get('radius')) || 1000,
        canUse: searchParams.get('canUse') === 'true',
        parkingFree: searchParams.get('parkingFree') === 'true',
        isOpen: searchParams.get('isOpen') === 'true',
    };

    try {
        const data = stationService.getStations(params);

        return NextResponse.json({
            success: true,
            data,
            message: 'OK',
        })
    } catch(error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : '서버 오류',
                data: null,
            },
            {status: 500}
        );
    }

}