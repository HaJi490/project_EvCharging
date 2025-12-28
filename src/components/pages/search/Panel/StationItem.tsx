import React from 'react'

import { StationListDto } from '@/types/station'

interface StationItemProps {
    stat: StationListDto
}

export default function StationItem({stat}: StationItemProps) {
    return (
        <div className='border-b p-3'>
            <h2 className=' font-semibold'>{stat.statNm}</h2>
            <p className='text-sm'>{stat.addr}</p>
            <div className='flex gap-2'>
                {stat.limitYn ? <span className='text-main'>개방</span> : <span className='text-gray-500'>개방</span>}
                {stat.parkingFree ? <span className='text-main'>무료주차</span> : <span className='text-gray-500'>유료주차</span>}
            </div>
            
        </div>
    )
}
