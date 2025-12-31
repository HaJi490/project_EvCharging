import { getStaions } from '@/mocks/domain/station.domain';
import { fetchStations } from '@/services/stationService'
import SearchPageClient  from '@/components/pages/search/SearchPageClient'
import { StationResponse } from '@/types/station'


export default async function page() {

  const data = fetchStations();

  
  return (
    <SearchPageClient data={data}/>
  )
}