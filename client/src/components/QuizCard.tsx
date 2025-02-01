import React from 'react';
import { Timer, Award, Zap } from 'lucide-react';
import type { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  timeRemaining: number;
  streak: number;
  isDisabled: boolean;
}

export function QuizCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  timeRemaining,
  streak,
  isDisabled
}: QuizCardProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-blue-600" />
          <span className="text-lg font-semibold text-blue-600">{timeRemaining}s</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-lg font-semibold text-yellow-500">Streak: {streak}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-600" />
          <span className="text-lg font-semibold text-purple-600">{question.points} pts</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            disabled={isDisabled}
            className={`w-full p-4 text-left rounded-lg transition-all ${
              selectedAnswer === option
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            } ${isDisabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
          >
            <span className="font-medium">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}