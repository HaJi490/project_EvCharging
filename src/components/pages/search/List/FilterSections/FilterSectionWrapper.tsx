import React from 'react'
import { cn } from '@/lib/utils/utils'

interface FilterSectionWrapperProps {
  id: string
  title: string
  children: React.ReactNode
  setRef: (id: string, node: HTMLDivElement | null) => void
  className?: string
}

export default function FilterSectionWrapper({id, title, children, setRef, className}: FilterSectionWrapperProps) {
  return (
    <div ref={node => setRef(node, id)} id={id} className={cn('mb-8', className)}>
      <h4 className='mb-2 text-gray-800'>{title}</h4>
      {children}
    </div>
  )
}
