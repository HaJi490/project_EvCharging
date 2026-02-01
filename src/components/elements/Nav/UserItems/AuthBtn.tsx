import React from 'react'
import Link from 'next/link'

export default function AuthBtn() {
    return (
        <div className='flex gap-5 items-center'>
            <Link href={'/login'} className='hover:bg-main hover:cursor-pointer'>로그인</Link>
            <button className='px-5 py-2 bg-main rounded-full text-white hover:bg-main/80 hover:cursor-pointer'>회원가입</button>
        </div>
    )
}
