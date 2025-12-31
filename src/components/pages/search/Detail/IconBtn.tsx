import React from 'react'

interface IconBtnProps {
    icon: React.ReactNode
    label: string
    onClick?: () => void
}

export default function IconBtn({
    icon,
    label,
    onClick
}: IconBtnProps) {
    return (
        <button className='flex flex-col items-center gap-1 p-3 text-gray-500 rounded-md
                            hover:text-main hover:bg-gray-100 cursor-pointer'
            onClick={onClick}
        >
            <span className='icon'>{icon}</span>
            <span className='text-sm'>{label}</span>
        </button>
    )
}
