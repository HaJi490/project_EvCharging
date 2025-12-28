import React from 'react'

import StationItem from './StationItem';
import { StationListDto } from '@/types/station'

interface StationListProps {
  list: StationListDto[]
}
export default function StationList({list}: StationListProps) {
  console.log(list.length);
  return (
    <div>
      {list.map(station => (
        <StationItem key={station.statId} 
                      stat={station}/>
      ))}
    </div>
  )
}
