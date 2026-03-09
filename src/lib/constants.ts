/** 매주 월요일 발행, 첫 발행일 2월 2일 */
export const FIRST_ISSUE_DATE = new Date(2025, 1, 2); // 2025-02-02 (month 0-indexed)

export type Level = 'elementary' | 'middle' | 'high';

export const LEVEL_LABELS: Record<Level, string> = {
  elementary: '초등',
  middle: '중등',
  high: '고등',
};

export const LEVEL_DESCRIPTIONS: Record<Level, string> = {
  elementary: '초등학생을 위한 쉬운 말 신문',
  middle: '중학생을 위한 알맞은 난이도 신문',
  high: '고등학생·성인을 위한 심화 신문',
};
