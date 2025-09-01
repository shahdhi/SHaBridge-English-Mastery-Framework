import React, { useEffect } from 'react';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { Question } from '../types/test';
import { TextQuestion } from './TextQuestion';
import { QuestionTimer } from './QuestionTimer';
import { useQuestionTimer } from '../hooks/useQuestionTimer';
import { readingText } from '../data/testData';

interface ReadingPassageViewProps {
  questions: Question[];
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const ReadingPassageView: React.FC<ReadingPassageViewProps> = ({
  questions,
  answers,
  onAnswerChange,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const timeLimit = 600; // 10 minutes = 600 seconds
  
  const { timeLeft, start, reset } = useQuestionTimer(timeLimit, () => {
    // Auto-advance when time is up
    if (canGoNext) {
      onNext();
    }
  });

  // Start timer when component loads
  useEffect(() => {
    reset(timeLimit);
    start();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Core Reading & Writing</h2>
          <p className="text-gray-600">Part C: Reading Passage & Questions</p>
        </div>
        
        <QuestionTimer
          timeLeft={timeLeft}
          totalTime={timeLimit}
          questionNumber={1}
          totalQuestions={1}
        />
      </div>

      <div className="space-y-8">
        {/* Reading Passage */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-purple-800">Reading Passage</h3>
          </div>
          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <p className="text-gray-700 leading-relaxed text-base">
              {readingText}
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Reading Comprehension Questions</h3>
          <div className="space-y-6">
            {questions.slice(0, 3).map((question, index) => (
              <TextQuestion
                key={question.id}
                question={question}
                answer={answers[question.id] || ''}
                onAnswerChange={onAnswerChange}
                questionNumber={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Writing Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Writing Response</h3>
          <div className="space-y-6">
            {questions.slice(3).map((question, index) => (
              <TextQuestion
                key={question.id}
                question={question}
                answer={answers[question.id] || ''}
                onAnswerChange={onAnswerChange}
                questionNumber={index + 1}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            !canGoNext
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          }`}
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};