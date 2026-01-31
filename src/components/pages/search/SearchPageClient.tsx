'use client'

import { useState, useMemo, useCallback } from 'react'

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
    const [currentParams, setCurrentParams] = useState(initialParams);
    const [selectedStatId, setSelectedStatId] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 충전소 정보 요청
    const fetchStations = useCallback(async (newParams: StationQueryParams) => {
        setIsLoading(true);
        console.log('api요청 필터: ', newParams);

        try{
            // 동일한 API Client 사용(자동으로 http 요청됨)
            const newData = await stationApiClient.getStations(newParams);

            console.log(newData);
            setData(newData);
            setCurrentParams(newParams);
        } catch(error) {
            console.error('Failed to fetch stations: ', error);
            alert('충전소 정보를 불러오는 데 실패했습니다.');
            // FIXME 에러처리
        } finally {
            setIsLoading(false);
        };
    }, []);

    // 필터 변경(위치는 유지)
    const handleFilterChange = useCallback((
        newFilter: Partial<Pick<StationQueryParams, 'canUse' | 'parkingFree' | 'isOpen' | 'radius'>>
    ) => {
        const newParams: StationQueryParams = {
            ...currentParams,
            ...newFilter,
        };

        fetchStations(newParams);
    }, [currentParams, fetchStations]);

    // 위치만 변경 (필터는 유지)
    const handleLocationChange = useCallback((lat: number, lng: number) => {
        const newParams: StationQueryParams = {
            ... currentParams,
            lat,
            lng,
        }

        fetchStations(newParams);
    }, [currentParams, fetchStations])

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
                    onFilterChange={handleFilterChange}
                    currentFilter={currentParams}
                    isLoading={isLoading}
                />
            </aside>
            <main className='relative h-full flex-1'>
                {/* 필터 UI 예시 */}
                {/* <div className="p-4 border-b">
                <button
                    onClick={() => handleFilterChange({ 
                    ...currentParams, 
                    parkingFree: !currentParams.parkingFree 
                    })}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    {isLoading ? '로딩 중...' : '무료 주차만 보기'}
                </button>
                </div> */}
                <StationSearchMap 
                    markers={data.markers}
                    selectedStatId = {selectedStatId}
                    onSelected = {setSelectedStatId}
                    // onLocationChange={handleLocationChange}
                    // currentLat={currentParams.lat}
                    // currentLng={currentParams.lng}
                    // isLoading={isLoading}
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
