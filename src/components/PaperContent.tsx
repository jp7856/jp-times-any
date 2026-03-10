'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  LEVEL_LABELS,
  LEVEL_SECTION_HEADING,
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
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-5 sm:py-6">
        {/* 호수 선택 */}
        <div className="mb-5">
          <label htmlFor="issue-select" className="text-sm text-gray-600 mr-2">
            호수
          </label>
          <div className="relative inline-block min-w-[200px] sm:min-w-[240px]">
            <select
              id="issue-select"
              value={validWeek}
              onChange={(e) => handleIssueChange(Number(e.target.value))}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-9 py-2.5 text-[var(--color-ink)] text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              aria-label="호수 선택"
            >
              {recentWeeks.map((w) => {
                const d = getIssueDateByWeekNumber(w);
                const num = ISSUE_NUMBER_BASE + w;
                return (
                  <option key={w} value={w}>
                    {num}호 ({formatIssueDateShort(d)})
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

        {/* 섹션 제목: 초등 기사 / 중등 기사 / 고등 기사 */}
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-5">
          {LEVEL_SECTION_HEADING[level]}
        </h2>

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
          <>
            {issue?.theme && (
              <p className="text-sm text-gray-600 mb-4">{issue.theme}</p>
            )}
            <ul className="space-y-5 sm:space-y-6">
              {articles.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          </>
        )}

        <footer className="mt-10 pt-4 text-center text-sm text-gray-500">
          JP Times · {LEVEL_LABELS[level]}
        </footer>
      </main>
    </>
  );
}
