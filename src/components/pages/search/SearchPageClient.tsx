'use client'

import { useState, useMemo } from 'react'

import StationListPanel from './StationListPanel'
import StationSearchMap from './StationSearchMap'
import StationDetailPanel from './StationDetailPanel'
import { StationResponse, StationListDto } from '@/types/station'

interface SearchPageClientProps {
    data: StationResponse
}

export default function SearchPageClient({data}: SearchPageClientProps) {
    const [selectedStatId, setSelectedStatId] = useState<string|null>(null);

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
