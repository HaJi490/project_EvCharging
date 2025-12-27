
import { fetchStations } from '@/services/stationService'
import SearchPageClient  from '@/components/pages/search/SearchPageClient'
import { StationResponse } from '@/types/station'


export default async function page() {
  const data = await fetchStations();

  
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