import { useState, useRef} from 'react'

import { Search } from 'lucide-react';
import { SlidersHorizontal  } from 'lucide-react';
import StationFilter from './StationFilter';

interface StationSearchProps {
    selectedStatId: string | null
}

export default function StationSearch({selectedStatId}: StationSearchProps) {
    const [isFilterOpen, setIsFilerOpen] = useState(false);
    const closeDetailRef = useRef<HTMLButtonElement | null>(null);

    const handleOpenFilter = () => {
        // FIXME 상세패널 먼저 닫기
        setIsFilerOpen(true);
    }

  return (
    <div className='w-full h-full p-3 flex gap-3 items-center'>
        <div className='flex-1 h-10 p-3 bg-main/20 rounded-full 
                        flex items-center justify-end'>
            <input type='text' placeholder='충전소 검색' className='flex-1 outline-none px-2 '/>
            <div className='icon text-main cursor-pointer'>
                <Search />
            </div>
        </div>
        <button ref = {closeDetailRef}
                onClick={handleOpenFilter}
                className='icon text-main cursor-pointer'>
            <SlidersHorizontal  />
        </button>
        <StationFilter 
            isOpen={isFilterOpen} 
            onClose={() => setIsFilterOpen(false)}
            onApplyFilters={handleApplyFilters}
            initialFilters={currentFilter}
        />
    </div>
  )
}
