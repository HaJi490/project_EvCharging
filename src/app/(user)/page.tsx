import { getStations } from '@/mocks/domain/station.domain';
import { fetchStations } from '@/services/stationService'
import SearchPageClient  from '@/components/pages/search/SearchPageClient'
import { StationResponse } from '@/types/station'


export default async function page({searchParams}: {
    searchParams: {
      lng?: string,
      radius?: string,
      canUse?: string,
      parkingFree?: string,
      isOpen?: string,
    }
  }) {
  const params = }{
    
  }

  const resp = fetchStations(params);

  if(!resp.success){
    // 에러 처리
  }
  return (
    <SearchPageClient data={resp.data}/>
  )
}