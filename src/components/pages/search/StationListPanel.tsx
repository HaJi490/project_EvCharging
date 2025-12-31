import React from 'react'

import StationSearch from './Panel/StationSearch'
// import StationList from './Panel/StationList' 삭제해도 될듯
import StationItem from './Panel/StationItem'
import { StationListDto } from '@/types/station'

interface StationListProps {
  list: StationListDto[]
  selectedStatId: string | null
  onSelected: (statId: string) => void
}

export default function StationListPanel({
  list, 
  selectedStatId, 
  onSelected
}:StationListProps) {
  return (
    <div className='w-full h-full flex-shrink-0 flex flex-col bg-gray-50'>
        <div className='w-full h-16 flex-shrink-0 border-b border-gray-200 '>
            <StationSearch />
        </div>
        <ul className='flex-1 overflow-y-auto scrollbar-hide scroll-pt-4'>
            {/* <StationList 
              list={list}
              selectedStatId={selectedStatId}
              onSelected={onSelected}  
            /> */}
            {list.map(stat => (
                <StationItem 
                  key={stat.statId} 
                  stat={stat}
                  selectedStatId = {selectedStatId}
                  onSelected={onSelected}
                />
              ))}
        </ul>
    </div>
  )
}
