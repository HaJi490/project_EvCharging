import React from 'react'
import AdminNav from '@/components/Admin/Nav/AdminNav'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='h-screen flex overflow-hidden'>
            <AdminNav/>
            <main className='flex-1 overflow-y-auto p-6'>
                {children}
            </main>
        </div>
    )
}
