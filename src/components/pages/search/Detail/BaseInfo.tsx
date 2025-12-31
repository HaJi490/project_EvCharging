import React from 'react'

interface BaseInfoProps {
    label: string
    info: string |undefined
}

export default function BaseInfo({
    label,
    info
}: BaseInfoProps) {
  return (
    <div className='flex gap-3 items-center text-sm'>
        <span className='w-15 text-gray-500'>{label}</span>
        <span className='text-gray-800'>{info}</span>
    </div>
  )
}
