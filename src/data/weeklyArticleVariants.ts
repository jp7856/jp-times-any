/**
 * 1~6호별 다른 기사 - 해당 주에 이슈된 주제 + 핵심 키워드에 맞는 이미지
 * 주차: 1=2/2, 2=2/9, 3=2/16, 4=2/23, 5=3/2, 6=3/9
 */

import type { SectionArticleInput } from '@/data/sectionArticles';
import {
  SECTION_ARTICLES,
  SECTIONS_ELEMENTARY,
  SECTIONS_MIDDLE,
  SECTIONS_HIGH,
} from '@/data/sectionArticles';
import type { Level } from '@/lib/constants';

/** 직접 Unsplash CDN URL - 밝은 톤(w=800, q=80) + 주제 일치 이미지 */
const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

/** 레벨별 서로 다른 이미지 사용 (초등 이미지는 중등·고등에서 미사용) */
type LevelIds = { elementary: string; middle: string; high: string };

/** section 있으면 해당 섹션 기사일 때 우선 매칭 → 돈 기사는 항상 돈 이미지 등 핵심키워드 일치 */
const KEYWORD_IMAGES: Array<{ when: RegExp; ids: LevelIds; section?: string }> = [
  // 정치
  { when: /(투표|선거|민주주의|공약|후보|유권자)/, ids: { elementary: '1540910419892-4a36d2c3266c', middle: '1726499637922-9f544cbc0fd2', high: '1517245385427-6c4a9e64a108' }, section: '정치' },
  { when: /(국회|입법|정국|여야|법안)/, ids: { elementary: '1540910419892-4a36d2c3266c', middle: '1517245385427-6c4a9e64a108', high: '1524661135-423995f22d0b' }, section: '정치' },
  { when: /(태극기|국기|3·1|독립|독립운동|애국가)/, ids: { elementary: '1540914122471-2b16eae459de', middle: '1528360983277-518d751faf61', high: '1523050854058-24b38136d167' }, section: '정치' },
  { when: /(남북|한반도|평화|국방|병역|군)/, ids: { elementary: '1524661135-423995f22d0b', middle: '1540914122471-2b16eae459de', high: '1473341304177-3d6342c5b8c6' }, section: '정치' },
  { when: /(역사 인식|역사 교과서|역사 논의)/, ids: { elementary: '1540914122471-2b16eae459de', middle: '1523050854058-24b38136d167', high: '1579621970563-ebec7560ff3e' }, section: '정치' },
  // 경제 (섹션 우선으로 돈/세뱃돈/용돈 기사는 항상 돈 이미지)
  { when: /(돈|용돈|저축|월급|봉급|세뱃돈|물건을 사요)/, ids: { elementary: '1553729459-0feda8a5386f', middle: '1560518883-ce09059e6725', high: '1611972616597-649dce757427' }, section: '경제' },
  { when: /(전기요금|전기료|가스 요금|에너지 가격|난방)/, ids: { elementary: '1473341304177-3d6342c5b8c6', middle: '1559757148-5c4a2c950330', high: '1509391366360-2e77ee52d5d2' }, section: '경제' },
  { when: /(경제|물가|인플레이션|공급망|수출|경상수지)/, ids: { elementary: '1579621970563-ebec7560ff3e', middle: '1553729459-0feda8a5386f', high: '1568967729541-096375bef6e8' }, section: '경제' },
  { when: /(환율|원화|달러|엔|환전)/, ids: { elementary: '1611972616597-649dce757427', middle: '1579621970563-ebec7560ff3e', high: '1521737715017-d6805ec7ed54' }, section: '경제' },
  { when: /(금리|전세|매매|주택)/, ids: { elementary: '1560518883-ce09059e6725', middle: '1553729459-0feda8a5386f', high: '1473341304177-3d6342c5b8c6' }, section: '경제' },
  { when: /(구직|취업|일자리|최저임금|아르바이트)/, ids: { elementary: '1521737715017-d6805ec7ed54', middle: '1434030216841-604d0b114f72', high: '1503676260728-1c00da094a0b' }, section: '경제' },
  { when: /(바이오|헬스케어|신약|진단)/, ids: { elementary: '1576092764391-3510ef7972a3', middle: '1544367567-0f2fcb009e0b', high: '1584305567982-91ec7c132d2f' }, section: '경제' },
  { when: /(반도체|수출 규제|미중)/, ids: { elementary: '1568967729541-096375bef6e8', middle: '1676299082083-2dc7f3d440b4', high: '1593941707882-6fc9552d0e76' }, section: '경제' },
  // 사회
  { when: /(귀성|교통|고속도로|KTX|버스|수송)/, ids: { elementary: '1544620347-c4fe4d3a4d59', middle: '1529156069898-49953e39b3ac', high: '1600887012170-422167697c84' }, section: '사회' },
  { when: /(친구|도와|반에서|다문화|공동체|서로)/, ids: { elementary: '1529156069898-49953e39b3ac', middle: '1523050854058-24b38136d167', high: '1517245385427-6c4a9e64a108' }, section: '사회' },
  { when: /(가족|할머니|이웃|명절)/, ids: { elementary: '1529156069898-49953e39b3ac', middle: '1528360983277-518d751faf61', high: '1544620347-c4fe4d3a4d59' }, section: '사회' },
  { when: /(저출산|고령화|노인|시니어|실버)/, ids: { elementary: '1600887012170-422167697c84', middle: '1529156069898-49953e39b3ac', high: '1544367567-0f2fcb009e0b' }, section: '사회' },
  { when: /(학교폭력|상담|법적 대응|갈등)/, ids: { elementary: '1523050854058-24b38136d167', middle: '1589829545856-d10d557cf95f', high: '1517245385427-6c4a9e64a108' }, section: '사회' },
  { when: /(촛불|집회|시민 참여)/, ids: { elementary: '1517245385427-6c4a9e64a108', middle: '1540910419892-4a36d2c3266c', high: '1524661135-423995f22d0b' }, section: '사회' },
  { when: /(교통 안전|안전사고|재난|지진|화재)/, ids: { elementary: '1544620347-c4fe4d3a4d59', middle: '1534368959575-1927319b2c05', high: '1584305567982-91ec7c132d2f' }, section: '사회' },
  // 문화 (설날/명절은 문화 섹션일 때만 설날 이미지; 경제 '설날 세뱃돈'은 위 경제 규칙이 먼저)
  { when: /(설날|명절|윷놀이|제기차기|비석치기|세배)/, ids: { elementary: '1528360983277-518d751faf61', middle: '1513546483692-cb967e75eb7a', high: '1493225457124-ccbcddeba207' }, section: '문화' },
  { when: /(발렌타인|초콜릿|사랑 나눠요)/, ids: { elementary: '1513546483692-cb967e75eb7a', middle: '1523241287236-6470d976904f', high: '1611162616475-46b6352e64ce' }, section: '문화' },
  { when: /(한복|전통 놀이|판소리|전통음악)/, ids: { elementary: '1528360983277-518d751faf61', middle: '1523241287236-6470d976904f', high: '1511671782779-c97d3d27a1d4' }, section: '문화' },
  { when: /(K팝|한류|드라마|웹툰|웹소설|K콘텐츠|콘텐츠)/, ids: { elementary: '1493225457124-ccbcddeba207', middle: '1611162616475-46b6352e64ce', high: '1523241287236-6470d976904f' }, section: '문화' },
  { when: /(봄꽃|벚꽃|진달래|꽃이 피어요|등산|캠핑|아웃도어)/, ids: { elementary: '1523241287236-6470d976904f', middle: '1490750967868-88aa4986a51c', high: '1491002054626-602b485f489f' }, section: '문화' },
  { when: /(OTT|넷플릭스|웨이브|스트리밍|미디어 산업)/, ids: { elementary: '1611162616475-46b6352e64ce', middle: '1493225457124-ccbcddeba207', high: '1507003211169-0a1dd7228f2d' }, section: '미디어' },
  { when: /(저작권|알고리즘|뉴스 추천|SNS)/, ids: { elementary: '1611162616475-46b6352e64ce', middle: '1676299082083-2dc7f3d440b4', high: '1568967729541-096375bef6e8' }, section: '미디어' },
  // 과학
  { when: /(태양|해가|달|위상|삭|망)/, ids: { elementary: '1507003211169-0a1dd7228f2d', middle: '1451187580459-43490279c0e6', high: '1581092160569-d6d2e7635a44' }, section: '과학' },
  { when: /(우주|로켓|탐사|누리호|스페이스X|스타링크)/, ids: { elementary: '1451187580459-43490279c0e6', middle: '1507003211169-0a1dd7228f2d', high: '1676299082083-2dc7f3d440b4' }, section: '과학' },
  { when: /(AI|인공지능|챗봇|딥페이크|가짜 뉴스)/, ids: { elementary: '1676299082083-2dc7f3d440b4', middle: '1503676260728-1c00da094a0b', high: '1568967729541-096375bef6e8' }, section: '과학' },
  { when: /(CRISPR|유전자|양자컴퓨터)/, ids: { elementary: '1676299082083-2dc7f3d440b4', middle: '1576092764391-3510ef7972a3', high: '1451187580459-43490279c0e6' }, section: '과학' },
  { when: /(전기차|배터리)/, ids: { elementary: '1593941707882-6fc9552d0e76', middle: '1559757148-5c4a2c950330', high: '1509391366360-2e77ee52d5d2' }, section: '과학' },
  { when: /(수소|청색수소)/, ids: { elementary: '1559757148-5c4a2c950330', middle: '1593941707882-6fc9552d0e76', high: '1473341304177-3d6342c5b8c6' }, section: '과학' },
  { when: /(눈이 오는|한파|겨울|기후변화)/, ids: { elementary: '1491002054626-602b485f489f', middle: '1542601906990-b4d3fb778b09', high: '1509391366360-2e77ee52d5d2' }, section: '과학' },
  { when: /(봄이 오면|꽃이 피어요|계절|식물)/, ids: { elementary: '1490750967868-88aa4986a51c', middle: '1523241287236-6470d976904f', high: '1532992742220-6ac5bc4d8b62' }, section: '과학' },
  { when: /(비눗방울|과학실험)/, ids: { elementary: '1581092160569-d6d2e7635a44', middle: '1507003211169-0a1dd7228f2d', high: '1576092764391-3510ef7972a3' }, section: '과학' },
  // 교육
  { when: /(개학|새 학기|교실|학교|방학)/, ids: { elementary: '1523050854058-24b38136d167', middle: '1503676260728-1c00da094a0b', high: '1434030216841-604d0b114f72' }, section: '교육' },
  { when: /(입시|수시|정시|수능|시험|수험생|등록금|장학)/, ids: { elementary: '1434030216841-604d0b114f72', middle: '1523050854058-24b38136d167', high: '1579621970563-ebec7560ff3e' }, section: '교육' },
  { when: /(디지털 교육|태블릿|학습부진|멘토링|학점제|진로)/, ids: { elementary: '1503676260728-1c00da094a0b', middle: '1676299082083-2dc7f3d440b4', high: '1611162616475-46b6352e64ce' }, section: '교육' },
  { when: /(교육정책|대입|사교육)/, ids: { elementary: '1434030216841-604d0b114f72', middle: '1589829545856-d10d557cf95f', high: '1521737715017-d6805ec7ed54' }, section: '교육' },
  { when: /(인권|교권|학생 인권)/, ids: { elementary: '1523050854058-24b38136d167', middle: '1517245385427-6c4a9e64a108', high: '1589829545856-d10d557cf95f' }, section: '교육' },
  // 환경
  { when: /(미세먼지|대기질|마스크)/, ids: { elementary: '1584305567982-91ec7c132d2f', middle: '1532992742220-6ac5bc4d8b62', high: '1542601906990-b4d3fb778b09' }, section: '환경' },
  { when: /(재생에너지|태양광|풍력|넷제로|기후 위기)/, ids: { elementary: '1509391366360-2e77ee52d5d2', middle: '1559757148-5c4a2c950330', high: '1534368959575-1927319b2c05' }, section: '환경' },
  { when: /(플라스틱|바다|재활용|분리수거|탄소)/, ids: { elementary: '1532992742220-6ac5bc4d8b62', middle: '1584305567982-91ec7c132d2f', high: '1509391366360-2e77ee52d5d2' }, section: '환경' },
  { when: /(산불|예방)/, ids: { elementary: '1534368959575-1927319b2c05', middle: '1542601906990-b4d3fb778b09', high: '1491002054626-602b485f489f' }, section: '환경' },
  { when: /(난방|탄소 배출|환경 오염)/, ids: { elementary: '1542601906990-b4d3fb778b09', middle: '1473341304177-3d6342c5b8c6', high: '1532992742220-6ac5bc4d8b62' }, section: '환경' },
  // 국제
  { when: /(해외 여행|동남아|일본)/, ids: { elementary: '1524661135-423995f22d0b', middle: '1544620347-c4fe4d3a4d59', high: '1473341304177-3d6342c5b8c6' }, section: '국제' },
  { when: /(UN|세계 평화|국제기구)/, ids: { elementary: '1524661135-423995f22d0b', middle: '1540914122471-2b16eae459de', high: '1517245385427-6c4a9e64a108' }, section: '국제' },
  { when: /(동아시아|한미일|정상회담|외교)/, ids: { elementary: '1524661135-423995f22d0b', middle: '1540910419892-4a36d2c3266c', high: '1579621970563-ebec7560ff3e' }, section: '국제' },
  { when: /(우크라이나|재건|FTA|G20|국제회의)/, ids: { elementary: '1473341304177-3d6342c5b8c6', middle: '1524661135-423995f22d0b', high: '1560518883-ce09059e6725' }, section: '국제' },
  { when: /(유럽|에너지 위기|가스|전력)/, ids: { elementary: '1473341304177-3d6342c5b8c6', middle: '1559757148-5c4a2c950330', high: '1509391366360-2e77ee52d5d2' }, section: '국제' },
  // 법·건강·스포츠
  { when: /(명절 사고|법적 책임|교통·음주)/, ids: { elementary: '1589829545856-d10d557cf95f', middle: '1544367567-0f2fcb009e0b', high: '1523050854058-24b38136d167' }, section: '법' },
  { when: /(소년법|아동권리|보호법|개인정보|표현|혐오)/, ids: { elementary: '1589829545856-d10d557cf95f', middle: '1517245385427-6c4a9e64a108', high: '1611162616475-46b6352e64ce' }, section: '법' },
  { when: /(설 음식|소화기|과식|명절 건강)/, ids: { elementary: '1544367567-0f2fcb009e0b', middle: '1584305567982-91ec7c132d2f', high: '1576092764391-3510ef7972a3' }, section: '건강' },
  { when: /(정신건강|우울|불안|수면|운동 부족|알레르기|꽃가루)/, ids: { elementary: '1544367567-0f2fcb009e0b', middle: '1523241287236-6470d976904f', high: '1600887012170-422167697c84' }, section: '건강' },
  { when: /(동계|스키|스케이팅)/, ids: { elementary: '1551522435-a89afa12578c', middle: '1491002054626-602b485f489f', high: '1546519638-af2f498e742f' }, section: '스포츠' },
  { when: /(야구|KBO|개막)/, ids: { elementary: '1574629810360-7efbe195a735', middle: '1542751371-adc38448a05e', high: '1551522435-a89afa12578c' }, section: '스포츠' },
  { when: /(축구|K리그|유럽 리그)/, ids: { elementary: '1542751371-adc38448a05e', middle: '1546519638-af2f498e742f', high: '1574629810360-7efbe195a735' }, section: '스포츠' },
  { when: /(농구|배구|KBL|V리그|플레이오프)/, ids: { elementary: '1546519638-af2f498e742f', middle: '1542751371-adc38448a05e', high: '1551522435-a89afa12578c' }, section: '스포츠' },
  { when: /(e스포츠|게임)/, ids: { elementary: '1542751371-adc38448a05e', middle: '1568967729541-096375bef6e8', high: '1676299082083-2dc7f3d440b4' }, section: '스포츠' },
  { when: /(문화예술|공영|방송)/, ids: { elementary: '1511671782779-c97d3d27a1d4', middle: '1493225457124-ccbcddeba207', high: '1528360983277-518d751faf61' }, section: '문화' },
];

