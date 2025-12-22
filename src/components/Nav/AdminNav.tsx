'use client'

import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

import NavMenu from '../Admin/Nav/Items/NavMenu'
import style from '@/styles/isExpanded.module.css'

export default function AdminNav() {
    const [isExpand, setIsExpand] = useState(false);

    const navWidth = isExpand ? 'w-52' : 'w-16';
    return (
        <nav className={`${navWidth} h-full p-4 bg-white border-r border-gray-200 
                        flex-shrink-0 flex flex-col items-center
                        ${style.isInOut}`}
            onMouseEnter={()=>setIsExpand(true)}
            onMouseLeave={()=>setIsExpand(false)}
        >
                <div className='h-25 mb-8 flex justify-center'>
                    <Image src='/globe.svg' alt='vercel logo' width={70} height={20} priority/>
                </div>

                <NavMenu isExpand={isExpand}/>

                <div className='w-full mt-8 pt-4 border-t border-gray-200'>
                    {isExpand && <p>관리자 정보</p>}
                </div>
        </nav>
    )
}
