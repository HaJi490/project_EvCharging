import React from 'react'

import { Search } from 'lucide-react';
import { SlidersHorizontal  } from 'lucide-react';

export default function StationSearch() {
  return (
    <div className='w-full h-full p-3 flex gap-3 items-center'>
        <div className='flex-1 h-10 p-3 bg-main/20 rounded-full 
                        flex items-center justify-end'>
            <input type='text' placeholder='충전소 검색' className='flex-1 outline-none px-2 '/>
            <div className='icon text-main cursor-pointer'>
                <Search />
            </div>
        </div>
        <div className='icon text-main cursor-pointer'>
            <SlidersHorizontal  />
        </div>
      
    </div>
  )
}
