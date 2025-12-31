import React from 'react'

import BaseInfo from './Detail/BaseInfo'
import IconBtn from './Detail/IconBtn'
import { StationListDto } from '@/types/station'
import { Star } from 'lucide-react'
import { MousePointer2 } from 'lucide-react';


interface StationDetailPanelProps {
    statId: string | null
    station: StationListDto | null
}

export default function StationDetailPanel({ 
    statId,
    station
}: StationDetailPanelProps) {
    return (
        <div className='w-full h-full p-3 flex flex-col gap-2'>
            <h2 className=' font-semibold'>{station?.statNm}</h2>
            
            <div className='flex flex-col gap-1'>
                <BaseInfo label='주소' info={station?.addr} />
                <BaseInfo label='운영시간' info={station?.useTime} />
                <BaseInfo label='운영기관' info={station?.busiNm} />
            </div>
            <div className='w-full grid grid-cols-2 border-y border-gray-200'>
                <IconBtn label='저장' icon={<Star/>} />
                <IconBtn label='길찾기' icon={<MousePointer2/>} />
            </div>
            <div className='flex-1 bg-gray-100'>
            </div>
        </div>
    )
}
