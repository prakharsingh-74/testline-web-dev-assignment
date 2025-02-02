import { useState, useEffect } from 'react';
import { Brain, Timer, Award, Zap } from 'lucide-react';
import { QuizCard } from './components/QuizCard';
import { ResultCard } from './components/ResultCard';
import type { QuizQuestion, QuizState } from './types';

const QUESTION_TIMER = 30;
const API_URL = 'http://localhost:5000/api/quiz';


const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    points: 100
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    points: 100
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    points: 100
  }
];

function App() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStart, setShowStart] = useState(true);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    timeRemaining: QUESTION_TIMER,
    isComplete: false,
    streak: 0,
  });

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (loading || quizState.isComplete || questions.length === 0 || showStart) return;

    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeRemaining <= 0) {
          handleAnswerSubmit('');
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, quizState.isComplete, questions.length, showStart]);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch quiz data: ${response.statusText}`);
      }
      
      const data = await response.json();
      

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected an array of questions');
      }
      
      const validatedQuestions = data.map((question: any, index: number) => {
        if (!question.question || !Array.isArray(question.options) || !question.correctAnswer) {
          throw new Error(`Invalid question format at index ${index}`);
        }
        
        return {
          id: question.id || index + 1,
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          points: question.points || 100 
        };
      });
      
      setQuestions(validatedQuestions);
    } catch (err) {
      console.error('Error fetching quiz data:', err);
      console.log('Using mock questions as fallback');
      setQuestions(MOCK_QUESTIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      setError('No questions available. Please try again.');
      return;
    }
    setShowStart(false);
    setQuizState(prev => ({
      ...prev,
      timeRemaining: QUESTION_TIMER,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      isComplete: false,
      streak: 0
    }));
  };

  const handleAnswerSubmit = (answer: string) => {
    if (!questions.length || quizState.currentQuestionIndex >= questions.length) {
      return;
    }

    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setQuizState(prev => {
      const newScore = isCorrect ? prev.score + currentQuestion.points : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const isLastQuestion = prev.currentQuestionIndex === questions.length - 1;

      return {
        ...prev,
        score: newScore,
        streak: newStreak,
        answers: { ...prev.answers, [currentQuestion.id]: answer },
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        timeRemaining: QUESTION_TIMER,
        isComplete: isLastQuestion,
      };
    });
  };

  const handleRestart = () => {
    fetchQuizData(); 
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      timeRemaining: QUESTION_TIMER,
      isComplete: false,
      streak: 0,
    });
    setShowStart(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchQuizData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">No questions available.</p>
          <button
            onClick={fetchQuizData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (showStart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Testline Quiz Master</h1>
          <p className="text-gray-600 mb-8">
            Test your knowledge with our interactive quiz! Answer questions quickly to maintain your streak and earn more points.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-2">
              <Timer className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Time limit per question</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700">Streak bonuses</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Points system</span>
            </div>
          </div>
          <button
            onClick={handleStartQuiz}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Testline Quiz Master</h1>
          </div>
          <div className="bg-blue-100 rounded-lg p-2 inline-block">
            <span className="font-semibold text-blue-800">
              Question {quizState.currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
        </div>

        {!quizState.isComplete ? (
          <QuizCard
            question={questions[quizState.currentQuestionIndex]}
            selectedAnswer={quizState.answers[questions[quizState.currentQuestionIndex].id] || null}
            onAnswerSelect={handleAnswerSubmit}
            timeRemaining={quizState.timeRemaining}
            streak={quizState.streak}
            isDisabled={quizState.timeRemaining === 0}
          />
        ) : (
          <ResultCard
            score={quizState.score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;