// FIXME DELETEㄱㄱ
import React from 'react'

import StationItem from './StationItem';
import { StationListDto } from '@/types/station'

interface StationListProps {
  list: StationListDto[]
  selectedStatId: string | null
  onSelected: (statId: string) => void 
}
export default function StationList({
  list, 
  selectedStatId, 
  onSelected
}: StationListProps) {
  console.log(list.length);
  return (
    <ul>
      {list.map(stat => (
        <StationItem 
          key={stat.statId} 
          stat={stat}
          selectedStatId = {selectedStatId}
          onSelected={onSelected}
        />
      ))}
    </ul>
  )
}
