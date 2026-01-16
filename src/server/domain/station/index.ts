import { StationRepository } from './station.repository';
import { StationService } from './station.service';

/**
 * 싱글톤 인스턴스 생성
 * - 앱 전체에서 하나의 인스턴스만 사용
 * - 메모리 효율적, 캐싱 가능
 */
const stationRepository = new StationRepository();
export const stationService = new StationService(stationRepository);