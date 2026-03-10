import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { LEVEL_LABELS, type Level } from '@/lib/constants';
import { PaperContent } from '@/components/PaperContent';

const VALID_LEVELS: Level[] = ['elementary', 'middle', 'high'];

export function generateStaticParams() {
  return VALID_LEVELS.map((level) => ({ level }));
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level: levelParam } = await params;

  if (!VALID_LEVELS.includes(levelParam as Level)) notFound();
  const level = levelParam as Level;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-[var(--color-ink)] bg-white/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
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

      <Suspense fallback={<div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 text-gray-500">로딩 중...</div>}>
        <PaperContent level={level} />
      </Suspense>
    </div>
  );
}
