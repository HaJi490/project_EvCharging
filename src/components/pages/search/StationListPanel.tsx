import React from 'react'

import StationSearch from './List/StationSearch'
// import StationList from './Panel/StationList' 삭제해도 될듯
import StationItem from './List/StationItem'
import { StationListDto, StationQueryParams } from '@/types/station'

interface StationListProps {
  list: StationListDto[]
  selectedStatId: string | null
  onSelected: (statId: string) => void
  onFilterChange: (filters: Partial<Pick<StationQueryParams, 'canUse' | 'parkingFree' | 'isOpen' | 'radius'>>) => void
  currentFilter: StationQueryParams
  isLoading: boolean
}

export default function StationListPanel({
  list, 
  selectedStatId, 
  onSelected,
  onFilterChange,
  currentFilter,
  isLoading
}:StationListProps) {
  return (
    <div className='w-full h-full flex-shrink-0 flex flex-col bg-gray-50'>
        <div className='w-full h-16 flex-shrink-0 border-b border-gray-200 '>
            <StationSearch 
              onFilterChange={onFilterChange}
              currentFilter={currentFilter}
              isLoading={isLoading}
            />
        </div>
        <ul className='flex-1 overflow-y-auto scrollbar-hide scroll-pt-4'>
            {/* 로딩중 표시 */}
            {isLoading &&
              <div className='p-4 text-center text-gray-500'>
                <div className='h-8 w-8 mx-auto mb-2 border-b-2 border-main 
                                animate-spin rounded-full '
                >
                </div>
                검색 중...
              </div>
            }
            {/* 결과 없음 표시 */}
            {!isLoading && list.length === 0 && (
              <div className='p-4 text-center text-gray-500'>
                검색 결과가 없습니다.
              </div>
            )
            }
            {/* 충전소 목록 */}
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
