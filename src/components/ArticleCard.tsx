import Link from 'next/link';
import type { Article } from '@/types/article';
import { LEVEL_LABELS, type Level } from '@/lib/constants';

interface ArticleCardProps {
  article: Article;
  issueLabel: string;
  level: Level;
  compact?: boolean;
}

/** 레벨별 카드 크기: 고등=가장 작게, 중등=조금 더, 초등=가장 크게 */
const CARD_STYLES: Record<
  Level,
  { image: string; padding: string; category: string; title: string; showMeta?: boolean }
> = {
  high: {
    image: 'h-14 sm:h-16',
    padding: 'p-1.5',
    category: 'text-[9px] px-1 py-0.5',
    title: 'text-[11px] leading-tight',
  },
  middle: {
    image: 'h-16 sm:h-20',
    padding: 'p-2',
    category: 'text-[10px] px-1 py-0.5',
    title: 'text-xs leading-snug',
  },
  elementary: {
    image: 'aspect-[4/3] min-h-24 sm:min-h-28',
    padding: 'p-2.5 sm:p-3',
    category: 'text-xs px-1.5 py-0.5',
    title: 'text-sm sm:text-base leading-snug',
    showMeta: true,
  },
};

export function ArticleCard({ article, issueLabel, level, compact }: ArticleCardProps) {
  const primaryImageUrl =
    article.imageUrl ||
    `https://picsum.photos/seed/${encodeURIComponent(article.id)}/800/600`;
  const fallbackImageUrl = `https://picsum.photos/seed/${encodeURIComponent(
    `${article.id}-fallback`
  )}/800/600`;
  const style = CARD_STYLES[level];

  return (
    <Link
      href={`/paper/${level}/article/${article.id}`}
      className="block bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`bg-gray-100 relative overflow-hidden ${style.image}`}>
        <img
          src={primaryImageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallback === '1') return;
            img.dataset.fallback = '1';
            img.src = fallbackImageUrl;
          }}
        />
      </div>
      <div className={style.padding}>
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className={`font-medium text-emerald-600 bg-emerald-50 rounded ${style.category}`}>
            {article.category}
          </span>
          {style.showMeta && <p className="text-xs text-gray-500">{issueLabel}</p>}
        </div>
        <h3 className={`font-headline font-bold text-[var(--color-ink)] line-clamp-2 ${style.title}`}>
          {article.title}
        </h3>
        {style.showMeta && (
          <p className="text-xs text-gray-500 mt-1.5">
            JP 타임즈 · {LEVEL_LABELS[level]}
          </p>
        )}
      </div>
    </Link>
  );
}
