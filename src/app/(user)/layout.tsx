import React from 'react'
import UserNav from "@/components/User/Nav/UserNav";

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='h-screen flex flex-col'>
      <UserNav/>
      <main className='flex-1 overflow-hidden'>
        {children}
      </main>
    </div>
  )
}
