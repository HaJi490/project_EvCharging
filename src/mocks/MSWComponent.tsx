'use client'

import { useEffect, useState } from 'react'
// import { worker } from './browser'

export default function MSWComponent({ children }: { children: React.ReactNode }) {
    const useMSW = process.env.NEXT_PUBLIC_USE_MSW === 'true';
    const [isWorkerREady, setIsWorkerReady] = useState(false);

    useEffect(() => {
        // 1. 서버환경 체크
        if (typeof window === 'undefined') {
            console.log('서버환경 없음');
            return;
        }

        // 2. MSW 사용여부
        if (!useMSW) {
            console.log('useMSW_false_실제 백엔드 사용');
            return;
        }

        import('./browser')
            .then(async ({ worker }) => {
                await  worker.start({ onUnhandledRequest: 'bypass' });
                console.log('MSW Worker Started');
                setIsWorkerReady(true); // 에러나도 앱은 렌더링
            })
            .catch(err => {
                console.error('MSW Worker Start Failed:', err);
                setIsWorkerReady(true);
            })
    }, [useMSW])


    return (
        <>{children}</>
    )
}
