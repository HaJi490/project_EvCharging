'use client'

import { useState, useMemo } from 'react';
import Map, { ViewStateChangeEvent } from 'react-map-gl/mapbox';

import { StationMarkerDto } from '@/types/station';

interface StationSearchMap {
  markers: StationMarkerDto[]
}

export default function StationSearchMap({markers}: StationSearchMap) {
    const [ viewState, setViewState ] = useState({
        longitude: 129.06, // 부산시청
        latitude: 35.18,
        zoom: 13,
    }); 

    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div className='w-full h-full'>
        <Map {...viewState}
            mapboxAccessToken = {MAPBOX_TOKEN}
            mapStyle='mapbox://styles/mapbox/light-v11'
            style={{width: '100%', height: '100%'}}
            onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)} // 지도 이동 이벤트 처리
        />
    </div>
  )
}
