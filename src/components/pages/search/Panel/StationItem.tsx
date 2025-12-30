import { useEffect, useRef } from 'react'

import { StationListDto } from '@/types/station'
import { Star } from 'lucide-react';

interface StationItemProps {
    stat: StationListDto
    selectedStatId: string | null
    onSelected: (statId: string) => void
}

export default function StationItem({
    stat,
    selectedStatId, 
    onSelected
}: StationItemProps) {
    const isSelected = stat.statId === selectedStatId;
    const ref = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (isSelected){
            ref.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [isSelected]);


    return (
        <li className={` p-3 ${isSelected ? 'bg-main/20 rounded-md' : ''}`}
            onClick={() => onSelected(stat.statId)}
            ref = {ref}
        >
            <div className='flex justify-between'>
                <h2 className=' font-semibold'>{stat.statNm}</h2>
                <span className='icon text-gray-200'><Star/></span>
            </div>
            <p className='text-sm'>{stat.addr}</p>
            <div className='flex gap-2'>
                {stat.limitYn ? <span className='text-main'>개방</span> : <span className='text-gray-500'>개방</span>}
                {stat.parkingFree ? <span className='text-main'>무료주차</span> : <span className='text-gray-500'>유료주차</span>}
            </div>
            
        </li>
    )
}
