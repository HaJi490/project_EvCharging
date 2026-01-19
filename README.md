## 🏗️ 아키텍처 설계

### API 통신 전략
- **개발 단계**: Next.js Route Handler로 백엔드 시뮬레이션
- **SSR 최적화**: 서버에서는 domain 직접 호출로 성능 최적화
- **확장성**: 환경변수만으로 실제 백엔드 연결 가능

### 기술적 의사결정
1. **왜 Route Handler를 사용했나요?**
   - 실제 REST API 통신 구조와 동일한 패턴 구현
   - 백엔드 팀과의 협업을 고려한 API 명세 선정의
   - 프로덕션 환경 전환 시 최소한의 코드 수정

2. **왜 SSR에서 직접 호출도 지원하나요?**
   - Next.js의 서버 컴포넌트 장점 활용
   - 불필요한 네트워크 오버헤드 제거
   - 초기 로딩 성능 최적화

/**
 * ## API 통신 구조
 * 
 * ### 개발 환경 (현재)
 * ```
 * SSR: Page → StationApiClient → domain 직접 호출 (최적화)
 * CSR: Component → StationApiClient → /api/stations → domain
 * ```
 * 
 * ### 프로덕션 (백엔드 분리 시)
 * ```
 * SSR: Page → StationApiClient → https://api.backend.com
 * CSR: Component → StationApiClient → https://api.backend.com
 * ```
 * 
 * ### 장점
 * 1. **환경변수 하나만 변경**으로 백엔드 전환 가능
 * 2. **SSR 최적화**: 개발 중에는 불필요한 HTTP 요청 없음
 * 3. **일관된 인터페이스**: 코드 수정 없이 백엔드 교체
 * 4. **실무 패턴**: Repository → Service → API Client 계층 구조
 */