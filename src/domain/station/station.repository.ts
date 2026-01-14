import rawData from '@/mocks/data/fetchStations.json';
import { StationRaw } from '@/mocks/types/stationRaw';

export class StationRepository {
    private data: StationRaw[];

    constructor() {
        this.data = rawData as unknown as StationRaw[];
    }
    
    findAll(): StationRaw[] {
        return this.data;
    }

    findByArea(lat: number, lng: number, radius: number): StationRaw[] {
        return this.data.filter(stat => {
            // 실제 거리계산 로직x
            const distance = this.calculateDistance(
                lat, lng, stat.lat, stat.lng
            );
            return distance <= radius;
        });
    }

    private calculateDistance(
        lat1: number, lng1: number,
        lat2: number, lng2: number,
    ): number {
        // Haversine formula 또는 간단한 거리 계산
        const R = 6371e3; // 지구 반지름 (미터)
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lng2 - lng1) * Math.PI / 180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c; // 미터 단위
    }
}