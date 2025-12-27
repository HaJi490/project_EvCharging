import React from 'react'

import StationListPanel from './StationListPanel'
import StationSearchMap from './StationSearchMap'
import { StationResponse } from '@/types/station'

interface SearchPageClientProps {
    data: StationResponse
}

export default function SearchPageClient({data}: SearchPageClientProps) {
    return (
        <div className='w-full h-screen flex'>
            <div className='w-96 h-full'>
                <StationListPanel list={data.list} />
            </div>
            <div className='h-full flex-1 '>
                <StationSearchMap markers={data.markers} />
            </div>
        </div>
    )
}
