/** 매주 월요일 발행, 1호 발행일 2026년 2월 2일(월) */
export const FIRST_ISSUE_DATE = new Date(2026, 1, 2); // 2026-02-02 (month 0-indexed)

export type Level = 'elementary' | 'middle' | 'high';

export const LEVEL_LABELS: Record<Level, string> = {
  elementary: '초등',
  middle: '중등',
  high: '고등',
};

/** 기사 목록 섹션 제목 (예: 초등 기사) */
export const LEVEL_SECTION_HEADING: Record<Level, string> = {
  elementary: '초등 기사',
  middle: '중등 기사',
  high: '고등 기사',
};

export const LEVEL_DESCRIPTIONS: Record<Level, string> = {
  elementary: '초등학생을 위한 쉬운 말 신문',
  middle: '중학생을 위한 알맞은 난이도 신문',
  high: '고등학생·성인을 위한 심화 신문',
};

/** 호수 표기: 1호 = 2026.02.02(월), N호 = N주차 */
export const ISSUE_NUMBER_BASE = 0;
