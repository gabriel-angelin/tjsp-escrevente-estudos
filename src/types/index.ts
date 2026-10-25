export type ProfileKey = 'gabriel' | 'esposa';

export interface UserStats {
  profileName: string;
  totalStudyMinutes: number;
  completedTopicIds: string[];
  topicMetrics: Record<string, {
    questionsDone: number;
    questionsCorrect: number;
    lastStudied?: string;
    review1Done?: boolean;
    review2Done?: boolean;
    review3Done?: boolean;
  }>;
  savedEssays: Array<{
    id: string;
    themeId: string;
    themeTitle: string;
    text: string;
    linesCount: number;
    date: string;
    scoreEstimation?: number;
    notes?: string;
  }>;
  studyLogs: Array<{
    id: string;
    date: string;
    minutes: number;
    subjectId: string;
    notes?: string;
  }>;
}

export interface AppStorage {
  profiles: {
    gabriel: UserStats;
    esposa: UserStats;
  };
  activeProfile: ProfileKey;
}

export type SubjectCategory = 'direito' | 'portugues' | 'gerais' | 'redacao';

export interface TopicItem {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  category: SubjectCategory;
  bloc: 'Bloco I' | 'Bloco II' | 'Bloco III' | 'Discursiva';
  importance: 'Alta' | 'Altíssima' | 'Média';
  summary: string;
  keyArticles?: string;
  fullContent: string;
  vunespTips: string[];
  practiceQuestions?: Array<{
    id: string;
    year: string;
    exam: string;
    statement: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

export interface WeekPlan {
  weekNumber: number;
  startDate: string;
  endDate: string;
  theme: string;
  days: Array<{
    dayName: string;
    subject1: string;
    subject2: string;
    topicIds: string[];
    taskDescription: string;
    timeMinutes: number;
    isRedacao?: boolean;
    isSimulado?: boolean;
  }>;
}
