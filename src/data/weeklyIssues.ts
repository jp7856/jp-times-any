import type { Level } from '@/lib/constants';
import type { Article, WeeklyIssue } from '@/types/article';
import { getIssueDateByWeekNumber } from '@/lib/weekUtils';
import {
  SECTIONS_ELEMENTARY,
  SECTIONS_MIDDLE,
  SECTIONS_HIGH,
} from '@/data/sectionArticles';
import { getArticleForWeek } from '@/data/weeklyArticleVariants';

/** 주차별로 섹션 기반 기사 생성. 1~6호는 해당 주 이슈, 7호+는 1~6 순환. */
export function getWeeklyIssue(weekNumber: number): WeeklyIssue | null {
  const issueDate = getIssueDateByWeekNumber(weekNumber);
  const articles: Article[] = [];

  const addByLevel = (
    sections: readonly string[],
    level: Level,
    prefix: string
  ) => {
    sections.forEach((section, i) => {
      const set = getArticleForWeek(weekNumber, section, level);
      if (!set) return;
      const id = `${weekNumber}-${prefix}-${i + 1}`;
      articles.push({
        id,
        title: set.title,
        summary: set.summary,
        body: set.body,
        category: section,
        level,
        imageUrl: set.imageUrl,
      });
    });
  };

  addByLevel(SECTIONS_ELEMENTARY, 'elementary', 'e');
  addByLevel(SECTIONS_MIDDLE, 'middle', 'm');
  addByLevel(SECTIONS_HIGH, 'high', 'h');

  return {
    weekNumber,
    issueDate,
    theme: '이번 주 뉴스',
    articles,
  };
}

/** 특정 레벨 기사만 필터 */
export function getArticlesByLevel(
  weekNumber: number,
  level: Level
): Article[] {
  const issue = getWeeklyIssue(weekNumber);
  if (!issue) return [];
  return issue.articles.filter((a) => a.level === level);
}

/** 기사 ID로 단일 기사 조회 (ID 형식: "1-e-정치-1") */
export function getArticleById(articleId: string): Article | null {
  const parts = articleId.split('-');
  const weekNumber = parseInt(parts[0], 10);
  if (!Number.isFinite(weekNumber) || weekNumber < 1) return null;
  const issue = getWeeklyIssue(weekNumber);
  if (!issue) return null;
  return issue.articles.find((a) => a.id === articleId) ?? null;
}
