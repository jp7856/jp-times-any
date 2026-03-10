import type { Level } from '@/lib/constants';
import type { Article, WeeklyIssue } from '@/types/article';
import { getIssueDateByWeekNumber } from '@/lib/weekUtils';

/** 1~6주차 테마. 7주차 이후는 이 테마를 순환해 사용합니다. */
const ISSUE_WEEK_COUNT = 6;

/** 주차별 이슈 테마와 기사 (레벨별). 실제 서비스에서는 API로 주간 이슈를 가져올 수 있습니다. */
const ISSUES_BY_WEEK: Record<
  number,
  { theme: string; articles: Omit<Article, 'level'>[] }
> = {
  1: {
    theme: '인공지능과 우리 생활',
    articles: [
      {
        id: '1-e',
        title: '친구처럼 말하는 로봇, 챗GPT',
        summary: '컴퓨터가 우리 말을 알아듣고 대답해요.',
        body: '요즘 많은 사람들이 ‘챗GPT’라는 프로그램을 씁니다. 이건 컴퓨터가 사람 말을 알아듣고, 글로 대답해 주는 프로그램이에요. 질문을 쓰면 답을 알려 주고, 숙제를 도와 주기도 해요. 다만 틀린 말을 할 수도 있으니, 꼭 어른과 함께 쓰는 것이 좋아요.',
        category: '과학',
      },
      {
        id: '1-m',
        title: 'AI 챗봇의 일상 보급과 활용',
        summary: '대화형 AI가 학습·업무에 쓰이는 이유',
        body: '챗GPT를 비롯한 대화형 AI가 학생들의 탐구 학습, 직장인의 보고서 초안 작성 등에 쓰이고 있다. 편리한 만큼 지나친 의존은 독이 될 수 있어, 사실 확인과 비판적 사고가 필요하다는 지적이 나온다.',
        category: '과학',
      },
      {
        id: '1-h',
        title: '생성형 AI 규제와 윤리: 한국·EU 동향',
        summary: 'AI 법제와 저작권·허위정보 이슈',
        body: 'EU AI법이 단계적으로 시행되며 고위험 AI에 대한 규제가 강화되고, 한국도 AI 기본법 추진과 함께 생성형 AI의 저작권·허위정보 유포 문제가 논의되고 있다. 기술 수용과 동시에 신뢰성·책임성 확보가 과제로 부상했다.',
        category: '과학',
      },
    ],
  },
  2: {
    theme: '기후 위기와 탄소 줄이기',
    articles: [
      {
        id: '2-e',
        title: '지구가 더워지면 왜 위험할까?',
        summary: '날씨가 심해지고 동식물이 힘들어져요.',
        body: '지구가 더워지는 것을 ‘지구 온난화’라고 해요. 자동차와 공장에서 나오는 이산화탄소가 원인이라고 해요. 그러면 폭염, 가뭄, 큰 비가 자주 오고, 귀여운 동물들이 사는 곳이 줄어들 수 있어요. 전기 절약, 쓰레기 줄이기로 우리도 도울 수 있어요.',
        category: '환경',
      },
      {
        id: '2-m',
        title: '탄소중립과 청소년 실천',
        summary: '2050 탄소중립과 일상 속 탄소 발자국',
        body: '2050 탄소중립 목표에 맞춰 학교와 지역사회에서 탄소 발자국 줄기 운동, 재활용·에너지 절약 캠페인이 확대되고 있다. 청소년도 플라스틱 줄이기, 대중교통 이용 등 작은 습관으로 기후 행동에 동참할 수 있다.',
        category: '환경',
      },
      {
        id: '2-h',
        title: '탄소국경조정제도(CBAM)와 산업 대응',
        summary: 'EU CBAM과 한국 수출·규제 대응',
        body: 'EU의 탄소국경조정제도(CBAM)가 본격화되며 철강·시멘트 등 수출 업체에 탄소 비용이 부과된다. 한국도 배출권 거래제 강화와 저탄소 제품 전환을 통해 경쟁력을 확보해야 한다는 목소리가 높다.',
        category: '환경',
      },
    ],
  },
  3: {
    theme: '청소년 스마트폰과 디지털 리터러시',
    articles: [
      {
        id: '3-e',
        title: '스마트폰, 얼마나 쓰면 좋을까?',
        summary: '적당히 쓰면 도움이 돼요.',
        body: '스마트폰으로 공부하고 친구와 연락할 수 있어 좋죠. 그런데 너무 오래 보면 눈이 아프고, 잠도 잘 안 올 수 있어요. 우리 반 친구들은 ‘하루에 1시간만’ 같이 정해 쓰고 있어요. 엄마·아빠와 함께 쓰는 시간을 정해 보세요.',
        category: '사회',
      },
      {
        id: '3-m',
        title: '스마트폰 사용 시간과 자율 규칙',
        summary: '과의존 예방을 위한 학교·가정 논의',
        body: '청소년 스마트폰 사용 시간이 논란이 되며, 일부 학교에서는 ‘스마트폰 주머니’를 도입하고 가정에서는 사용 규칙을 정해 보는 사례가 늘고 있다. 단순 제한보다는 디지털 리터러시 교육과 자기 조절 능력 키우기가 강조된다.',
        category: '사회',
      },
      {
        id: '3-h',
        title: '가짜 뉴스와 디지털 시민성',
        summary: '검증과 비판적 소비의 중요성',
        body: 'SNS와 메신저를 통해 유포되는 가짜 뉴스와 딥페이크가 선거·이슈 형성에 영향을 미치면서, 정보 검증과 출처 확인이 디지털 시민의 덕목으로 부상했다. 미디어 리터러시 교육 강화와 플랫폼 책임 논의가 이어지고 있다.',
        category: '사회',
      },
    ],
  },
  4: {
    theme: '우주 탐사와 한국의 역할',
    articles: [
      {
        id: '4-e',
        title: '한국 로켓이 우주로 날아가요',
        summary: '누리호가 위성을 쏘아 올려요.',
        body: '우리나라가 만든 로켓 ‘누리호’가 우주로 위성을 쏘아 올렸어요. 이렇게 하면 날씨를 더 잘 맞추고, 지도도 더 정확해져요. 나중에는 달이나 화성에도 가고 싶다고 과학자들이 말해요.',
        category: '과학',
      },
      {
        id: '4-m',
        title: '누리호와 한국형 발사체의 다음 목표',
        summary: '상업 발사와 달 탐사 연계',
        body: '누리호의 성공적 발사 이후 한국형 발사체의 재사용 기술과 상업 위성 발사 수요 연계가 논의되고 있다. 달 착륙선·궤도선 사업과 맞물려 우주 산업 생태계 확대가 기대된다.',
        category: '과학',
      },
      {
        id: '4-h',
        title: 'Artemis와 달·화성 탐사 경쟁',
        summary: '미·중·유럽 우주 전략과 한국 포지션',
        body: '미국 아르테미스 프로그램과 중국의 달·화성 탐사가 본격화되며 우주 자원·주권 논의가 뜨겁다. 한국은 NASA·ESA와의 협력과 자체 발사·궤도 기술을 바탕으로 우주 경제 시대에 대비하고 있다.',
        category: '과학',
      },
    ],
  },
  5: {
    theme: '청년 일자리와 노동 시장',
    articles: [
      {
        id: '5-e',
        title: '어른들이 일하는 곳은 어떤 곳이 있을까?',
        summary: '여러 가지 직업이 있어요.',
        body: '어른들은 회사, 병원, 학교, 가게 같은 곳에서 일해요. 어떤 사람은 컴퓨터로 일하고, 어떤 사람은 손으로 만드는 일을 해요. 우리도 커서 재미있는 일을 찾을 수 있어요.',
        category: '사회',
      },
      {
        id: '5-m',
        title: '청년 취업과 비정규직 논의',
        summary: '일자리 질과 안정성 이슈',
        body: '청년 실업률과 비정규직 비중이 사회 문제로 거론되며, 최저임금 인상과 고용 보호 강화 방안이 논의되고 있다. 진로 교육에서도 단순 취업률이 아니라 일의 의미와 권리 이해가 강조되는 추세다.',
        category: '사회',
      },
      {
        id: '5-h',
        title: '청년 실업과 노동시장 이중구조',
        summary: '정규·비정규 격차와 정책 대응',
        body: '청년 실업과 노동시장 이중구조가 지속되며 정규직 전환 확대, 최저임금·근로조건 개선, 청년 수당 등 다양한 정책이 제안되고 있다. 구조적 원인에 대한 진단과 효과 검증이 동시에 요구된다.',
        category: '사회',
      },
    ],
  },
  6: {
    theme: '전쟁과 평화, 국제 관계',
    articles: [
      {
        id: '6-e',
        title: '나라마다 다른 말을 써요',
        summary: '세계에는 많은 나라가 있어요.',
        body: '세계에는 많은 나라가 있고, 나라마다 쓰는 말이 달라요. 서로 도우면서 지내는 것을 ‘평화’라고 해요. 우리는 친구와 싸우지 않고 말로 풀어 보는 것처럼, 나라들도 대화로 문제를 푸는 것이 좋아요.',
        category: '세계',
      },
      {
        id: '6-m',
        title: '국제 분쟁과 평화 유지의 중요성',
        summary: 'UN과 다자 협력의 역할',
        body: '지역 분쟁과 지정학적 긴장이 계속되는 가운데, UN과 지역기구를 통한 대화와 평화 유지 활동의 중요성이 강조되고 있다. 청소년도 국제 이슈에 관심을 갖고 평화·인권 가치를 배우는 것이 권장된다.',
        category: '세계',
      },
      {
        id: '6-h',
        title: '미중 경쟁과 글로벌 공급망 재편',
        summary: '패권 경쟁과 한국의 선택지',
        body: '미중 기술·안보 경쟁이 심화되며 반도체·배터리 등 공급망 재편이 가속화되고, 한국은 동맹과 경제 리스크 사이에서 전략적 선택을 요구받고 있다. 다변화와 핵심 기술 자립이 화두다.',
        category: '세계',
      },
    ],
  },
};

