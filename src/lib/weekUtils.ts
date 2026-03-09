import { FIRST_ISSUE_DATE } from './constants';

/** 오늘이 속한 주의 월요일 날짜 (한국 시간 기준) */
export function getThisWeekMonday(): Date {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - (day === 0 ? 7 : day) + 1; // 월요일 = 1
  const monday = new Date(d);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/** 첫 발행일(2월 2일)의 월요일. 2025-02-02가 일요일이면 그 주 월요일은 1/27 */
function getFirstMonday(): Date {
  const d = new Date(FIRST_ISSUE_DATE);
  const day = d.getDay();
  const diff = d.getDate() - (day === 0 ? 7 : day) + 1;
  const monday = new Date(d);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/** 첫 발행 주의 월요일 */
const FIRST_MONDAY = getFirstMonday();

/** 특정 날짜가 첫 발행일 이전인지 */
export function isBeforeFirstIssue(date: Date): boolean {
  return date.getTime() < FIRST_MONDAY.getTime();
}

/** N주차(1-based) 발행일(월요일) 반환 */
export function getIssueDateByWeekNumber(weekNumber: number): Date {
  const d = new Date(FIRST_MONDAY);
  d.setDate(d.getDate() + (weekNumber - 1) * 7);
  return d;
}

/** 날짜로부터 주차 번호(1-based) 계산. 첫 발행 주 = 1 */
export function getWeekNumberFromDate(date: Date): number {
  const monday = new Date(date);
  const day = monday.getDay();
  const diff = monday.getDate() - (day === 0 ? 7 : day) + 1;
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);

  if (monday.getTime() < FIRST_MONDAY.getTime()) return 0;
  const diffMs = monday.getTime() - FIRST_MONDAY.getTime();
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return diffWeeks + 1;
}

/** 현재 볼 수 있는 최신 주차 (오늘이 첫 발행 전이면 0) */
export function getCurrentWeekNumber(): number {
  return getWeekNumberFromDate(new Date());
}

/** 날짜 포맷 (예: 2025년 2월 3일) */
export function formatIssueDate(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
