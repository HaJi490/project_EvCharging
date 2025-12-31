'use client'

import { useState, useEffect } from 'react';
import Map, { Marker, ViewStateChangeEvent } from 'react-map-gl/mapbox';

import { StationMarkerDto } from '@/types/station';

interface StationSearchMap {
  markers: StationMarkerDto[],
  selectedStatId: string | null,
  onSelected: (statId: string) => void
}

export default function StationSearchMap({
  markers, 
  selectedStatId,
  onSelected
}: StationSearchMap) {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  const [ viewState, setViewState ] = useState({
      // longitude: 129.06, // 부산시청
      // latitude: 35.18,
      longitude: 129.094, // 금정구 중심
      latitude: 35.240,
      zoom: 13,
  }); 

//   useEffect(() => {
//   if (!selectedId) return;

//   setViewState((prev) => ({
//     ...prev,
//     longitude: selectedStation.lng,
//     latitude: selectedStation.lat,
//   }))
// }, [selectedId])


  return (
    <div className='w-full h-full'>
        <Map {...viewState}
            mapboxAccessToken = {MAPBOX_TOKEN}
            mapStyle='mapbox://styles/mapbox/light-v11'
            style={{width: '100%', height: '100%'}}
            onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)} // 지도 이동 이벤트 처리
        >
            {markers.map(stat => {
              const isSelected = stat.statId === selectedStatId;

              return (
                <Marker 
                  key={stat.statId}
                  longitude={stat.lng}
                  latitude={stat.lat}
                  anchor='bottom'
                >
                  <div className={`w-3 h-3 rounded-full ${isSelected? 'bg-red-600 scale-125'  : 'bg-main'} border border-white`}
                        onClick={() => onSelected(stat.statId)}/>
                </Marker>
              )
            })}
        </Map>
    </div>
  )
}
