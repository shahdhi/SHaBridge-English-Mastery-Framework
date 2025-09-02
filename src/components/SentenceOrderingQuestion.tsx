import React, { useState, useRef } from 'react';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
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
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const draggedElementRef = useRef<HTMLDivElement | null>(null);

  const updateAnswer = (newOrder: Sentence[]) => {
    const answerString = newOrder.map(s => s.letter).join(', ');
    onAnswerChange(question.id, answerString);
  };

  // Move sentence up or down (mobile-friendly buttons)
  const moveSentence = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...orderedSentences];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
      setOrderedSentences(newOrder);
      updateAnswer(newOrder);
    }
  };

  // Desktop drag and drop handlers
  const handleDragStart = (e: React.DragEvent, sentenceId: string) => {
    setDraggedItem(sentenceId);
    setIsDragging(true);
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
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, sentenceId: string) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    setDraggedItem(sentenceId);
    setIsDragging(true);
    
    // Prevent scrolling while dragging
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedItem || !touchStartY) return;
    
    const touch = e.touches[0];
    const currentY = touch.clientY;
    const deltaY = currentY - touchStartY;
    
    // Prevent scrolling
    e.preventDefault();
    
    // Visual feedback for dragging
    if (draggedElementRef.current) {
      draggedElementRef.current.style.transform = `translateY(${deltaY}px)`;
      draggedElementRef.current.style.zIndex = '1000';
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!draggedItem || !touchStartY) return;
    
    const touch = e.changedTouches[0];
    const currentY = touch.clientY;
    const deltaY = currentY - touchStartY;
    
    // Reset visual state
    if (draggedElementRef.current) {
      draggedElementRef.current.style.transform = '';
      draggedElementRef.current.style.zIndex = '';
    }
    
    // Determine if we should move the item
    const draggedIndex = orderedSentences.findIndex(s => s.id === draggedItem);
    const itemHeight = 80; // Approximate height of each item
    const moveThreshold = itemHeight / 2;
    
    if (Math.abs(deltaY) > moveThreshold) {
      const direction = deltaY < 0 ? 'up' : 'down';
      moveSentence(draggedIndex, direction);
    }
    
    setDraggedItem(null);
    setTouchStartY(null);
    setIsDragging(false);
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
          <span className="hidden sm:inline">Drag and drop the sentences below to arrange them in the correct order:</span>
          <span className="sm:hidden">Use the arrow buttons or drag to arrange the sentences in the correct order:</span>
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {orderedSentences.map((sentence, index) => (
          <div
            key={sentence.id}
            ref={draggedItem === sentence.id ? draggedElementRef : null}
            draggable
            onDragStart={(e) => handleDragStart(e, sentence.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onTouchStart={(e) => handleTouchStart(e, sentence.id)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
              draggedItem === sentence.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            } ${isDragging && draggedItem === sentence.id ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              touchAction: 'none', // Prevent default touch behaviors
              userSelect: 'none'   // Prevent text selection during drag
            }}
          >
            {/* Mobile arrow buttons */}
            <div className="flex flex-col gap-1 sm:hidden">
              <button
                onClick={() => moveSentence(index, 'up')}
                disabled={index === 0}
                className={`p-1 rounded ${
                  index === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                type="button"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveSentence(index, 'down')}
                disabled={index === orderedSentences.length - 1}
                className={`p-1 rounded ${
                  index === orderedSentences.length - 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                type="button"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            {/* Desktop drag handle and position */}
            <div className="hidden sm:flex items-center gap-2 text-gray-400">
              <GripVertical className="w-5 h-5" />
              <span className="text-sm font-medium">{index + 1}</span>
            </div>

            {/* Mobile position indicator */}
            <div className="sm:hidden text-gray-400">
              <span className="text-sm font-medium">{index + 1}</span>
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="font-bold text-green-600 min-w-[24px] flex-shrink-0">
                ({sentence.letter})
              </span>
              <span className="text-gray-700 break-words">{sentence.text}</span>
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
