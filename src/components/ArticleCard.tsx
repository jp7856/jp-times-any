import Link from 'next/link';
import type { Article } from '@/types/article';
import { LEVEL_LABELS, type Level } from '@/lib/constants';

interface ArticleCardProps {
  article: Article;
  issueLabel: string;
  level: Level;
}

export function ArticleCard({ article, issueLabel, level }: ArticleCardProps) {
  const imageUrl =
    article.imageUrl ||
    `https://picsum.photos/seed/${encodeURIComponent(article.id)}/400/240`;

  return (
    <Link
      href={`/paper/${level}/article/${article.id}`}
      className="block bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[400/240] bg-gray-100 relative">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-xs text-gray-500 mb-1">{issueLabel}</p>
        <h3 className="font-headline text-base sm:text-lg font-bold text-[var(--color-ink)] leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 mt-2">
          JP 타임즈 · {LEVEL_LABELS[level]}
        </p>
      </div>
    </Link>
  );
}
