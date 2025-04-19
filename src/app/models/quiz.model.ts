export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // 时间限制（分钟），可选
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation?: string; // 解释答案，可选
  type: QuestionType;
  points: number;
}

export enum QuestionType {
  SingleChoice = 'single-choice',
  MultipleChoice = 'multiple-choice',
  TrueFalse = 'true-false'
}

export interface Option {
  id: string;
  text: string;
}

export interface QuizResult {
  quizId: string;
  quizTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  timeTaken: number; // 花费的时间（秒）
  answers: UserAnswer[];
  completedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionIds: string[];
  isCorrect: boolean;
  points: number; // 实际得分
  maxPoints: number; // 该题最大分值
}
