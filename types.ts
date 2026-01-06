
export type Operation = '+' | '-';

export interface Question {
  id: number;
  num1: number;
  num2: number;
  op: Operation;
  correctAnswer: number;
  userAnswer: number | null;
  animal: string;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  isFinished: boolean;
}

export type AppStage = 'welcome' | 'quiz' | 'result';

export const ANIMALS = [
  { emoji: '🦁', name: '小狮子', color: 'bg-orange-100', text: 'text-orange-600' },
  { emoji: '🐰', name: '小兔子', color: 'bg-pink-100', text: 'text-pink-600' },
  { emoji: '🐼', name: '大熊猫', color: 'bg-gray-100', text: 'text-gray-800' },
  { emoji: '🐘', name: '小象', color: 'bg-blue-100', text: 'text-blue-600' },
  { emoji: '🦒', name: '长颈鹿', color: 'bg-yellow-100', text: 'text-yellow-600' },
];
