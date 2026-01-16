import { stationService } from '@/server/domain/station/station.service';
import { fetchStations } from '@/services/stationService'
import SearchPageClient  from '@/components/pages/search/SearchPageClient'
import { StationQueryParams } from '@/types/station'

interface PageProps {
  // searchParams: {
  //     lat?: string;
  //     lng?: string,
  //     radius?: string,
  //     canUse?: string,
  //     parkingFree?: string,
  //     isOpen?: string,
  // }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page(props: PageProps) {
  const searchParams = await props.searchParams;

  const params: StationQueryParams = {
    lat:  Number(searchParams.lat) || 35.18, // 부산시청
    lng: Number(searchParams.lng) || 129.06,
    radius: Number(searchParams.radius) || 1000,
    canUse: searchParams.canUse === 'true',
    parkingFree: searchParams.parkingFree === 'true',
    isOpen: searchParams.isOpen === 'true',
  };

  // 서버에서 직접 domain 로직 호출
  const data = stationService.getStations(params);

  return (
    <SearchPageClient initialData={data} initialParams={params}/>
  )
}