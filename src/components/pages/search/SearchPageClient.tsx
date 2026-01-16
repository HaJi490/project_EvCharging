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

interface SearchPageClientProps {
    initialData: StationResponse;
    initialParams: StationQueryParams;
}

export default function SearchPageClient({initialData, initialParams}: SearchPageClientProps) {
    const [data, setData] = useState(initialData);
    const [params, setParams] = useState(initialParams);
    const [selectedStatId, setSelectedStatId] = useState<string|null>(null);

    // 필터 변경 시 클라이언트 재요청
    const handleFilterChange = async (newParams: StationQueryParams) => {
        const query = new URLSearchParams({
            lat: String(newParams.lat),
            lng: String(newParams.lng),
            radius: String(newParams.radius),
            canUse: String(newParams.canUse),
            parkingFree: String(newParams.parkingFree),
            isOpen: String(newParams.isOpen),
        });

        const res = await fetch(`/api/stations?${query}`);
        const result = await res.json;

        if (result.success) {   //FIXME api/stations/route.ts
            setData(result.data);
            setParams(newParams);
        }
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
