'use client'

import { useState, useMemo } from 'react'

import StationListPanel from './StationListPanel'
import StationSearchMap from './StationSearchMap'
import StationDetailPanel from './StationDetailPanel'
import { 
    StationResponse, 
    StationListDto,
    StationQueryParams,
} from '@/types/station'
import { stationApiClient } from '@/lib/api-client/station-client'

interface SearchPageClientProps {
    initialData: StationResponse;
    initialParams: StationQueryParams;
}

export default function SearchPageClient({initialData, initialParams}: SearchPageClientProps) {
    const [data, setData] = useState(initialData);
    const [params, setParams] = useState(initialParams);
    const [selectedStatId, setSelectedStatId] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 필터 변경 시 클라이언트 재요청
    const handleFilterChange = async (newParams: StationQueryParams) => {
        setIsLoading(true);

        try{
            // 동일한 API Client 사용(자동으로 http 요청됨)
            const newData = await stationApiClient.getStations(newParams);

            setData(newData);
            setParams(newParams);
        } catch(error) {
            console.error('Failed to fetch stations: ', error);
            // FIXME 에러처리
        } finally {
            setIsLoading(false);
        };

        
    //     const query = new URLSearchParams({
    //         lat: String(newParams.lat),
    //         lng: String(newParams.lng),
    //         radius: String(newParams.radius),
    //         canUse: String(newParams.canUse),
    //         parkingFree: String(newParams.parkingFree),
    //         isOpen: String(newParams.isOpen),
    //     });

    //     const res = await fetch(`/api/stations?${query}`);
    //     const result = await res.json;

    //     if (result.success) {   //FIXME api/stations/route.ts
    //         setData(result.data);
    //         setParams(newParams);
    //     }
    }

    // 선택된 충전소 변경시
    const selectedStation: StationListDto | null = useMemo(() => {
        if(!selectedStatId) return null;

        return data.list.find(
            stat => stat.statId === selectedStatId
        ) ?? null
    }, [selectedStatId, data.list]);

    return (
        <div className='w-full h-full flex'>
            <aside className='w-96 h-full'>
                <StationListPanel 
                    list={data.list}
                    selectedStatId ={selectedStatId}
                    onSelected = {setSelectedStatId}
                />
            </aside>
            <main className='relative h-full flex-1'>
                {/* 필터 UI 예시 */}
                <div className="p-4 border-b">
                <button
                    onClick={() => handleFilterChange({ 
                    ...params, 
                    parkingFree: !params.parkingFree 
                    })}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    {isLoading ? '로딩 중...' : '무료 주차만 보기'}
                </button>
                </div>
                <StationSearchMap 
                    markers={data.markers}
                    selectedStatId = {selectedStatId}
                    onSelected = {setSelectedStatId}
                />
                {selectedStatId && (
                    <div className='absolute left-4 top-5 w-96 h-190 bg-white shadow-lg rounded-xl'>
                        <StationDetailPanel 
                            statId={selectedStatId}
                            station ={selectedStation}
                        />
                    </div>
                )}
            </main>
        </div>
    )
}
