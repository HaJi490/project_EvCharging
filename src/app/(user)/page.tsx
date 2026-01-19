import { stationService } from '@/server/domain/station/station.service';
import { StationApiClient } from '@/lib/api-client/station-client';  
import SearchPageClient  from '@/components/pages/search/SearchPageClient'
import { StationQueryParams } from '@/types/station'

interface PageProps {
  searchParams: {
      lat?: string;
      lng?: string,
      radius?: string,
      canUse?: string,
      parkingFree?: string,
      isOpen?: string,
  }
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: PageProps) {
  // const searchParams = await props.searchParams;

  const params: StationQueryParams = {
    lat:  Number(searchParams.lat) || 35.18, // 부산시청
    lng: Number(searchParams.lng) || 129.06,
    radius: Number(searchParams.radius) || 1000,
    canUse: searchParams.canUse === 'true',
    parkingFree: searchParams.parkingFree === 'true',
    isOpen: searchParams.isOpen === 'true',
  };

  try{
    // ✨ 핵심: 동일한 인터페이스
    // - 개발: domain 직접 호출
    // - 프로덕션: 실제 API 호출 (환경변수로 제어)
    const data = stationService.getStations(params);
  
    return (
      <SearchPageClient initialData={data} initialParams={params}/>
    )
  } catch (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">데이터를 불러올 수 없습니다</h1>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : '알 수 없는 오류'}
          </p>
        </div>
      </div>
    )
  }
}