/** 기사 본문에서 매칭할 핵심 키워드 후보 (긴 구절 우선 → 세뱃돈·용돈 먼저, 돈 나중에) */
const KEY_PHRASES = [
  '독립운동', '역사 인식', '역사 교과서', '역사 논의', '에너지 가격', '가스 요금', '전기요금', '전기료', '물건을 사요', '세뱃돈', '인플레이션', '공급망', '경상수지', '최저임금', '아르바이트', '수출 규제', '고속도로', '학교폭력', '법적 대응', '시민 참여', '교통 안전', '안전사고', '제기차기', '비석치기', '사랑 나눠요', '전통 놀이', '전통음악', '웹소설', 'K콘텐츠', '꽃이 피어요', '미디어 산업', '뉴스 추천', '스페이스X', '스타링크', '인공지능', '딥페이크', '가짜 뉴스', '양자컴퓨터', '청색수소', '눈이 오는', '기후변화', '봄이 오면', '과학실험', '새 학기', '디지털 교육', '학습부진', '교육정책', '학생 인권', '재생에너지', '넷제로', '기후 위기', '분리수거', '탄소 배출', '환경 오염', '해외 여행', '세계 평화', '국제기구', '정상회담', '동아시아', '국제회의', '우크라이나', '에너지 위기', '법적 책임', '명절 사고', '교통·음주', '아동권리', '소년법', '보호법', '명절 건강', '설 음식', '운동 부족', '정신건강', '스케이팅', '유럽 리그', '플레이오프', 'e스포츠', '문화예술', '용돈', '저축', '월급', '봉급', '돈', '물가', '수출', '환율', '원화', '금리', '전세', '매매', '주택', '구직', '취업', '일자리', '헬스케어', '신약', '진단', '바이오', '반도체', '미중', '귀성', '교통', 'KTX', '버스', '수송', '다문화', '공동체', '가족', '할머니', '이웃', '명절', '저출산', '고령화', '시니어', '실버', '노인', '상담', '갈등', '촛불', '집회', '재난', '지진', '화재', '윷놀이', '설날', '세배', '발렌타인', '초콜릿', '한복', '판소리', '한류', '드라마', 'K팝', '콘텐츠', '봄꽃', '벚꽃', '진달래', '등산', '캠핑', '아웃도어', '넷플릭스', '웨이브', '스트리밍', 'OTT', '저작권', '알고리즘', 'SNS', '태양', '해가', '달', '우주', '로켓', '탐사', '누리호', 'AI', '챗봇', 'CRISPR', '유전자', '전기차', '배터리', '수소', '한파', '겨울', '계절', '식물', '비눗방울', '개학', '교실', '학교', '방학', '입시', '수시', '정시', '수능', '시험', '수험생', '등록금', '장학', '태블릿', '멘토링', '학점제', '진로', '대입', '사교육', '인권', '교권', '미세먼지', '대기질', '마스크', '태양광', '풍력', '플라스틱', '바다', '재활용', '탄소', '산불', '예방', '난방', '동남아', '일본', 'UN', '한미일', '외교', '재건', 'FTA', 'G20', '유럽', '가스', '전력', '개인정보', '표현', '혐오', '소화기', '과식', '우울', '불안', '수면', '알레르기', '꽃가루', '스키', '동계', 'KBO', '야구', '개막', 'K리그', '축구', 'KBL', '농구', '배구', 'V리그', '게임', '공영', '방송', '태극기', '국기', '독립', '애국가', '투표', '선거', '민주주의', '공약', '후보', '유권자', '국회', '입법', '정국', '여야', '법안', '남북', '한반도', '평화', '국방', '병역', '군',
].sort((a, b) => b.length - a.length);

