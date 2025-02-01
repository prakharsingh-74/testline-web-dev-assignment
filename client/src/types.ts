export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, string>;
  timeRemaining: number;
  isComplete: boolean;
  streak: number;
}