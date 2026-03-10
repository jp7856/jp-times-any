import Link from 'next/link';
import { LEVEL_LABELS, LEVEL_DESCRIPTIONS, type Level } from '@/lib/constants';
import { getCurrentWeekNumber, formatIssueDate, getIssueDateByWeekNumber } from '@/lib/weekUtils';

const LEVELS: Level[] = ['elementary', 'middle', 'high'];

const LEVEL_STYLES: Record<Level, string> = {
  elementary: 'border-amber-200 bg-amber-50/80 hover:bg-amber-100',
  middle: 'border-sky-200 bg-sky-50/80 hover:bg-sky-100',
  high: 'border-slate-200 bg-slate-100/80 hover:bg-slate-200',
};

export default function HomePage() {
  const currentWeek = getCurrentWeekNumber();
  const latestIssueDate = currentWeek > 0 ? getIssueDateByWeekNumber(currentWeek) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-[var(--color-ink)] bg-white/90 backdrop-blur sticky top-0 z-10 safe-area-inset-top">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:py-5">
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-center tracking-tight">
            JP Times
          </h1>
          <p className="text-center text-sm text-gray-600 mt-1">
            매주 월요일 발행 · 2026년 2월 2일 1호
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 sm:py-8">
        {currentWeek > 0 && latestIssueDate && (
          <p className="text-center text-sm text-gray-600 mb-6">
            최신호: {formatIssueDate(latestIssueDate)} ({currentWeek}주차)
          </p>
        )}

        <p className="text-center text-gray-700 mb-8 sm:mb-10">
          읽고 싶은 단계를 골라 주세요.
        </p>

        <ul className="space-y-4 sm:space-y-5">
          {LEVELS.map((level) => (
            <li key={level}>
              <Link
                href={`/paper/${level}`}
                className={`block rounded-xl border-2 p-5 sm:p-6 transition-colors touch-target ${LEVEL_STYLES[level]}`}
              >
                <span className="font-headline text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                  {LEVEL_LABELS[level]}
                </span>
                <p className="mt-2 text-sm text-gray-700">
                  {LEVEL_DESCRIPTIONS[level]}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-12 pt-6 border-t border-[var(--color-border)] text-center text-sm text-gray-500">
          JP Times · 주간 이슈 한글 신문
        </footer>
      </main>
    </div>
  );
}
