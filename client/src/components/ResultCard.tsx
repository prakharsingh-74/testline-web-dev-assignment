import React from 'react';
import { Trophy, Award, RefreshCw } from 'lucide-react';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function ResultCard({ score, totalQuestions, onRestart }: ResultCardProps) {
  const percentage = Math.round((score / (totalQuestions * 100)) * 100);
  
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mx-auto text-center">
      <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-2">
          <Award className="w-6 h-6 text-purple-600" />
          <span className="text-xl font-semibold">Score: {score} points</span>
        </div>
        <div className="text-lg text-gray-600">
          Success Rate: {percentage}%
        </div>
      </div>

      <button
        onClick={onRestart}
        className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-5 h-5" />
        <span>Try Again</span>
      </button>
    </div>
  );
}