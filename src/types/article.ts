import type { Level } from '@/lib/constants';

export interface Article {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  level: Level;
  imageUrl?: string;
  /** 기사 하단에 표시하는 핵심 키워드 (이 키워드 기준으로 이미지 매칭) */
  keyPhrases?: string[];
}

export interface WeeklyIssue {
  weekNumber: number;
  issueDate: Date;
  theme: string;
  articles: Article[];
}
