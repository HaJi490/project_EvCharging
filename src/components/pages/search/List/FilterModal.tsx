'use client'

import { useState, useEffect } from 'react'

import { StationQueryParams } from '@/types/station'
import { X } from 'lucide-react'

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
        canUse: currentFilter.canUse,
        parkingFree: currentFilter.parkingFree,
        isOpen: currentFilter.isOpen,
        radius: currentFilter.radius,
    });

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
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* 모달 */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-xl font-bold">필터</h2>
                        <button 
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* 본문 */}
                    <div className="p-6 space-y-6">
                        {/* 검색 반경 */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                검색 반경: {localFilters.radius}m
                            </label>
                            <input
                                type="range"
                                min="500"
                                max="5000"
                                step="100"
                                value={localFilters.radius}
                                onChange={(e) => setLocalFilters({
                                    ...localFilters,
                                    radius: Number(e.target.value)
                                })}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>500m</span>
                                <span>5km</span>
                            </div>
                        </div>

                        {/* 토글 필터들 */}
                        <div className="space-y-3">
                            {/* 사용 가능 */}
                            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <span className="font-medium">사용 가능한 충전소만</span>
                                <input
                                    type="checkbox"
                                    checked={localFilters.canUse}
                                    onChange={(e) => setLocalFilters({
                                        ...localFilters,
                                        canUse: e.target.checked
                                    })}
                                    className="w-5 h-5 text-blue-600"
                                />
                            </label>

                            {/* 무료 주차 */}
                            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <span className="font-medium">무료 주차 가능</span>
                                <input
                                    type="checkbox"
                                    checked={localFilters.parkingFree}
                                    onChange={(e) => setLocalFilters({
                                        ...localFilters,
                                        parkingFree: e.target.checked
                                    })}
                                    className="w-5 h-5 text-blue-600"
                                />
                            </label>

                            {/* 운영 중 */}
                            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <span className="font-medium">현재 운영 중</span>
                                <input
                                    type="checkbox"
                                    checked={localFilters.isOpen}
                                    onChange={(e) => setLocalFilters({
                                        ...localFilters,
                                        isOpen: e.target.checked
                                    })}
                                    className="w-5 h-5 text-blue-600"
                                />
                            </label>
                        </div>
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
