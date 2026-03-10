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

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

/** 주차별·섹션별 기사 핵심 키워드에 맞는 이미지 (Unsplash) */
const WEEK_IMAGES: Record<number, Record<string, Partial<Record<Level, string>>>> = {
  // 1호: 설날·국기, 세뱃돈, 전기요금, 귀성길, 윷놀이, 눈/한파, OTT, 동계스포츠
  1: {
    정치: { elementary: U('1540914122471-2b16eae459de'), middle: U('1540914122471-2b16eae459de'), high: U('1540914122471-2b16eae459de') },
    경제: { elementary: U('1553729459-0feda8a5386f'), middle: U('1473341304177-3d6342c5b8c6'), high: U('1473341304177-3d6342c5b8c6') },
    사회: { elementary: U('1529156069898-49953e39b3ac'), middle: U('1544620347-c4fe4d3a4d59'), high: U('1544620347-c4fe4d3a4d59') },
    문화: { elementary: U('1528360983277-518d751faf61'), middle: U('1528360983277-518d751faf61'), high: U('1611162616475-46b6352e64ce') },
    과학: { elementary: U('1491002054626-602b485f489f'), middle: U('1542601906990-b4d3fb778b09'), high: U('1542601906990-b4d3fb778b09') },
    교육: { middle: U('1503676260728-1c00da094a0b'), high: U('1503676260728-1c00da094a0b') },
    환경: { middle: U('1532601224466-604f82a89254'), high: U('1542601906990-b4d3fb778b09') },
    국제: { middle: U('1524661135-423995f22d0b'), high: U('1524661135-423995f22d0b') },
    미디어: { high: U('1611162616475-46b6352e64ce') },
    법: { high: U('1589829545856-d10d557cf95f') },
    건강: { high: U('1544367567-0f2fcb009e0b') },
    스포츠: { high: U('1551522435-a89afa12578c') },
  },
  // 2호: 발렌타인(초콜릿), 입시
  2: {
    문화: { elementary: U('1513546483692-cb967e75eb7a'), middle: U('1513546483692-cb967e75eb7a'), high: U('1611162616475-46b6352e64ce') },
    교육: { middle: U('1434030216841-604d0b114f72'), high: U('1434030216841-604d0b114f72') },
  },
  // 3호: 국기/3·1절, 구직, 개학, AI, 미세먼지, 우주, 프로야구
  3: {
    정치: { elementary: U('1540914122471-2b16eae459de'), middle: U('1540914122471-2b16eae459de'), high: U('1540914122471-2b16eae459de') },
    경제: { elementary: U('1553729459-0feda8a5386f'), middle: U('1521737715017-d6805ec7ed54'), high: U('1560518883-ce09059e6725') },
    사회: { elementary: U('1523050854058-24b38136d167'), middle: U('1523050854058-24b38136d167'), high: U('1517245385427-6c4a9e64a108') },
    문화: { elementary: U('1528360983277-518d751faf61'), middle: U('1493225457124-ccbcddeba207'), high: U('1611162616475-46b6352e64ce') },
    과학: { elementary: U('1490750967868-88aa4986a51c'), middle: U('1676299082083-2dc7f3d440b4'), high: U('1676299082083-2dc7f3d440b4') },
    환경: { middle: U('1584305567982-91ec7c132d2f'), high: U('1509391366360-2e77ee52d5d2') },
    국제: { middle: U('1524661135-423995f22d0b'), high: U('1568967729541-096375bef6e8') },
    미디어: { high: U('1676299082083-2dc7f3d440b4') },
    법: { high: U('1589829545856-d10d557cf95f') },
    건강: { high: U('1515378791036-0648b3d77beb') },
    스포츠: { high: U('1574629810360-7efbe195a735') },
  },
  // 4호: 3·1절/독립, 환율, 한복/한류, 우주, 축구
  4: {
    정치: { elementary: U('1540914122471-2b16eae459de'), middle: U('1540914122471-2b16eae459de'), high: U('1540914122471-2b16eae459de') },
    경제: { elementary: U('1579621970563-ebec7560ff3e'), middle: U('1611972616597-649dce757427'), high: U('1568967729541-096375bef6e8') },
    사회: { elementary: U('1529156069898-49953e39b3ac'), middle: U('1600887012170-422167697c84'), high: U('1551836022-deb4028e63ab') },
    문화: { elementary: U('1528360983277-518d751faf61'), middle: U('1611162616475-46b6352e64ce'), high: U('1511671782779-c97d3d27a1d4') },
    과학: { elementary: U('1507003211169-0a1dd7228f2d'), middle: U('1451187580459-43490279c0e6'), high: U('1446776811953-b67d9627a4f3') },
    환경: { middle: U('1532992742220-6ac5bc4d8b62'), high: U('1542601906990-b4d3fb778b09') },
    국제: { middle: U('1473341304177-3d6342c5b8c6'), high: U('1524661135-423995f22d0b') },
    미디어: { high: U('1611162616475-46b6352e64ce') },
    법: { high: U('1589829545856-d10d557cf95f') },
    건강: { high: U('1544367567-0f2fcb009e0b') },
    스포츠: { high: U('1542751371-adc38448a05e') },
  },
  // 5호: 국방, 전기차/수소, 교통안전, 판소리, 농구·배구
  5: {
    정치: { elementary: U('1540914122471-2b16eae459de'), middle: U('1524661135-423995f22d0b'), high: U('1540914122471-2b16eae459de') },
    경제: { elementary: U('1579621970563-ebec7560ff3e'), middle: U('1579621970563-ebec7560ff3e'), high: U('1576092764391-3510ef7972a3') },
    사회: { elementary: U('1544620347-c4fe4d3a4d59'), middle: U('1544620347-c4fe4d3a4d59'), high: U('1524661135-423995f22d0b') },
    문화: { elementary: U('1528360983277-518d751faf61'), middle: U('1611162616475-46b6352e64ce'), high: U('1611162616475-46b6352e64ce') },
    과학: { elementary: U('1581092160569-d6d2e7635a44'), middle: U('1593941707882-6fc9552d0e76'), high: U('1559757148-5c4a2c950330') },
    환경: { middle: U('1532992742220-6ac5bc4d8b62'), high: U('1542601906990-b4d3fb778b09') },
    국제: { middle: U('1524661135-423995f22d0b'), high: U('1524661135-423995f22d0b') },
    미디어: { high: U('1611162616475-46b6352e64ce') },
    법: { high: U('1589829545856-d10d557cf95f') },
    건강: { high: U('1571019613454-1cb2f99b2d8b') },
    스포츠: { high: U('1546519638-af2f498e742f') },
  },
  // 6호: 여성의날, 봄꽃, 산불
  6: {
    사회: { elementary: U('1529156069898-49953e39b3ac'), middle: U('1594489507012-925abef0ed5c'), high: U('1594489507012-925abef0ed5c') },
    문화: { elementary: U('1523241287236-6470d976904f'), middle: U('1469472748027-16bed6bbe01e'), high: U('1611162616475-46b6352e64ce') },
    환경: { middle: U('1534368959575-1927319b2c05'), high: U('1542601906990-b4d3fb778b09') },
  },
};

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

/** 주차별로 다른 기사 반환 (1~6호는 각 주 이슈+해당 이미지, 7호+는 1~6 순환) */
export function getArticleForWeek(
  weekNumber: number,
  section: string,
  level: Level
): SectionArticleInput | null {
  const base = SECTION_ARTICLES[section]?.[level];
  if (!base) return null;

  const weekIdx = getWeekIndex(weekNumber);
  const theme = WEEK_THEMES[weekIdx]?.[section]?.[level];
  const imageUrl = WEEK_IMAGES[weekIdx]?.[section]?.[level] ?? base.imageUrl;

  if (!theme) return { ...base, imageUrl };

  return {
    ...base,
    title: theme.title,
    summary: theme.summary,
    imageUrl,
    ...(theme.body && { body: theme.body }),
  };
}
