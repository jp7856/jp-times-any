import Link from 'next/link';
import type { Article } from '@/types/article';
import { LEVEL_LABELS, type Level } from '@/lib/constants';

interface ArticleCardProps {
  article: Article;
  issueLabel: string;
  level: Level;
  compact?: boolean;
}

export function ArticleCard({ article, issueLabel, level, compact }: ArticleCardProps) {
  const imageUrl =
    article.imageUrl ||
    `https://picsum.photos/seed/${encodeURIComponent(article.id)}/400/240`;

  return (
    <Link
      href={`/paper/${level}/article/${article.id}`}
      className="block bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div
        className={`bg-gray-100 relative overflow-hidden ${
          compact ? 'aspect-video' : 'aspect-[4/3]'
        }`}
      >
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className={compact ? 'p-2' : 'p-3 sm:p-4'}>
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className={`font-medium text-emerald-600 bg-emerald-50 rounded ${
              compact ? 'text-[10px] px-1 py-0.5' : 'text-xs px-1.5 py-0.5'
            }`}
          >
            {article.category}
          </span>
          {!compact && <p className="text-xs text-gray-500">{issueLabel}</p>}
        </div>
        <h3
          className={`font-headline font-bold text-[var(--color-ink)] leading-snug line-clamp-2 ${
            compact ? 'text-xs' : 'text-base sm:text-lg'
          }`}
        >
          {article.title}
        </h3>
        {!compact && (
          <p className="text-xs text-gray-500 mt-2">
            JP 타임즈 · {LEVEL_LABELS[level]}
          </p>
        )}
      </div>
    </Link>
  );
}
