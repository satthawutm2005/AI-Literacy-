import { UserProgress } from '../types';

const STORAGE_KEY = 'ai_literacy_user_progress_v1';

export const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScore: null,
  quizCompleted: false,
  quizPassed: false,
  studentName: '',
  studentId: '',
  completedLabs: [],
  unlockedBadges: ['badge-starter']
};

export const loadUserProgress = (): UserProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...defaultProgress, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
  }
  return defaultProgress;
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};
