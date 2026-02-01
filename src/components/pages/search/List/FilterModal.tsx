'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

import { TAB_MENU, CHARGING_COMPANY, RANGE } from '@/constants/filter'
import FilterSectionWrapper from './FilterSections/FilterSectionWrapper'
import ChargerCompSelection from './FilterSections/ChargerCompSelection'
import ToggleButtonGroup from './FilterSections/ToggleButtonGroup'
import { StationQueryParams } from '@/types/station'
import { X } from 'lucide-react'
import ToggleBadge from '@/components/ui/ToggleBadge'

interface StationFilterProps {
    isOpen: boolean
    onClose: () => void
    onApplyFilters: (filters: Partial<Pick<StationQueryParams, 'canUse' | 'parkingFree' | 'isOpen' | 'radius'>>) => void
    currentFilter: StationQueryParams
}

export default function FilterModal({
    isOpen, 
    onClose, 
    onApplyFilters, 
    currentFilter
}: StationFilterProps) {
    const [localFilters, setLocalFilters] = useState<Partial<Pick<StationQueryParams, 'canUse' | 'parkingFree' | 'isOpen' | 'radius'>>>({
        canUse: currentFilter.canUse ?? false,
        parkingFree: currentFilter.parkingFree ?? false,
        isOpen: currentFilter.isOpen ?? false,
        radius: currentFilter.radius ?? 1000,
    });
    const [activeTab, setActiveTab] = useState<string>('속성');
    // 1. Ref Array 선언: 모든 DOM 노드를 저장할 하나의 Map 객체를 사용
    const sectionRef = useRef<Map<string, HTMLDivElement>>(new Map());

    // 2. Ref 설정 함수: 렌더링 시 DOM 노드를 Map에 추가하는 함수
    const setRef = (id: string, node: HTMLDivElement|null) => {
        if(node) {
            sectionRef.current.set(id, node);
        } else {
            sectionRef.current.delete(id);
        }
    };

    // 탭메뉴 클릭 핸들러
    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
        const element = sectionRef.current.get(tabName);
        if(element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }

    const handleLocalPropToggle = (key: 'canUse' | 'parkingFree' | 'isOpen') => {
        setLocalFilters(prev => ({
            ...prev,
            // ⭐️ 전달된 key의 값만 토글
            [key]: !prev[key], 
        }));
    };


    useEffect(() => {
        if(isOpen) {
            setLocalFilters({
                radius: currentFilter.radius,
                canUse: currentFilter.canUse,
                parkingFree: currentFilter.parkingFree,
                isOpen: currentFilter.isOpen,
            })
        }
    },[isOpen, currentFilter]);

    // 필터 적용버튼 클릭
    const handleApply = () => {
        console.log('모달 필터 적용: ', localFilters);
        onApplyFilters(localFilters);
    };

    // 필터 초기화
    const handleReset = () => {
        const resetFilters = {
            radius: 1000,
            canUse: false,
            parkingFree: false,
            isOpen: false,
        };
        setLocalFilters(resetFilters);
    }
    
    if(!isOpen) return null;

    return (
        <>
            {/* 배경 오버레이 */}
            <div 
                className="fixed inset-0 z-40 bg-black/50"
                onClick={onClose}
            />

            {/* 모달 */}
            <div className="fixed inset-0 z-50 p-4 
                            flex items-center justify-center "
            >
                <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl 
                                flex flex-col gap-5"
                >
                    {/* 헤더 */}
                    <div className="flex items-center justify-between  ">
                        <h2 className="text-xl font-bold">필터</h2>
                        <button 
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* 탭메뉴 */}
                    <div className='sticky flex gap-2 pb-3 border-b border-gray-400'>
                        {TAB_MENU.map(item => (
                            <button key={item.value}
                                    className={`font-bold text-gray-400 cursor-pointer ${activeTab === item.value && 'text-main'}`}
                                    onClick={() => handleTabClick(item.value)}
                            >
                                {item.value}
                            </button>
                        ))}
                    </div>

                    {/* 본문 */}
                    <div className='flex-1 overflow-y-auto pr-1'>
                        <FilterSectionWrapper id='속성' title='속성' setRef={setRef}>
                            <div className='flex gap-2'>
                                <ToggleBadge label='충전가능'
                                            isActive={localFilters.canUse}
                                            onClick={()=>handleLocalPropToggle('canUse')}
                                />
                                <ToggleBadge label='개방'
                                            isActive={localFilters.isOpen}
                                            onClick={()=>handleLocalPropToggle('isOpen')}
                                />
                                <ToggleBadge label='무료주차'
                                            isActive={localFilters.parkingFree}
                                            onClick={()=>handleLocalPropToggle('parkingFree')}
                                />
                            </div>
                        </FilterSectionWrapper>
                        <FilterSectionWrapper id='탐색반경' title='탐색반경' setRef={setRef}>
                            {RANGE.map(item => (
                                <ToggleBadge key={item.value} 
                                            label={item.value}
                                            isActive={localFilters.radius === item.value}
                                            onClick={}
                                />
                            ))

                            }
                        </FilterSectionWrapper>
                    </div>

                    {/* 푸터 */}
                    <div className="flex gap-3 p-6 border-t">
                        <button
                            onClick={handleReset}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                        >
                            초기화
                        </button>
                        <button
                            onClick={handleApply}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                            적용
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
