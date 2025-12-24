import React from 'react'

import StationSearch from './Items/StationSearch'
import StationList from './Items/StationList'

export default function StationListPanel() {
  return (
    <div className='w-full h-full bg-gray-50 flex-shrink-0'>
        <div className='w-full h-16 border-b border-gray-200'>
            <StationSearch />
        </div>
        <div>
            <StationList />
        </div>
    </div>
  )
}