function attachLevel(
  articles: Omit<Article, 'level'>[],
  levels: Level[]
): Article[] {
  return articles.map((a, i) => ({
    ...a,
    level: levels[i % levels.length],
  }));
}

/** 주차 번호로 해당 주의 이슈(레벨별 기사 포함) 반환. 7주차 이후는 1~6주차 테마를 순환해 항상 기사가 보이게 합니다. */
export function getWeeklyIssue(weekNumber: number): WeeklyIssue | null {
  const issueDate = getIssueDateByWeekNumber(weekNumber);
  const dataIndex = ((weekNumber - 1) % ISSUE_WEEK_COUNT) + 1;
  const data = ISSUES_BY_WEEK[dataIndex];
  if (!data) {
    return {
      weekNumber,
      issueDate,
      theme: '이 주의 이슈',
      articles: [],
    };
  }
  const levels: Level[] = ['elementary', 'middle', 'high'];
  const articles = attachLevel(data.articles, levels).map((a) => ({
    ...a,
    id: `${weekNumber}-${a.id}`,
  }));
  return {
    weekNumber,
    issueDate,
    theme: data.theme,
    articles,
  };
}

/** 특정 레벨 기사만 필터 */
export function getArticlesByLevel(
  weekNumber: number,
  level: Level
): Article[] {
  const issue = getWeeklyIssue(weekNumber);
  if (!issue) return [];
  return issue.articles.filter((a) => a.level === level);
}
