import type { Level } from '@/lib/constants';

export interface Article {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  level: Level;
  imageUrl?: string;
}

export interface WeeklyIssue {
  weekNumber: number;
  issueDate: Date;
  theme: string;
  articles: Article[];
}
