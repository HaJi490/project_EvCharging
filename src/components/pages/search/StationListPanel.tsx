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
    <div className='w-full h-full bg-gray-50 flex-shrink-0'>
        <div className='w-full h-16 border-b border-gray-200'>
            <StationSearch />
        </div>
        <ul className='h-full overflow-y-auto scrollbar-hide'>
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
