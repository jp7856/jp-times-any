# JP Times – 주간 한글 신문

매주 **월요일** 발행, **2월 2일** 시작. 초등·중등·고등 단계별로 맞춘 **한글 신문** 앱입니다.  
웹과 모바일에서 모두 사용할 수 있도록 반응형으로 구성했습니다.

## 기능

- **초등 / 중등 / 고등** 단계별 신문 (같은 주제, 난이도별 기사)
- **매주 월요일** 발행, 2월 2일이 포함된 주를 1주차로 계산
- **주차별 이슈** 테마와 기사 (인공지능, 기후, 스마트폰, 우주, 일자리, 국제 관계 등)
- **과거 호** 보기: 각 단계 신문 페이지에서 다른 주차 선택 가능
- **PWA**: 모바일에서 홈 화면에 추가 가능 (아이콘은 `public/icon-192.png`, `public/icon-512.png` 추가 시 사용)

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

## 빌드

```bash
npm run build
```

정적 파일이 `out` 폴더에 생성됩니다. 로컬 미리보기: `npx serve out`

## Cloudflare Pages 배포

1. 저장소를 Cloudflare Pages에 연결합니다.
2. **Settings → Builds & deployments → Build configuration**에서 **반드시** 다음을 설정합니다.

   | 설정 항목 | 값 |
   |----------|-----|
   | **Build command** | `npm run build` |
   | **Build output directory** | `out` |

3. **Build output directory**를 비우거나 잘못 적으면** 루트에 `index.html`이 없어서 **사이트 접속 시 404**가 납니다. 항상 `out`으로 지정하세요.
4. 저장 후 **재배포**(Retry deployment 또는 새 커밋 푸시)를 한 번 실행하세요.

### 404가 날 때 확인할 것

- **Build command**가 비어 있지 않은지 (비어 있으면 빌드가 스킵되어 `out`이 생성되지 않음)
- **Build output directory**가 정확히 `out`인지 (대소문자 포함)
- 배포 로그에서 "Success: Finished cloning" 다음에 빌드 단계가 실행되고, 마지막에 `out` 폴더를 사용했다는 메시지가 있는지

## 프로젝트 구조

- `src/app/` – 메인·신문 페이지 (App Router)
- `src/components/` – 기사 카드 등 공통 컴포넌트
- `src/data/weeklyIssues.ts` – 주차별 이슈·기사 데이터 (추후 API 연동 가능)
- `src/lib/` – 주차 계산, 상수, 유틸

## 기사 데이터 확장

`src/data/weeklyIssues.ts`의 `ISSUES_BY_WEEK`에 새 주차를 추가하면 됩니다.  
실제 서비스에서는 뉴스 API로 주간 이슈를 가져와 같은 형식으로 넣으면 됩니다.