const KEYWORD_COUNT_BY_LEVEL: Record<Level, number> = {
  elementary: 3,
  middle: 5,
  high: 8,
};

/** 핵심 키워드 → 레벨별 이미지 ID (키워드 기준 이미지 매칭용) */
const PHRASE_TO_IMAGE_IDS: Record<string, LevelIds> = {};
for (const phrase of KEY_PHRASES) {
  if (PHRASE_TO_IMAGE_IDS[phrase]) continue;
  for (const rule of KEYWORD_IMAGES) {
    if (rule.when.test(phrase)) {
      PHRASE_TO_IMAGE_IDS[phrase] = rule.ids;
      break;
    }
  }
}

/** 뽑은 핵심 키워드 순서대로 이미지 매칭 → 하단에 나오는 키워드와 이미지 일치 */
function getImageUrlFromKeyPhrases(
  keyPhrases: string[],
  level: Level,
  _section: string
): string | null {
  for (const phrase of keyPhrases) {
    const ids = PHRASE_TO_IMAGE_IDS[phrase];
    if (ids) return U(ids[level]);
  }
  return null;
}

/** 기사 본문(제목+요약+본문)에서 핵심 키워드 추출. 초등 3개 / 중등 5개 / 고등 8개 */
export function getKeyPhrasesForArticle(
  text: string,
  level: Level
): string[] {
  const limit = KEYWORD_COUNT_BY_LEVEL[level];
  const found: string[] = [];
  const normalized = text.replace(/\s+/g, ' ');
  for (const phrase of KEY_PHRASES) {
    if (found.length >= limit) break;
    if (normalized.includes(phrase) && !found.includes(phrase)) {
      found.push(phrase);
    }
  }
  return found;
}

