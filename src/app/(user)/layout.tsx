import React from 'react'
import UserNav from "@/components/User/Nav/UserNav";

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <UserNav/>
      <main>
        {children}
      </main>
    </div>
  )
}
