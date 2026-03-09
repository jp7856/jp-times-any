import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LEVEL_LABELS, type Level } from '@/lib/constants';
import { getCurrentWeekNumber, formatIssueDate, getIssueDateByWeekNumber, isBeforeFirstIssue } from '@/lib/weekUtils';
import { getWeeklyIssue, getArticlesByLevel } from '@/data/weeklyIssues';
import { ArticleCard } from '@/components/ArticleCard';

const VALID_LEVELS: Level[] = ['elementary', 'middle', 'high'];

export default async function PaperPage({
  params,
  searchParams,
}: {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ week?: string }>;
}) {
  const { level: levelParam } = await params;
  const { week: weekParam } = await searchParams;

  if (!VALID_LEVELS.includes(levelParam as Level)) notFound();
  const level = levelParam as Level;

  const currentWeek = getCurrentWeekNumber();
  const weekNumber = weekParam ? parseInt(weekParam, 10) : currentWeek;
  const validWeek = weekNumber >= 1 && weekNumber <= currentWeek ? weekNumber : currentWeek;

  const issueDate = getIssueDateByWeekNumber(validWeek);
  const issue = getWeeklyIssue(validWeek);
  const articles = getArticlesByLevel(validWeek, level);

  const beforeFirst = isBeforeFirstIssue(new Date());

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-[var(--color-ink)] bg-white/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-[var(--color-ink)] touch-target flex items-center gap-1"
            aria-label="홈으로"
          >
            ← 홈
          </Link>
          <span className="font-headline font-bold text-lg truncate">
            {LEVEL_LABELS[level]}
          </span>
          <span className="w-12" aria-hidden />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-5 sm:py-6">
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {formatIssueDate(issueDate)} · {validWeek}주차
          </p>
          {issue?.theme && (
            <h2 className="font-headline text-xl sm:text-2xl font-bold mt-1 text-[var(--color-ink)]">
              {issue.theme}
            </h2>
          )}
        </div>

        {beforeFirst && currentWeek === 0 ? (
          <div className="rounded-xl border-2 border-[var(--color-border)] bg-gray-50 p-6 text-center text-gray-600">
            <p>아직 발행 전입니다.</p>
            <p className="mt-2 text-sm">첫 발행일: 2025년 2월 2일 주간부터 이용할 수 있어요.</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-xl border-2 border-[var(--color-border)] bg-gray-50 p-6 text-center text-gray-600">
            <p>이 주의 기사가 아직 없습니다.</p>
          </div>
        ) : (
          <ul className="space-y-5 sm:space-y-6">
            {articles.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        )}

        {currentWeek > 1 && (
          <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
            <p className="text-sm text-gray-600 mb-3">다른 주차 보기</p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: Math.min(currentWeek, 12) }, (_, i) => currentWeek - i).map(
                (w) => (
                  <Link
                    key={w}
                    href={`/paper/${level}?week=${w}`}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      w === validWeek
                        ? 'bg-[var(--color-ink)] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {w}주차
                  </Link>
                )
              )}
            </div>
          </div>
        )}

        <footer className="mt-10 pt-4 text-center text-sm text-gray-500">
          JP Times · {LEVEL_LABELS[level]}
        </footer>
      </main>
    </div>
  );
}
