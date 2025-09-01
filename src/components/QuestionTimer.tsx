import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface QuestionTimerProps {
  timeLeft: number;
  totalTime: number;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionTimer: React.FC<QuestionTimerProps> = ({ 
  timeLeft, 
  totalTime, 
  questionNumber, 
  totalQuestions 
}) => {
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const isWarning = timeLeft <= 10; // Last 10 seconds
  const isCritical = timeLeft <= 5; // Last 5 seconds

  return (
    <div className="bg-white border-2 border-blue-100 rounded-lg p-4 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${isCritical ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-blue-600'}`} />
          <span className="text-sm font-medium text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isWarning && (
            <AlertTriangle className={`w-5 h-5 ${isCritical ? 'text-red-500' : 'text-amber-500'}`} />
          )}
          <div className={`text-2xl font-bold ${isCritical ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-blue-600'}`}>
            {Math.floor(timeLeft / 60)}m {String(timeLeft % 60).padStart(2, '0')}s
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-blue-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};