import React from 'react'

import NavItem from './NavItem';
import { LayoutDashboard } from 'lucide-react';
import { EvCharger } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { MessageCircleQuestionMark } from 'lucide-react';

interface NavMenuProps {
    isExpand: boolean;
}

const ICON_SIZE = 24;

const admin_items = [
    { href: '/login', label: '대시보드', icon: <LayoutDashboard /> },
    { href: '/login', label: '충전소 관리', icon: <EvCharger /> },
    { href: '/login', label: '회원 관리', icon: <UserCheck /> },
    { href: '/login', label: '문의 관리', icon: <MessageCircleQuestionMark /> }
]

export default function NavMenu({isExpand}: NavMenuProps) {
    return (
        <ul className='w-full space-y-3 flex-1'>
            {admin_items.map((item) => (
                <NavItem key={item.label} 
                        href={item.href} icon={item.icon} isExpand={isExpand}>
                    {item.label}
                </NavItem>
            ))}
    
        </ul>

    )
}
