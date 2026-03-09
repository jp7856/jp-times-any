import type { Article } from '@/types/article';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="newspaper-border rounded-lg bg-white p-4 sm:p-5">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {article.category}
      </span>
      <h3 className="font-headline text-lg sm:text-xl font-bold mt-1 text-[var(--color-ink)] leading-snug">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        {article.summary}
      </p>
      <div className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
        {article.body}
      </div>
    </article>
  );
}
