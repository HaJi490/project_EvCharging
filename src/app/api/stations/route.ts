import { NextRequest, NextResponse } from "next/server";
import { getStations } from "@/mocks/domain/station.domain";

export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url);

    const lat = Number(searchParams.get('lat'));
    const lng = Number(searchParams.get('lng'));
    const radius = Number(searchParams.get('radius'));
    const canUse = searchParams.get('canUse') === 'true';
    const parkingFree = searchParams.get('parkingFree') === 'true';
    const isOpen = searchParams.get('isOpen') === 'true';

    // FIXME DB조회/mock 데이터 필터링
    const stations = [getStations];

    return NextResponse.json({
        success: true,
        data: stations,
    })


}