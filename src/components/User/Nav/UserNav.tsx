import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import NavItem from './Items/NavItem'
import AuthBtn from './Items/AuthBtn'

export default function UserNav() {
  return (
    <nav className='w-full h-20 border border-b border-gray-200 flex items-center justify-center'>
      <div className='w-full max-w-screen-2xl px-4 md:px-8 lg:px-12 flex items-center justify-between '>
        <Link href='/'>
          <Image className="dark:invert "
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
          />
        </Link>
        <ul className='flex gap-10'> 
          <NavItem href={'/company'}>회사소개</NavItem>
          <NavItem href={'/guide'}>이용안내</NavItem>
          <NavItem href={'/'}>충전소 현황</NavItem>
          <NavItem href={'/route'}>최적 경로</NavItem>
        </ul>

        {/* NavItem 모음만들기 -> 역할분담 */}
        {/* import NavItem from './Items/User/NavItem';

        // 메뉴 데이터 정의 (URL과 이름)
        const USER_MENU_ITEMS = [
          { href: '/about', label: '회사소개' },
          { href: '/guide', label: '이용안내' },
          // ...
        ];

        export default function UserNavMenu() {
          return (
            <ul className='flex gap-10'>
              {/* 데이터 기반으로 NavItem 렌더링 (map 함수 사용) 
              {USER_MENU_ITEMS.map((item) => (
                <NavItem key={item.href} href={item.href}>
                  {item.label}
                </NavItem>
              ))}
            </ul>
          );
        } */}
        <AuthBtn />
      </div>
    </nav>
  )
}
