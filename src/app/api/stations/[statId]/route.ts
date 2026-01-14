import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params } : {params: {statId: string }}
){
    const {statId} = params;

    //DB/mock 조회
    const stationDetail = {};

    return NextResponse.json({
        success: true,
        data: stationDetail,
    })


}