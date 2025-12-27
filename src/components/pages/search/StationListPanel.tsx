import React from 'react'

import StationSearch from './Panel/StationSearch'
import StationList from './Panel/StationList'
import { StationListDto } from '@/types/station'

interface StationListProps {
  list: StationListDto[]
}

export default function StationListPanel({list}:StationListProps) {
  return (
    <div className='w-full h-full bg-gray-50 flex-shrink-0'>
        <div className='w-full h-16 border-b border-gray-200'>
            <StationSearch />
        </div>
        <div>
            <StationList list={list}/>
        </div>
    </div>
  )
}
