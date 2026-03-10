'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  LEVEL_LABELS,
  ISSUE_NUMBER_BASE,
  type Level,
} from '@/lib/constants';
import {
  getCurrentWeekNumber,
  getIssueDateByWeekNumber,
  isBeforeFirstIssue,
  formatIssueDateShort,
} from '@/lib/weekUtils';
import { getWeeklyIssue, getArticlesByLevel } from '@/data/weeklyIssues';
import { ArticleCard } from '@/components/ArticleCard';

export function PaperContent({ level }: { level: Level }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const weekParam = searchParams.get('week');
  const currentWeek = getCurrentWeekNumber();
  const weekNumber = weekParam ? parseInt(weekParam, 10) : currentWeek;
  const validWeek =
    weekNumber >= 1 && weekNumber <= currentWeek ? weekNumber : currentWeek;

  const issueDate = getIssueDateByWeekNumber(validWeek);
  const issue = getWeeklyIssue(validWeek);
  const articles = getArticlesByLevel(validWeek, level);
  const beforeFirst = isBeforeFirstIssue(new Date());

  const issueNumber = ISSUE_NUMBER_BASE + validWeek;
  const recentWeeks = Array.from(
    { length: Math.min(currentWeek, 24) },
    (_, i) => currentWeek - i
  );

  function handleIssueChange(week: number) {
    const url = week === currentWeek
      ? `/paper/${level}`
      : `/paper/${level}?week=${week}`;
    router.push(url);
  }


  return (
    <>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-2 sm:py-3">
        {/* 호수 선택 */}
        <div className="mb-1.5">
          <label htmlFor="issue-select" className="text-sm font-medium text-[var(--color-ink)] mr-2">
            기사 읽기
          </label>
          <div className="relative inline-block min-w-[200px] sm:min-w-[260px]">
            <select
              id="issue-select"
              value={validWeek}
              onChange={(e) => handleIssueChange(Number(e.target.value))}
              className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg pl-3 pr-9 py-2.5 text-[var(--color-ink)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              aria-label="호수 선택"
            >
              {recentWeeks.map((w) => {
                const d = getIssueDateByWeekNumber(w);
                const num = ISSUE_NUMBER_BASE + w;
                return (
                  <option key={w} value={w}>
                    [{num}호] {formatIssueDateShort(d)}
                  </option>
                );
              })}
            </select>
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink)]"
              aria-hidden
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

        {beforeFirst && currentWeek === 0 ? (
          <div className="rounded-xl border-2 border-[var(--color-border)] bg-gray-50 p-6 text-center text-gray-600">
            <p>아직 발행 전입니다.</p>
            <p className="mt-2 text-sm">
              첫 발행일: 2026년 2월 2일(월) 1호부터 이용할 수 있어요.
            </p>
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-xl border-2 border-[var(--color-border)] bg-gray-50 p-6 text-center text-gray-600">
            <p>이 주의 기사가 아직 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                issueLabel={`제${issueNumber}호_${formatIssueDateShort(issueDate)}`}
                level={level}
                compact
              />
            ))}
          </div>
        )}

        <footer className="mt-4 pt-2 text-center text-xs text-gray-500">
          JP Times · {LEVEL_LABELS[level]}
        </footer>
      </main>
    </>
  );
}
