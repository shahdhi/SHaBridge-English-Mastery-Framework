import React from 'react';
import { Question } from '../types/test';

interface MultipleChoiceQuestionProps {
  question: Question;
  selectedAnswer: string;
  onAnswerChange: (questionId: number, answer: string) => void;
  questionNumber: number;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerChange,
  questionNumber
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      {/* Question Header */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          <span className="text-blue-600 font-bold">{questionNumber}.</span> {question.question}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === optionLetter;
          
          return (
            <label
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={optionLetter}
                checked={isSelected}
                onChange={() => onAnswerChange(question.id, optionLetter)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="font-medium text-gray-700 min-w-[20px]">
                {optionLetter})
              </span>
              <span className="text-gray-700">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
