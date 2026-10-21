export interface SubTopic {
  id: string;
  title: string;
  summary: string;
  content: string[]; // Markdown-style or formatted paragraphs
  keyTakeaways: string[];
  exampleSituation?: {
    scenario: string;
    analysis: string;
    doAndDont: {
      do: string[];
      dont: string[];
    };
  };
  interactiveTip?: string;
  infographicItems?: {
    icon: string;
    title: string;
    desc: string;
  }[];
}

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  color: string;
  gradient: string;
  estimatedMinutes: number;
  subtopics: SubTopic[];
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceLessonId: number;
}

export interface FactCheckCase {
  id: string;
  title: string;
  context: string;
  aiResponse: string;
  claimedSources: string[];
  hasHallucination: boolean;
  hallucinatedParts: string[];
  actualFact: string;
  investigationSteps: string[];
}

export interface PrivacyDetectionItem {
  id: string;
  title: string;
  userPromptText: string;
  leakedItems: {
    text: string;
    type: 'ชื่อ-สกุล' | 'เลขประจำตัว/บัตร' | 'เบอร์โทรศัพท์/อีเมล' | 'ข้อมูลสุขภาพ/ความลับ' | 'รหัสผ่าน/การเงิน';
    riskLevel: 'สูงมาก' | 'สูง' | 'ปานกลาง';
    explanation: string;
  }[];
  safePromptAlternative: string;
}

export interface ScenarioDilemma {
  id: string;
  role: string;
  title: string;
  context: string;
  choices: {
    id: string;
    actionText: string;
    outcomeTitle: string;
    outcomeDesc: string;
    aiLiteracyScore: number; // e.g. +10, -5
    badgeReward?: string;
    isRecommended: boolean;
    feedback: string;
  }[];
}

export interface UserProgress {
  completedLessons: number[];
  quizScore: number | null;
  quizCompleted: boolean;
  quizPassed: boolean;
  studentName: string;
  studentId: string;
  completedLabs: string[];
  unlockedBadges: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'lesson' | 'lab' | 'quiz' | 'master';
}
