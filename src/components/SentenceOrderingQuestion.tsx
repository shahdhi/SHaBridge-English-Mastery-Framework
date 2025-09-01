import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { Question } from '../types/test';

interface SentenceOrderingQuestionProps {
  question: Question;
  selectedAnswer: string;
  onAnswerChange: (questionId: number, answer: string) => void;
  questionNumber: number;
}

interface Sentence {
  id: string;
  letter: string;
  text: string;
}

export const SentenceOrderingQuestion: React.FC<SentenceOrderingQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerChange,
  questionNumber
}) => {
  // Extract sentences from the question text
  const extractSentences = (questionText: string): Sentence[] => {
    const sentences: Sentence[] = [];
    const matches = questionText.match(/\(([A-D])\)\s([^(]+?)(?=\s\([A-D]\)|$)/g);
    
    if (matches) {
      matches.forEach(match => {
        const letterMatch = match.match(/\(([A-D])\)/);
        const textMatch = match.replace(/\([A-D]\)\s/, '').trim();
        if (letterMatch && textMatch) {
          sentences.push({
            id: letterMatch[1],
            letter: letterMatch[1],
            text: textMatch
          });
        }
      });
    }
    
    return sentences;
  };

  const sentences = extractSentences(question.question);
  
  // Initialize ordered sentences from current answer or default order
  const getInitialOrder = (): Sentence[] => {
    if (selectedAnswer && selectedAnswer.includes(',')) {
      const answerOrder = selectedAnswer.split(', ');
      const reorderedSentences = answerOrder.map(letter => 
        sentences.find(s => s.letter === letter)
      ).filter(Boolean) as Sentence[];
      
      if (reorderedSentences.length === sentences.length) {
        return reorderedSentences;
      }
    }
    return sentences;
  };

  const [orderedSentences, setOrderedSentences] = useState<Sentence[]>(getInitialOrder);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const updateAnswer = (newOrder: Sentence[]) => {
    const answerString = newOrder.map(s => s.letter).join(', ');
    onAnswerChange(question.id, answerString);
  };

  const handleDragStart = (e: React.DragEvent, sentenceId: string) => {
    setDraggedItem(sentenceId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const draggedIndex = orderedSentences.findIndex(s => s.id === draggedItem);
    if (draggedIndex === -1) return;

    const newOrder = [...orderedSentences];
    const [draggedSentence] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedSentence);

    setOrderedSentences(newOrder);
    updateAnswer(newOrder);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Extract the main question text (before the sentences)
  const mainQuestion = question.question.split('Order these sentences:')[0].trim();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          <span className="text-green-600 font-bold">{questionNumber}.</span> {mainQuestion}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop the sentences below to arrange them in the correct order:
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {orderedSentences.map((sentence, index) => (
          <div
            key={sentence.id}
            draggable
            onDragStart={(e) => handleDragStart(e, sentence.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-move transition-all duration-200 ${
              draggedItem === sentence.id
                ? 'border-blue-500 bg-blue-50 shadow-lg opacity-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2 text-gray-400">
              <GripVertical className="w-5 h-5" />
              <span className="text-sm font-medium">{index + 1}</span>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <span className="font-bold text-green-600 min-w-[24px]">
                ({sentence.letter})
              </span>
              <span className="text-gray-700">{sentence.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Current Answer Display */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="text-sm text-gray-600 mb-2">Your current order:</div>
        <div className="font-mono text-lg font-bold text-gray-800">
          {orderedSentences.map(s => s.letter).join(', ')}
        </div>
      </div>
    </div>
  );
};