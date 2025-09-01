import React from 'react';
import { Question } from '../types/test';

interface TextQuestionProps {
  question: Question;
  answer: string;
  onAnswerChange: (questionId: number, answer: string) => void;
  questionNumber: number;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  answer,
  onAnswerChange,
  questionNumber
}) => {
  const isEssay = question.type === 'essay';
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          <span className="text-blue-600 font-bold">{questionNumber}.</span> {question.question}
        </h3>
      </div>

      {isEssay ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Target: 100-150 words</span>
            <span className={`font-medium ${
              wordCount >= 100 && wordCount <= 150 ? 'text-green-600' :
              wordCount > 150 ? 'text-amber-600' : 'text-gray-500'
            }`}>
              {wordCount} words
            </span>
          </div>
          <textarea
            value={answer}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
            placeholder="Write your paragraph here..."
          />
        </div>
      ) : (
        <div className="space-y-2">
          {question.id === 26 || question.id === 27 ? (
            <div className="space-y-3">
              <input
                type="text"
                value={answer.split('|')[0] || ''}
                onChange={(e) => {
                  const parts = answer.split('|');
                  parts[0] = e.target.value;
                  onAnswerChange(question.id, parts.join('|'));
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="(1) First answer..."
              />
              <input
                type="text"
                value={answer.split('|')[1] || ''}
                onChange={(e) => {
                  const parts = answer.split('|');
                  parts[1] = e.target.value;
                  onAnswerChange(question.id, parts.join('|'));
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="(2) Second answer..."
              />
            </div>
          ) : (
            <textarea
              value={answer}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="w-full h-24 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
              placeholder="Write your answer here..."
            />
          )}
        </div>
      )}
    </div>
  );
};