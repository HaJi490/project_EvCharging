import React from 'react'
import { cn } from '@/lib/utils/utils'

interface ToggleBadgeProps {
    label: string | number
    isActive?: boolean
    onClick: (key:'canUse' | 'parkingFree' | 'isOpen') => void
    className?: string
}

export default function ToggleBadge({
    label,
    isActive = false,
    onClick,
    className
}: ToggleBadgeProps) {
    const baseStyle = `px-4 py-1.5 border rounded-full
                ${isActive
                ? 'border-main text-main font-semibold bg-main/5 cursor-pointer' 
                : 'border-gray-200 text-gray-400 bg-transparent hover:bg-main/5 hover:border-main hover:text-main cursor-pointer'}`;
    return (
        <button onClick={onClick}
                className={cn(baseStyle, className)}
        >
            {label}
        </button>
    )
}
