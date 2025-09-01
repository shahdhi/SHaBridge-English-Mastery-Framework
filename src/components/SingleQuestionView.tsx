import React, { useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Question } from '../types/test';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { TextQuestion } from './TextQuestion';
import { SentenceOrderingQuestion } from './SentenceOrderingQuestion';
import { QuestionTimer } from './QuestionTimer';
import { useQuestionTimer } from '../hooks/useQuestionTimer';

interface SingleQuestionViewProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  answer: string;
  onAnswerChange: (questionId: number, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  sectionTitle: string;
}

export const SingleQuestionView: React.FC<SingleQuestionViewProps> = ({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswerChange,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  sectionTitle
}) => {
  // Determine time limit based on question type and section
  const getTimeLimit = () => {
    if (question.section === 'grammar-vocabulary') {
      return 20; // 20 seconds for grammar/vocab
    } else if (question.section === 'reading-writing') {
      if (question.id >= 21 && question.id <= 35) {
        return 45; // 45 seconds for story continuation
      } else if (question.id >= 36 && question.id <= 40) {
        return 75; // 1 minute 15 seconds for sentence ordering
      }
    }
    return 20; // Default
  };

  const timeLimit = getTimeLimit();
  
  const { timeLeft, start, reset } = useQuestionTimer(timeLimit, () => {
    // Auto-advance when time is up
    if (canGoNext) {
      onNext();
    }
  });

  // Start timer when question loads
  useEffect(() => {
    reset(timeLimit);
    start();
  }, [question.id, timeLimit]);

  const renderQuestion = () => {
    if (question.type === 'sentence-ordering') {
      // Sentence ordering questions
      return (
        <SentenceOrderingQuestion
          question={question}
          selectedAnswer={answer}
          onAnswerChange={onAnswerChange}
          questionNumber={questionNumber}
        />
      );
    } else if (question.type === 'multiple-choice') {
      return (
        <MultipleChoiceQuestion
          question={question}
          selectedAnswer={answer}
          onAnswerChange={onAnswerChange}
          questionNumber={questionNumber}
        />
      );
    } else {
      return (
        <TextQuestion
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
          questionNumber={questionNumber}
        />
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{sectionTitle}</h2>
          <p className="text-gray-600">Question {questionNumber} of {totalQuestions}</p>
        </div>
        
        <QuestionTimer
          timeLeft={timeLeft}
          totalTime={timeLimit}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
        />
      </div>

      <div className="mb-8">
        {renderQuestion()}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            !canGoNext
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          }`}
        >
          {questionNumber === totalQuestions ? 'Next' : 'Next'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};