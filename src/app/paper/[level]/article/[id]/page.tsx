import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LEVEL_LABELS, type Level } from '@/lib/constants';
import { formatIssueDateShort } from '@/lib/weekUtils';
import { getArticleById, getWeeklyIssue } from '@/data/weeklyIssues';
import { getKeyPhrasesForArticle } from '@/data/weeklyArticleVariants';
import { ISSUE_NUMBER_BASE } from '@/lib/constants';

const VALID_LEVELS: Level[] = ['elementary', 'middle', 'high'];

export function generateStaticParams() {
  const params: { level: string; id: string }[] = [];
  for (let week = 1; week <= 24; week++) {
    const issue = getWeeklyIssue(week);
    if (!issue) continue;
    for (const a of issue.articles) {
      params.push({ level: a.level, id: a.id });
    }
  }
  return params;
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ level: string; id: string }>;
}) {
  const { level: levelParam, id: articleId } = await params;
  if (!VALID_LEVELS.includes(levelParam as Level)) notFound();
  const level = levelParam as Level;

  const article = getArticleById(articleId);
  if (!article || article.level !== level) notFound();

  const issue = getWeeklyIssue(parseInt(articleId.split('-')[0], 10));
  const issueNumber = issue ? ISSUE_NUMBER_BASE + issue.weekNumber : 0;
  const issueLabel = issue
    ? `제${issueNumber}호_${formatIssueDateShort(issue.issueDate)}`
    : '';

  const imageUrl =
    article.imageUrl ||
    `https://picsum.photos/seed/${encodeURIComponent(article.id)}/800/450`;

  // 기사 저장 시 뽑은 키워드 사용 (이 키워드 기준으로 이미지도 매칭됨)
  const fullText = `${article.title} ${article.summary} ${article.body ?? ''}`;
  const displayPhrases =
    article.keyPhrases?.length ? article.keyPhrases : getKeyPhrasesForArticle(fullText, level);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-[var(--color-ink)] bg-white/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/paper/${level}${issue ? `?week=${issue.weekNumber}` : ''}`}
            className="text-sm font-medium text-gray-600 hover:text-[var(--color-ink)]"
            aria-label="목록으로"
          >
            ← 목록
          </Link>
          <span className="font-headline font-bold text-lg">
            {LEVEL_LABELS[level]}
          </span>
          <span className="w-10" aria-hidden />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <figure className="mb-4 rounded-xl overflow-hidden border border-gray-200 -mx-4 sm:mx-0">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full aspect-video object-cover"
            referrerPolicy="no-referrer"
          />
        </figure>

        <p className="text-xs text-gray-500 mb-1">{issueLabel}</p>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {article.category}
        </span>
        <h1 className="font-headline text-xl sm:text-2xl font-bold mt-1 text-[var(--color-ink)] leading-snug">
          {article.title}
        </h1>
        <p className="text-sm text-gray-600 mt-2">{article.summary}</p>
        <p className="text-xs text-gray-500 mt-3">JP 타임즈 · {LEVEL_LABELS[level]}</p>

        <div className="mt-6 prose prose-gray max-w-none">
          <div className="text-[var(--color-ink)] leading-relaxed whitespace-pre-line">
            {article.body}
          </div>
        </div>

        {displayPhrases.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              핵심 키워드
            </p>
            <p className="text-sm text-[var(--color-ink)]">
              {displayPhrases.join(' · ')}
            </p>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link
            href={`/paper/${level}${issue ? `?week=${issue.weekNumber}` : ''}`}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← 기사 목록으로
          </Link>
        </div>
      </main>
    </div>
  );
}
