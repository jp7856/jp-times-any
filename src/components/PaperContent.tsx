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

  const groupedByCategory = articles.reduce<Record<string, typeof articles>>(
    (acc, a) => {
      const cat = a.category || '기타';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(a);
      return acc;
    },
    {}
  );
  const categoryOrder = ['정치', '경제', '사회', '문화', '과학', '교육', '환경', '국제', '미디어', '법', '건강', '스포츠', '세계', '기타'];
  const sortedCategories = Object.keys(groupedByCategory).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <>
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-5 sm:py-6">
        {/* NE Times 스타일: 기사 읽기 안내 */}
        <p className="text-sm text-gray-600 mb-4">
          이번 주 JP 타임즈에는 어떤 뉴스들이 담겨 있는지 확인해 보세요.
        </p>

        {/* 호수 선택 (NE Times: [1064호] 2026.03.09 형식 참고) */}
        <div className="mb-5">
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

        {/* 섹션 제목: 초등 기사 / 중등 기사 / 고등 기사 (녹색 + 밑줄, NE Times 스타일) */}
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 border-b-2 border-emerald-700 pb-2 mb-5">
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
            {/* 섹션별 기사 - 한 화면에 모두 표시 (중등·고등은 컴팩트) */}
            {sortedCategories.map((category) => (
              <section
                key={category}
                className={
                  level === 'elementary'
                    ? 'mb-6'
                    : level === 'middle'
                      ? 'mb-4'
                      : 'mb-3'
                }
              >
                <h3
                  className={
                    level === 'elementary'
                      ? 'text-base font-bold text-gray-800 border-l-4 border-emerald-600 pl-3 mb-3'
                      : 'text-sm font-bold text-gray-800 border-l-2 border-emerald-600 pl-2 mb-2'
                  }
                >
                  {category}
                </h3>
                <ul
                  className={`grid gap-2 sm:gap-3 ${
                    level === 'elementary'
                      ? 'grid-cols-2'
                      : level === 'middle'
                        ? 'grid-cols-2 sm:grid-cols-4'
                        : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                  }`}
                >
                  {groupedByCategory[category].map((article) => (
                    <li key={article.id}>
                      <ArticleCard
                        article={article}
                        issueLabel={`제${issueNumber}호_${formatIssueDateShort(issueDate)}`}
                        level={level}
                        compact={level === 'middle' || level === 'high'}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}

        <footer className="mt-10 pt-4 text-center text-sm text-gray-500">
          JP Times · {LEVEL_LABELS[level]}
        </footer>
      </main>
    </>
  );
}
