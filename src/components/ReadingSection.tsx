import React from 'react';
import { BookOpen } from 'lucide-react';
import { TextQuestion } from './TextQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { SentenceOrderingQuestion } from './SentenceOrderingQuestion';
import { Question } from '../types/test';
import { readingText } from '../data/testData';

interface ReadingSectionProps {
  questions: Question[];
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, answer: string) => void;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  questions,
  answers,
  onAnswerChange
}) => {
  // Split questions into different parts
  const storyQuestions = questions.slice(0, 15); // Questions 21-35 (story continuation)
  const orderingQuestions = questions.slice(15, 20); // Questions 36-40 (sentence ordering)
  const readingQuestions = questions.slice(20, 23); // Questions 41-43 (reading comprehension)
  const writingQuestions = questions.slice(23); // Question 44 (essay)

  return (
    <div className="space-y-8">
      {/* Part A: Story Continuation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Part A: Story Continuation (10 minutes)
        </h3>
        <p className="text-gray-600 mb-6">Read each short paragraph and choose the option (A, B, C, or D) that best continues the story or idea.</p>
        
        <div className="space-y-4">
          {storyQuestions.map((question, index) => (
            <MultipleChoiceQuestion
              key={question.id}
              question={question}
              selectedAnswer={answers[question.id] || ''}
              onAnswerChange={onAnswerChange}
              questionNumber={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Part B: Sentence Ordering */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          Part B: Reading Passage
        </h3>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h4 className="text-lg font-semibold text-purple-800">Reading Passage</h4>
          </div>
          <div className="bg-white rounded-lg p-6 border border-purple-200">
            <p className="text-gray-700 leading-relaxed text-base">
              {readingText}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Part B: Reading Comprehension (10 minutes)</h3>
        <div className="space-y-6">
          {readingQuestions.map((question, index) => (
            <TextQuestion
              key={question.id}
              question={question}
              answer={answers[question.id] || ''}
              onAnswerChange={onAnswerChange}
              questionNumber={index + 21}
            />
          ))}
        </div>
      </div>

      {/* Part C: Writing Response */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Part C: Writing Response (10 minutes)</h3>
        {writingQuestions.map((question, index) => (
          <TextQuestion
            key={question.id}
            question={question}
            answer={answers[question.id] || ''}
            onAnswerChange={onAnswerChange}
            questionNumber={index + 24}
          />
        ))}
      </div>
    </div>
  );
};