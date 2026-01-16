import React from 'react'
import Link from 'next/link'

import style from '@/styles/isExpanded.module.css'

type IconProps = {
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

interface NavItemProps {
    href: string;
    children: React.ReactNode; //<NavItem>과 </NavItem> 사이 내용
    icon: React.ReactElement<IconProps>;
    isExpand: boolean;
}


export default function NavItem({href, children, icon, isExpand} : NavItemProps) {
  const ICON_SIZE = 24;
  
  return (
    <li className='w-full'>
        
        <Link href={href} 
              className={`icon ${isExpand && 'px-2'} py-2.5 hover:bg-gray-100 rounded
                        flex gap-2.5 items-center
                        hover:text-main  hover:cursor-pointer`}>
          {/* {icon} */}
          {React.cloneElement(icon, { size: ICON_SIZE, width: ICON_SIZE, height: ICON_SIZE as IconProps})}
          {isExpand &&
              <div  className={style.opacityControl}>
                  {children}
              </div>
          }
        </Link>
    </li>
  )
}