/** 섹션별 레벨마다 다른 이미지 (초등 이미지는 중·고에서 미사용) */
const SECTION_IMAGES: Record<string, LevelIds> = {
  정치: { elementary: '1540910419892-4a36d2c3266c', middle: '1517245385427-6c4a9e64a108', high: '1524661135-423995f22d0b' },
  경제: { elementary: '1553729459-0feda8a5386f', middle: '1579621970563-ebec7560ff3e', high: '1560518883-ce09059e6725' },
  사회: { elementary: '1529156069898-49953e39b3ac', middle: '1523050854058-24b38136d167', high: '1544620347-c4fe4d3a4d59' },
  문화: { elementary: '1528360983277-518d751faf61', middle: '1523241287236-6470d976904f', high: '1493225457124-ccbcddeba207' },
  과학: { elementary: '1451187580459-43490279c0e6', middle: '1507003211169-0a1dd7228f2d', high: '1676299082083-2dc7f3d440b4' },
  교육: { elementary: '1503676260728-1c00da094a0b', middle: '1434030216841-604d0b114f72', high: '1521737715017-d6805ec7ed54' },
  환경: { elementary: '1542601906990-b4d3fb778b09', middle: '1509391366360-2e77ee52d5d2', high: '1532992742220-6ac5bc4d8b62' },
  국제: { elementary: '1524661135-423995f22d0b', middle: '1540914122471-2b16eae459de', high: '1473341304177-3d6342c5b8c6' },
  미디어: { elementary: '1611162616475-46b6352e64ce', middle: '1493225457124-ccbcddeba207', high: '1568967729541-096375bef6e8' },
  법: { elementary: '1589829545856-d10d557cf95f', middle: '1544367567-0f2fcb009e0b', high: '1523050854058-24b38136d167' },
  건강: { elementary: '1544367567-0f2fcb009e0b', middle: '1584305567982-91ec7c132d2f', high: '1576092764391-3510ef7972a3' },
  스포츠: { elementary: '1542751371-adc38448a05e', middle: '1546519638-af2f498e742f', high: '1574629810360-7efbe195a735' },
};

