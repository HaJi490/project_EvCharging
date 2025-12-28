import { getStaions } from '@/mocks/domain/station.domain';
import { fetchStations } from '@/services/stationService'
import SearchPageClient  from '@/components/pages/search/SearchPageClient'
import { StationResponse } from '@/types/station'


export default async function page() {
  // const res = await fetchStations();

  // if (res.error || !res.data) {
  //   throw new Error(res.error?.message ?? 'Unknown error')
  // }
  const data = getStaions();

  
  return (
    <SearchPageClient data={data}/>
    // <div className='w-full h-screen flex'>
    //   <div className='w-96 h-full'>
    //     <StationListPanel list= {data.list}/>
    //   </div>
    //   <div className='h-full flex-1 '>
    //     <StationSearchMap markers= {data.markers}/> 
    //   </div>
    // </div>
  )
}