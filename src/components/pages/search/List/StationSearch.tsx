import { useState } from 'react'

import FilterModal from './FilterModal';
import { StationQueryParams } from '@/types/station'
import { Search, SlidersHorizontal } from 'lucide-react';

interface StationSearchProps {
    onFilterChange: (filters: Partial<Pick<StationQueryParams, 'canUse' | 'parkingFree' | 'isOpen' | 'radius'>>) => void
    currentFilter: StationQueryParams
    isLoading: boolean
}

export default function StationSearch({ 
    onFilterChange, 
    currentFilter, 
    isLoading 
}: StationSearchProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleApplyFilters = (
        newFilters: Partial<Pick<StationQueryParams, 'canUse' | 'parkingFree' | 'isOpen' | 'radius'>>
    ) => {
        console.log('필터 적용: ', newFilters);

        setIsFilterOpen(false); //모달 닫기
        onFilterChange(newFilters); //부모로 필터변경 전달
    };

    return (
        <div className='w-full h-full p-3 flex gap-3 items-center'>
            <div className='flex-1 h-10 p-3 bg-main/20 rounded-full 
                        flex items-center justify-end'>
                <input type='text' 
                    placeholder='충전소 검색' 
                    className='flex-1 outline-none px-2 ' 
                />
                <div className='icon text-main cursor-pointer'>
                    <Search />
                </div>
            </div>
            <button onClick={()=> setIsFilterOpen(true)}
                    disabled={isLoading}
                    className='icon text-main cursor-pointer 
                                disabled:opacity-50 disabled:cursor-not-allowed'
            >
                <SlidersHorizontal />
            </button>
            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApplyFilters={handleApplyFilters}
                currentFilter={currentFilter}
            />
        </div>
    )
}