function getImageUrlForArticle(params: {
  section: string;
  level: Level;
  title: string;
  summary: string;
  body?: string;
}): string {
  const text = `${params.section} ${params.title} ${params.summary} ${params.body ?? ''}`;
  // 1) 해당 섹션 규칙 먼저 적용 → 돈 기사는 돈 이미지, 설날 세뱃돈은 돈 이미지 등 동일 기준
  for (const rule of KEYWORD_IMAGES) {
    if (rule.section !== params.section) continue;
    if (rule.when.test(text)) return U(rule.ids[params.level]);
  }
  // 2) 섹션 규칙에서 못 찾으면 전체 규칙에서 매칭
  for (const rule of KEYWORD_IMAGES) {
    if (rule.section === params.section) continue;
    if (rule.when.test(text)) return U(rule.ids[params.level]);
  }
  const fallback: LevelIds = { elementary: '1540910419892-4a36d2c3266c', middle: '1517245385427-6c4a9e64a108', high: '1524661135-423995f22d0b' };
  const ids = SECTION_IMAGES[params.section] ?? fallback;
  return U(ids[params.level]);
}

/** 1~6호별 섹션 주제 (제목·요약 중심, body는 기본+주제 맞게 요약) */
const WEEK_THEMES: Record<number, Record<string, Partial<Record<Level, { title: string; summary: string; body?: string }>>>> = {
  1: {
    // 1호(2/2): 설날·새해, 전기요금
    정치: {
      elementary: { title: '설날에 국기에 계양해요', summary: '국경일과 국기에 대해 알아요.' },
      middle: { title: '국회 개원과 입법 과정', summary: '새해 첫 국회, 법은 어떻게 만들어질까.' },
      high: { title: '정국 재개와 여야 대립', summary: '신년 국회, 핵심 법안 처리 순서.' },
    },
    경제: {
      elementary: { title: '설날 세뱃돈은 어디에 둘까요?', summary: '용돈 관리 첫걸음.' },
      middle: { title: '전기요금 인상과 가계', summary: '겨울 난방, 전기료 부담 커진다.' },
      high: { title: '에너지 가격과 물가 연동', summary: '전기·가스 요금, 물가에 미치는 영향.' },
    },
    사회: {
      elementary: { title: '설에 할머니 댁에 가요', summary: '명절, 가족과 함께하는 시간.' },
      middle: { title: '명절 귀성길 교통대책', summary: '고향 가는 길, 안전하게.' },
      high: { title: '명절 수송과 이동 인프라', summary: '대규모 이동, KTX·고속버스 대응.' },
    },
    문화: {
      elementary: { title: '설날에 윷놀이해요', summary: '전통 놀이로 세배받기.' },
      middle: { title: '설 맞이 전통과 현대', summary: '명절 문화의 변화.' },
      high: { title: '설 연휴와 소비·문화', summary: '연휴 특수, 영화·관광 수요.' },
    },
    과학: {
      elementary: { title: '겨울에 눈이 오는 이유', summary: '추울수록 눈이 내려요.' },
      middle: { title: '한파와 기상 특보', summary: '추위, 건강 조심하세요.' },
      high: { title: '기후변화와 한파 빈도', summary: '극한 기상, 왜 더 잦아질까.' },
    },
    교육: { middle: { title: '방학 마무리와 새 학기 준비', summary: '겨울방학, 마지막 주.' }, high: { title: '학기초 교육정책과 예산', summary: '새해 교육부 정책 방향.' } },
    환경: { middle: { title: '겨울 대기질과 미세먼지', summary: '추운 날, 창문 잠그면.' }, high: { title: '난방 수요와 탄소 배출', summary: '겨울 에너지, 환경 부담.' } },
    국제: { middle: { title: '설 연휴 해외 여행', summary: '일본·동남아 인기.' }, high: { title: '동아시아 신년 정국', summary: '한중일, 새해 첫 외교.' } },
    미디어: { high: { title: '설 연휴 OTT 시청 급증', summary: '넷플릭스·웨이브, 명절 특수.' } },
    법: { high: { title: '명절 사고와 법적 책임', summary: '연휴 교통·음주 사고.' } },
    건강: { high: { title: '설 음식과 소화기 건강', summary: '과식·술, 명절 건강.' } },
    스포츠: { high: { title: '동계 스포츠 시즌 한창', summary: '스키·스케이팅 인기.' } },
  },
  2: {
    // 2호(2/9): 발렌타인, 입시
    정치: {
      elementary: { title: '우리 동네에 투표하러 가요', summary: '선거가 뭔지, 왜 투표하는지 알아요.' },
      middle: { title: '청년 참정권과 정치 참여', summary: '18세 선거권과 청소년 정치 의식.' },
      high: { title: '양극화와 포퓰리즘', summary: '정치 양극화와 선거 동학.' },
    },
    경제: {
      elementary: { title: '돈은 어디서 오나요?', summary: '돈과 일의 관계를 알아요.' },
      middle: { title: '인플레이션과 물가', summary: '물가 상승이 일상에 미치는 영향.' },
      high: { title: '글로벌 공급망 재편', summary: '공급망 리스크와 산업 정책.' },
    },
    사회: {
      elementary: { title: '우리 반에서 서로 도와요', summary: '친구와 함께하면 시원해요.' },
      middle: { title: '다문화 사회와 공존', summary: '다문화 가정과 사회 통합.' },
      high: { title: '저출산·고령화와 사회 변화', summary: '인구 구조와 복지·노동.' },
    },
    문화: {
      elementary: { title: '발렌타인데이, 사랑 나눠요', summary: '마음을 전하는 날.' },
      middle: { title: '발렌타인과 소비 문화', summary: '초콜릿·선물, 이벤트 마케팅.' },
      high: { title: 'K콘텐츠와 문화 수출', summary: '한류와 글로벌 시장.' },
    },
    과학: {
      elementary: { title: '태양이 해가 되는 이유', summary: '태양이 뜨고 지는 것.' },
      middle: { title: 'CRISPR과 유전자 편집', summary: '유전자 기술의 가능성과 윤리.' },
      high: { title: '양자컴퓨터와 미래 기술', summary: '양자 컴퓨팅의 원리와 경쟁.' },
    },
    교육: { middle: { title: '수시 합격 발표와 정시 준비', summary: '입시 마무리, 수험생 설렘.' }, high: { title: '대입 정시 결과와 재수 현황', summary: '수시·정시, 올해 입시 분석.' } },
    환경: { middle: { title: '플라스틱과 바다', summary: '해양 플라스틱 오염.' }, high: { title: '기후 위기와 산업 전환', summary: '넷제로와 정의로운 전환.' } },
    국제: { middle: { title: 'UN과 세계 평화', summary: '국제기구의 역할.' }, high: { title: '미중 경쟁과 동맹 구조', summary: '패권 경쟁과 한국의 선택.' } },
    미디어: { high: { title: '알고리즘과 정보 환경', summary: '추천 알고리즘과 필터 버블.' } },
    법: { high: { title: '청소년 보호법과 권리', summary: '소년법·아동권리.' } },
    건강: { high: { title: '청소년 정신건강', summary: '우울·불안과 지원.' } },
    스포츠: { high: { title: 'e스포츠와 전통 스포츠', summary: '게임 경기의 산업화.' } },
  },
  3: {
    // 3호(2/16): 개학, 3·1절 준비
    정치: {
      elementary: { title: '국기가 휘날려요', summary: '우리나라 상징을 알아요.' },
      middle: { title: '3·1절과 독립운동', summary: '독립의 길, 1919년 3월 1일.' },
      high: { title: '역사 인식과 현대 정치', summary: '역사 논의의 정치화.' },
    },
    경제: {
      elementary: { title: '저축통장에 용돈 모아요', summary: '돈 아끼는 습관.' },
      middle: { title: '청년 구직과 첫 월급', summary: '졸업·취업, 일자리 시장.' },
      high: { title: '주택 금리와 전세 시장', summary: '금리 인하, 전세·매매 영향.' },
    },
    사회: {
      elementary: { title: '개학했어요, 친구 만나요', summary: '새 학기, 새 친구.' },
      middle: { title: '학교폭력 예방과 상담', summary: '개학기, 또래 갈등 주의.' },
      high: { title: '촛불집회와 시민 참여', summary: '시민사회와 집회 자유.' },
    },
    문화: {
      elementary: { title: '우리나라 전통 놀이', summary: '윷놀이, 제기차기, 비석치기.' },
      middle: { title: 'K팝 월드투어 소식', summary: '해외 공연, 한류 열기.' },
      high: { title: 'OTT와 미디어 산업 구조', summary: '스트리밍과 전통 방송.' },
    },
    과학: {
      elementary: { title: '봄이 오면 꽃이 피어요', summary: '계절과 식물의 변화.' },
      middle: { title: 'AI 챗봇과 일상', summary: '인공지능, 이제 우리 곁에.' },
      high: { title: 'AI 규제와 윤리 가이드', summary: '세계 각국의 AI 법제화.' },
    },
    교육: { middle: { title: '디지털 교육과 교실', summary: '태블릿·AI 활용 수업.' }, high: { title: '대입 제도와 교육 정책', summary: '수시·정시, 사교육 논의.' } },
    환경: { middle: { title: '미세먼지와 마스크', summary: '봄철 미세먼지 대비.' }, high: { title: '재생에너지 투자 확대', summary: '태양광·풍력, 녹색 전환.' } },
    국제: { middle: { title: '동아시아 외교 일정', summary: '한미일, 정상회담.' }, high: { title: '반도체 수출 규제 이슈', summary: '미중 기술 전쟁과 한국.' } },
    미디어: { high: { title: '딥페이크와 가짜 뉴스', summary: 'AI 영상, 진위 판별의 한계.' } },
    법: { high: { title: '학교폭력 법적 대응', summary: '가해·피해, 법적 절차.' } },
    건강: { high: { title: '봄철 알레르기와 꽃가루', summary: '꽃가루·미세먼지 건강.' } },
    스포츠: { high: { title: '프로야구 개막 임박', summary: 'KBO 시즌 준비.' } },
  },
  4: {
    // 4호(2/23): 3·1절 전후
    정치: {
      elementary: { title: '3·1절에는 태극기요', summary: '독립만세 운동을 기념해요.' },
      middle: { title: '독립운동가와 유적', summary: '역사의 현장을 찾아서.' },
      high: { title: '역사 교과서 논쟁', summary: '역사 서술과 정치.' },
    },
    경제: {
      elementary: { title: '가게에서 물건을 사요', summary: '돈의 쓰임을 알아요.' },
      middle: { title: '원화 가치와 환율', summary: '달러·엔, 환율이 오르내리는 이유.' },
      high: { title: '반도체 수출과 경상수지', summary: '수출 호조, 경기 지표.' },
    },
    사회: {
      elementary: { title: '우리 동네 이웃さん', summary: '이웃과 인사해요.' },
      middle: { title: '노인 일자리와 사회', summary: '시니어 일하는 사회.' },
      high: { title: '실버층 디지털 격차', summary: '노인과 스마트폰·인터넷.' },
    },
    문화: {
      elementary: { title: '한복 입어 보세요', summary: '우리 옷, 한복의 아름다움.' },
      middle: { title: '한류 드라마 해외 반응', summary: '넷플릭스, K드라마 열풍.' },
      high: { title: '문화예술 지원 정책', summary: '공영 방송·예술 정책.' },
    },
    과학: {
      elementary: { title: '달은 왜 모양이 바뀌나요?', summary: '달의 위상, 삭·망.' },
      middle: { title: '우주 탐사와 한국', summary: '누리호, 달 탐사 계획.' },
      high: { title: '스페이스X와 민간 우주', summary: '스타링크·화성, 민간 우주경쟁.' },
    },
    교육: { middle: { title: '학생 인권과 교권', summary: '학교 내 인권 존중.' }, high: { title: '대학 등록금과 장학제도', summary: '등록금 부담, 지원 확대.' } },
    환경: { middle: { title: '재활용과 분리수거', summary: '쓰레기, 제대로 버리기.' }, high: { title: '탄소중립과 산업', summary: '탄소 배출권, 기업 대응.' } },
    국제: { middle: { title: '유럽 에너지 위기', summary: '가스·전력, 유럽 대응.' }, high: { title: '우크라이나 재건과 지원', summary: '전후 복구, 국제 협력.' } },
    미디어: { high: { title: 'SNS 이용 연령 제한', summary: '청소년 SNS, 규제 논의.' } },
    법: { high: { title: '표현의 자유와 혐오', summary: '혐오 표현, 법적 한계.' } },
    건강: { high: { title: '수면 건강과 청소년', summary: '잠 부족, 학습·건강 영향.' } },
    스포츠: { high: { title: '축구 유럽 리그와 K리그', summary: '해외파와 국내 리그.' } },
  },
  5: {
    // 5호(3/2): 3·1절, 입시
    정치: {
      elementary: { title: '나라를 사랑하는 마음', summary: '애국가, 우리의 노래.' },
      middle: { title: '남북 관계와 평화', summary: '대화와 긴장, 한반도.' },
      high: { title: '국방 예산과 병역 논의', summary: '군 현대화와 징병.' },
    },
    경제: {
      elementary: { title: '일하면 봉급을 받아요', summary: '일과 보상.' },
      middle: { title: '최저임금과 청년 일자리', summary: '아르바이트, 최저시급.' },
      high: { title: '바이오·헬스케어 투자', summary: '바이오테크, 신약·진단.' },
    },
    사회: {
      elementary: { title: '교통 안전, 제자리 걸어요', summary: '길에서 안전하게.' },
      middle: { title: '안전사고와 예방', summary: '학교·가정, 안전 수칙.' },
      high: { title: '재난 대응과 체계', summary: '지진·화재, 국가 대응력.' },
    },
    문화: {
      elementary: { title: '전통음악, 판소리 들어요', summary: '우리 소리의 멋.' },
      middle: { title: '웹툰·웹소설 열풍', summary: '디지털 콘텐츠, 청년 독자.' },
      high: { title: '저작권과 콘텐츠 산업', summary: 'AI 생성물, 저작권 이슈.' },
    },
    과학: {
      elementary: { title: '과학실험, 비눗방울', summary: '재미있는 과학.' },
      middle: { title: '배터리 기술과 전기차', summary: '전기차, 배터리 경쟁.' },
      high: { title: '수소경제와 청색수소', summary: '수소 에너지, 기술·정책.' },
    },
    교육: { middle: { title: '학습부진과 멘토링', summary: '기초학력, 학교 대응.' }, high: { title: '고교 학점제와 진로', summary: '학점제 전환, 학생 선택.' } },
    환경: { middle: { title: '환경 오염과 건강', summary: '미세먼지·수질, 영향.' }, high: { title: '플라스틱 규제 강화', summary: '일회용 규제, 대체 소재.' } },
    국제: { middle: { title: 'G20·국제회의', summary: '글로벌 협의, 경제·기후.' }, high: { title: 'RCEP·한중일 FTA', summary: '아시아 무역, 협력과 경쟁.' } },
    미디어: { high: { title: '뉴스 추천과 편향', summary: '뉴스 앱, 알고리즘 투명성.' } },
    법: { high: { title: '데이터 개인정보 보호', summary: '개인정보법, 플랫폼 의무.' } },
    건강: { high: { title: '청소년 운동 부족', summary: '좌식 생활, 건강 위해.' } },
    스포츠: { high: { title: '프로농구·배구 시즌', summary: 'KBL·V리그, 플레이오프.' } },
  },
  6: {
    // 6호(3/9): 국제여성의날 전후, 봄
    정치: {
      elementary: { title: '우리 동네에 투표하러 가요', summary: '선거가 뭔지, 왜 투표하는지 알아요.' },
      middle: { title: '청년 참정권과 정치 참여', summary: '18세 선거권과 청소년 정치 의식.' },
      high: { title: '양극화와 포퓰리즘', summary: '정치 양극화와 선거 동학.' },
    },
    경제: {
      elementary: { title: '돈은 어디서 오나요?', summary: '돈과 일의 관계를 알아요.' },
      middle: { title: '인플레이션과 물가', summary: '물가 상승이 일상에 미치는 영향.' },
      high: { title: '글로벌 공급망 재편', summary: '공급망 리스크와 산업 정책.' },
    },
    사회: {
      elementary: { title: '우리 반에서 서로 도와요', summary: '친구와 함께하면 시원해요.' },
      middle: { title: '여성의 날과 양성평등', summary: '3·8, 직장·사회 평등.' },
      high: { title: '젠더 갈등과 대화', summary: '양성평등 담론, 사회 논의.' },
    },
    문화: {
      elementary: { title: '봄꽃 구경 가요', summary: '벚꽃·진달래, 봄맞이.' },
      middle: { title: '봄 소비와 스포츠·아웃도어', summary: '등산·캠핑, 봄 시즌.' },
      high: { title: 'K콘텐츠와 글로벌 시장', summary: '한류, 봄 시즌 신작.' },
    },
    과학: {
      elementary: { title: '태양이 해가 되는 이유', summary: '태양이 뜨고 지는 것.' },
      middle: { title: 'CRISPR과 유전자 편집', summary: '유전자 기술의 가능성과 윤리.' },
      high: { title: '양자컴퓨터와 미래 기술', summary: '양자 컴퓨팅의 원리와 경쟁.' },
    },
    교육: { middle: { title: '디지털 교육과 교실', summary: '태블릿·AI 활용 수업.' }, high: { title: '대입 제도와 교육 정책', summary: '수시·정시, 사교육 논의.' } },
    환경: { middle: { title: '봄철 산불과 예방', summary: '건조한 봄, 산불 주의.' }, high: { title: '기후 위기와 산업 전환', summary: '넷제로와 정의로운 전환.' } },
    국제: { middle: { title: 'UN과 세계 평화', summary: '국제기구의 역할.' }, high: { title: '미중 경쟁과 동맹 구조', summary: '패권 경쟁과 한국의 선택.' } },
    미디어: { high: { title: '알고리즘과 정보 환경', summary: '추천 알고리즘과 필터 버블.' } },
    법: { high: { title: '청소년 보호법과 권리', summary: '소년법·아동권리.' } },
    건강: { high: { title: '청소년 정신건강', summary: '우울·불안과 지원.' } },
    스포츠: { high: { title: 'e스포츠와 전통 스포츠', summary: '게임 경기의 산업화.' } },
  },
};

function getWeekIndex(weekNumber: number): number {
  if (weekNumber >= 1 && weekNumber <= 6) return weekNumber;
  return ((weekNumber - 1) % 6) + 1;
}

/** 주차별로 다른 기사 반환. 핵심 키워드 먼저 뽑고, 그 키워드 기준으로 이미지 매칭. */
export function getArticleForWeek(
  weekNumber: number,
  section: string,
  level: Level
): SectionArticleInput | null {
  const base = SECTION_ARTICLES[section]?.[level];
  if (!base) return null;

  const weekIdx = getWeekIndex(weekNumber);
  const theme = WEEK_THEMES[weekIdx]?.[section]?.[level];
  const draftTitle = theme?.title ?? base.title;
  const draftSummary = theme?.summary ?? base.summary;
  const draftBody = theme?.body ?? base.body;
  const fullText = `${draftTitle} ${draftSummary} ${draftBody ?? ''}`;

  // 1) 기사에서 핵심 키워드 추출 (하단에 표시할 것과 동일)
  const keyPhrases = getKeyPhrasesForArticle(fullText, level);
  // 2) 그 키워드 순서대로 이미지 매칭 → 키워드와 이미지 일치
  const imageUrl =
    getImageUrlFromKeyPhrases(keyPhrases, level, section) ||
    getImageUrlForArticle({
      section,
      level,
      title: draftTitle,
      summary: draftSummary,
      body: draftBody,
    }) ||
    base.imageUrl;

  if (!theme) return { ...base, imageUrl, keyPhrases: keyPhrases.length ? keyPhrases : undefined };

  return {
    ...base,
    title: theme.title,
    summary: theme.summary,
    imageUrl,
    ...(keyPhrases.length > 0 && { keyPhrases }),
    ...(theme.body && { body: theme.body }),
  };
}
